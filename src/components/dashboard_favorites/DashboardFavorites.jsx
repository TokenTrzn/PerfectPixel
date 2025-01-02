import { useState, useEffect } from 'react'
import './DashboardFavorites.css'
import { Photo } from '../../components/photo/Photo'
import { SortBy } from '../../components/sort_by/SortBy'
import searchIcon from '../../assets/search_icon.png'

export const DashboardFavorites = () => {

    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const handleSortChange = (newSortCriteria) => {
        setSortCriteria(newSortCriteria);
    };

    const sortOptions = [
        { label: 'Tendencias', value: 'tendencias' },
        { label: 'Más Likes', value: 'likes' },
        { label: 'Más Visitas', value: 'visitas' },
        { label: 'Más Recientes', value: 'recientes' }
    ]

    useEffect(() => {
        const fetchPhotosFromLocalStorage = async () => {
            try {
                const storedPhotos = localStorage.getItem('photos')
                if (storedPhotos) {
                    setPhotos(JSON.parse(storedPhotos))
                } else {
                    console.error('No photo found in local storage')
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPhotosFromLocalStorage()
    }, [])

    return (
        <div className='dashboardFavorites'>
            <div className="optionsRow">
                <div className="searchBar">
                    <input
                        className='input'
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <img className='searchIcon' src={searchIcon} />
                </div>
                <SortBy options={sortOptions} onSortChange={handleSortChange}/>
            </div>
            <div className="dashboard">
                <div className='dashboardLeft'>
                    {photos
                        .filter((_, index) => index % 2 === 0)
                        .map((photo) => (
                            <Photo
                                key={photo.id}
                                src={photo.urls.small}
                                alt={photo.alt_description || 'Unsplash Image'}
                            />
                        ))}
                </div>
                <div className='dashboardRight'>
                    {photos.filter((_, index) => index % 2 !== 0).map((photo) => (
                        <Photo
                            key={photo.id}
                            src={photo.urls.small}
                            alt={photo.alt_description || 'Unsplash Image'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}