import { useState, useEffect } from 'react'
import './Dashboard.css'
import { Photo } from '../../components/photo/Photo'
import { Modal } from '../../components/modal/Modal'
import { SortBy } from '../../components/sort_by/SortBy'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../features/favorite/FavoriteSlice';
import loadingMoreIcon from '../../assets/loading_icon.png'

export const Dashboard = ({ searchQuery }) => {
    const [photos, setPhotos] = useState([])
    const [sortCriteria, setSortCriteria] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)

    const favorites = useSelector((state) => state.favorites.favorites)
    const dispatch = useDispatch()

    const handleAddFavorite = (id) => {
        dispatch(addFavorite(id));
    };

    const handleRemoveFavorite = (id) => {
        dispatch(removeFavorite(id));
    };

    const handleSortCriteria = (newSortCriteria) => {
        setSortCriteria(newSortCriteria)
    }

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const handleLoadMoreClick = () => {
        setShowLoadMoreButton(false)
        fetchPhotos(true)
    }

    const sortOptions = [
        { label: 'Más Likes', value: 'likes' },
        { label: 'Más Ancho', value: 'width' },
        { label: 'Más Alto', value: 'height' },
        { label: 'Más Antiguo', value: 'latest' }
    ]


    const fetchPhotos = async (isLoadMore = false) => {
        const url = searchQuery
            ? `https://api.unsplash.com/photos?query=${searchQuery}&count=10&order_by=${sortCriteria}&client_id=X0TR22RM5EBq33aLhtIlOYDpfktRyZsF03Cb5pCwDRs`
            : `https://api.unsplash.com/photos/random?count=10&order_by=${sortCriteria}&client_id=X0TR22RM5EBq33aLhtIlOYDpfktRyZsF03Cb5pCwDRs`
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setPhotos((prevPhotos) => isLoadMore ? [...prevPhotos, ...data] : data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchPhotos()
    }, [sortCriteria, searchQuery])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrolledPercentage = (scrollPosition / documentHeight) * 100;
            if (scrolledPercentage >= 95) {
                setShowLoadMoreButton(true);
            } else {
                setShowLoadMoreButton(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    

    return (
        <>
            <SortBy options={sortOptions} onSortChange={handleSortCriteria} />
            <div className="dashboard">
                <div className='dashboardLeft'>
                    {photos
                        .filter((_, index) => index % 2 === 0)
                        .map((photo) => (
                            <Photo
                                key={photo.id}
                                src={photo.urls.small}
                                alt={photo.alt_description || 'Unsplash Image'}
                                isLiked={favorites.includes(photo.id)}
                                onAddFavorite={() => handleAddFavorite(photo.id)}
                                onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                                onClick={handlePhotoClick}
                            />
                        ))}
                </div>
                <div className='dashboardRight'>
                    {photos.filter((_, index) => index % 2 !== 0).map((photo) => (
                        <Photo
                            key={photo.id}
                            src={photo.urls.small}
                            alt={photo.alt_description || 'Unsplash Image'}
                            isLiked={favorites.includes(photo.id)}
                            onAddFavorite={() => handleAddFavorite(photo.id)}
                            onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                            onClick={handlePhotoClick}
                        />
                    ))}
                </div>

                {showLoadMoreButton && (
                    <div
                        className='loadMoreButton'
                        onClick={handleLoadMoreClick}
                    >
                        <img className='loadingMoreIcon' src={loadingMoreIcon} alt='Loading More Photos' />
                    </div>
                )}
            </div>
            {isModalOpen && (
                <Modal photo={selectedPhoto} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    )
}