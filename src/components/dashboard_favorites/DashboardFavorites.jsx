import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './DashboardFavorites.css'
import { Photo } from '../../components/photo/Photo'
import { removeFavorite } from '../../features/favorite/FavoriteSlice'
import { Modal } from '../../components/modal/Modal'

export const DashboardFavorites = () => {

    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [sortCriteria, setSortCriteria] = useState('')
    const favorites = useSelector((state) => state.favorites.favorites)
    const dispatch = useDispatch()

    const handleSortChange = (newSortCriteria) => {
        setSortCriteria(newSortCriteria);
    };

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setPhotos(storedFavorites)
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/random?count=10&order_by=${sortCriteria}&client_id=7bSsA5Nj4P0ROUXi9ntX4E31_QwcXy_FnBnL8ChKDUs`)
                if (response.ok) {
                    const data = await response.json()
                    setPhotos(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPhotos()
    }, [search, sortCriteria])



    const handleRemoveFavorite = (id) => {
        dispatch(removeFavorite(id))
    };

    return (
        <>
            <div className="dashboardFavorites">
                <div className='dashboardLeft'>
                    {photos
                        .filter((_, index) => index % 2 === 0)
                        .map((photo) => (
                            <Photo
                                key={photo.id}
                                src={photo.urls?.small}
                                alt={photo.alt_description || 'Unsplash Image'}
                                isLiked={favorites.includes(photo.id)}
                                onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                                onClick={() => openModal(photo)}
                            />
                        ))}
                </div>
                <div className='dashboardRight'>
                    {photos.filter((_, index) => index % 2 !== 0).map((photo) => (
                        <Photo
                            key={photo.id}
                            src={photo.urls?.small}
                            alt={photo.alt_description || 'Unsplash Image'}
                            isLiked={favorites.includes(photo.id)}
                            onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                            onClick={() => openModal(photo)}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <Modal photo={selectedPhoto} isOpen={isModalOpen} onClose={closeModal} page='favs' />
            )}
        </>
    )
}