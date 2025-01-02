import { useState } from 'react'

export const Modal = () => {

    const [photo, setPhoto] = useState(null)
    const [isFavorites, setIsFavorites] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen((prevState) => !prevState)
        
    }

    const handleToggleModal = (photo = null) => {
        setIsModalOpen((prevState) => !prevState);
        setPhoto(photo);
    };

    return (
        <>
        </>
    )
}