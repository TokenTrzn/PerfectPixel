import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './DashboardFavorites.css'
import { Photo } from '../../components/photo/Photo'
import { removeFavorite } from '../../features/favorite/FavoriteSlice'

export const DashboardFavorites = () => {

    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('')
    const favorites = useSelector((state) => state.favorites.favorites)
    const dispatch = useDispatch()

    const handleSortChange = (newSortCriteria) => {
        setSortCriteria(newSortCriteria);
    };

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const sortOptions = [
        { label: 'Tendencias', value: 'tendencias' },
        { label: 'Más Likes', value: 'likes' },
        { label: 'Más Visitas', value: 'visitas' },
        { label: 'Más Recientes', value: 'recientes' }
    ]

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        fetchPhotosById(storedFavorites)
    }, [favorites])

    const fetchPhotosById = async (photoIds) => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?count=10&order_by=${sortCriteria}&client_id=7bSsA5Nj4P0ROUXi9ntX4E31_QwcXy_FnBnL8ChKDUs`)
            if (response.ok) {
                const data = await response.json()
                setPhotos(data)
            }
        } catch (error) {
            console.error(error)
        }
        /*
        if (photoIds.length === 0) return
        try {
            const response = await fetch(`https://api.unsplash.com/photos?id=${photoIds.join(',')}&client_id=7bSsA5Nj4P0ROUXi9ntX4E31_QwcXy_FnBnL8ChKDUs`)
            if (response.ok) {
                const data = await response.json()
                setPhotos(data)
            }
        } catch (error) {
            console.error(error)
        }
            */
    }

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
                                src={photo.urls.small}
                                alt={photo.alt_description || 'Unsplash Image'}
                                isLiked={favorites.includes(photo.id)}
                                onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                                onClick={console.log(photo)}
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
                            onRemoveFavorite={() => handleRemoveFavorite(photo.id)}
                        />
                    ))}
                </div>
            </div>

        </>
    )
}