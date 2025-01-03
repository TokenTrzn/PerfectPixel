import { useState } from 'react'
import logo from '../../assets/perfect_pixel_logo.png'
import './Header.css'
import menu from '../../assets/menu_icon.png'
import closeIcon from '../../assets/close_icon.png'
import { Link } from 'react-router-dom'

export const Header = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuVisible((prevState) => !prevState)
    }

    const handlePage = () => {
        setIsGalleryOpen((prevState) => !prevState)
        toggleMenu()
    }

    return (
        <header className='header'>
            {isGalleryOpen 
                ? <img className='logo' src={logo} alt="Perfect Pixel Logo" />
                : <h1 className='galleryTitle'>Mi Galería</h1>   
            }
            <div className={`overlay ${isMenuVisible ? 'show' : 'hidden'}`} onClick={toggleMenu}></div>
            <ul className={`menu ${isMenuVisible ? 'show' : 'hidden'}`}>
                <li className="menuItem" onClick={handlePage}><Link to='/'>Perfect Pixel</Link></li>
                <li className="menuItem" onClick={handlePage}><Link to='/myGallery'>Mi Galería</Link></li>
            </ul>
            <img className={`closeMenuButton ${!isMenuVisible ? 'show' : 'hidden'}`} src={menu} onClick={toggleMenu} />
            <img className={`closeMenuButton ${isMenuVisible ? 'show' : 'hidden'}`} src={closeIcon} onClick={toggleMenu} />            
        </header>
    )
}