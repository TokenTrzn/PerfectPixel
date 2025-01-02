import { useState, useEffect } from 'react'
import './Dashboard.css'
import { Photo } from '../../components/photo/Photo'
import { SortBy } from '../../components/sort_by/SortBy'

export const DashBoard = () => {
    const [photos, setPhotos] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    
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
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.unsplash.com/photos/random?count=10&client_id=ae7B5xAOV4suS5cmGvaSRuT-xQowkEFGat2JZmsx0jU')
                if (response.ok) {
                    const data = await response.json()
                    setPhotos(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPhotos()
    }, [])


    return (
        <>
            <SortBy options={sortOptions} onSortChange={handleSortChange} />
            <div className="dashboard">
                <div className='dashboardLeft'>
                    {photos
                        .filter((_, index) => index % 2 === 0)
                        .map((photo) => (
                            <Photo
                                key={photo.id}
                                src={photo.urls.small}
                                alt={photo.alt_description || 'Unsplash Image'}
                                onClick={() => handleToggleModal(photo)}
                            />
                        ))}
                </div>
                <div className='dashboardRight'>
                    {photos.filter((_, index) => index % 2 !== 0).map((photo) => (
                        <Photo
                            key={photo.id}
                            src={photo.urls.small}
                            alt={photo.alt_description || 'Unsplash Image'}
                            onClick={() => handleToggleModal(photo)}
                        />
                    ))}
                </div>
            </div>

            {selectedPhoto && (
                <>
                    <div className={`modalOverlay ${isModalOpen ? 'show' : 'hidden'}`} onClick={handleToggleModal}></div>
                    <div className={`modal ${isModalOpen ? 'show' : 'hidden'}`}>
                        <img className='modalPhoto' src={selectedPhoto.urls.full || ''} alt={selectedPhoto.alt_description || 'Unsplash Photo'} />
                    </div>
                </>
            )}
        </>
    )
}