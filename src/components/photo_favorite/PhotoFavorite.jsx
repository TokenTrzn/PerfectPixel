import { useState, useEffect } from 'react'

export const PhotoFavorite = ({ photoId }) => {
    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=7bSsA5Nj4P0ROUXi9ntX4E31_QwcXy_FnBnL8ChKDUs`)
                const photoData = await response.json()
                setPhoto(photoData[0])
            }
        }
    })
}