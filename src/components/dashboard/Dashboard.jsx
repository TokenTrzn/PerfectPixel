import { useState, useEffect } from 'react'
import './Dashboard.css'
import { Photo } from '../../components/photo/Photo'
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

    const handleToggleModal = (photo) => {
        setSelectedPhoto(photo)
        setIsModalOpen((prevState) => !prevState)
    }

    const sortOptions = [
        { label: 'Relevante', value: 'relevant' },
        { label: 'Más Nuevo', value: 'latest' },
        { label: 'Más Viejo', value: 'oldest' }
    ]


    const fetchPhotos = async (isLoadMore = false) => {
        if (searchQuery === '') {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/random?count=10&order_by=${sortCriteria}&client_id=X0TR22RM5EBq33aLhtIlOYDpfktRyZsF03Cb5pCwDRs`)
                if (response.ok) {
                    const data = await response.json()
                    setPhotos((prevPhotos) => isLoadMore ? [...prevPhotos, ...data] : data);
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await fetch(`https://api.unsplash.com/photos?query=${searchQuery}?count=10&order_by=${sortCriteria}&client_id=X0TR22RM5EBq33aLhtIlOYDpfktRyZsF03Cb5pCwDRs`)
                if (response.ok) {
                    const data = await response.json()
                    setPhotos((prevPhotos) => isLoadMore ? [...prevPhotos, ...data] : data);
                }
            } catch (error) {
                console.error(error)
            }
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

    const handleLoadMoreClick = () => {
        setShowLoadMoreButton(false)
        fetchPhotos(true)
    }

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
                )

                }
            </div>

            {selectedPhoto && (
                <>
                    <div className={`modalOverlay ${isModalOpen ? 'show' : 'hidden'}`} onClick={handleToggleModal(null)}></div>
                    <div className={`modal ${isModalOpen ? 'show' : 'hidden'}`}>
                        <img className='modalPhoto' src={selectedPhoto.urls.full || ''} alt={selectedPhoto.alt_description || 'Unsplash Photo'} />
                    </div>
                </>
            )}
        </>
    )
}