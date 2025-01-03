import './Modal.css'
import arrowBackIcon from '../../assets/arrow_back_icon.png'
import downloadIcon from '../../assets/download_icon.png'
import deleteIcon from '../../assets/delete_icon.png'
import editIcon from '../../assets/edit_icon.png'
import { saveAs } from 'file-saver'
import { useState } from 'react'

export const Modal = ({ photo, isOpen, onClose, page }) => {
    if (!isOpen || !photo) return null

    const handleDownload = () => {
        if (photo && photo.urls && photo.urls?.full) {
            saveAs(photo.urls?.full, `${photo.id}.jpg`);
        }
    };
    
    
    return (
        <>
            <div className='modalOverlay' onClick={onClose}>
                <div className='modal' onClick={(e) => e.stopPropagation()}>
                    <div className='modalContent'>
                        <img src={arrowBackIcon} className='backIcon' onClick={onClose} />
                        <img src={photo.urls?.regular || null} className='modalImg' />
                        <div className='imageInfo'>
                            <p className='info'>{`Import Date: ${photo.created_at || 'Unknown'}`}</p>
                            <p className='info'>{`Width: ${photo.width || 'Unknown'} px`}</p>
                            <p className='info'>{`Height: ${photo.height || 'Unknown'} px`}</p>
                            <p className='info'>{`Likes: ${photo.likes || 'Unknown'}`}</p>
                            <div className='editRow'>
                                <p className='info'>{`Description: ${photo.description || 'Unknown'}`}</p>
                                {page === 'favs' ? <img src={editIcon} className='utilIcon' id='editIcon'/> : ''}
                            </div>
                        </div>
                        <div className='utilsRow'>
                            <img src={downloadIcon} className='utilIcon' onClick={handleDownload} />
                            {page === 'favs' ? <img src={deleteIcon} className='utilIcon' /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}