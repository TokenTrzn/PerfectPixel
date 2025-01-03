import { useState } from 'react'

export const Modal = ({ photo, isOpen, onClose }) => {
    if (!isOpen || !photo) return null

    return (
        <>
            <div className='modalOverlay' onClick={onClose}>
                <div className='modal' onClick={(e) => e.stopPropagation()}>
                    <div className='modalContent'>
                        <img src={photo.urls.full} className='modalImg' />
                        <div className='imageInfo'>
                            <p className='info'>{`Import Date: ${photo.created_at}`}</p>
                            <p className='info'>{`Width: ${photo.width}`}</p>
                            <p className='info'>{`Height: ${photo.height}`}</p>
                            <p className='info'>{`Likes: ${photo.likes}`}</p>
                            <p className='info'>{`Description: ${photo.description}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}