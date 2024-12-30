import { useState, useEffect } from 'react'
import './Dashboard.css'
import { Photo } from '../../components/photo/Photo'

export const DashBoard = () => {
    const [photos, setPhotos] = useState([])

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
    )
}