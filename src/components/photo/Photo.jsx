import './Photo.css'
import { useState } from 'react'
import FavoriteIcon from '../../assets/favorite_icon.png'
import FavoriteIconFill from '../../assets/favorite_icon_fill.png'

export const Photo = ({ src, alt, isLiked,  onAddFavorite, onRemoveFavorite }) => {

    const [isLikedState, setIsLikedState] = useState(isLiked)

    const handleAdd = () => {
        setIsLikedState(true);
        onAddFavorite();
    };

    const handleRemove = () => {
        setIsLikedState(false);
        onRemoveFavorite();
    };

    return (
        <>
            <div className="photoContainer">
                <div className='likeButton'>
                    {isLikedState ? 
                        <img src={FavoriteIconFill} className='icon' onClick={handleRemove} /> : 
                        <img src={FavoriteIcon} className='icon' onClick={handleAdd} />
                    }
                </div>
                <img className='photo' src={src} alt={alt} />
            </div>
        </>
    )
}