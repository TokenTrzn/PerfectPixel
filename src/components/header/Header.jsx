import { useState } from 'react'
import logo from '../../assets/perfect_pixel_logo.png'
import './Header.css'
import menu from '../../assets/menu_icon.png'
import closeIcon from '../../assets/close_icon.png'

export const Header = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const toggleMenu = () => {
        setIsMenuVisible((prevState) => !prevState)
    }

    return (
        <header className='header'>
            <img className='logo' src={logo} alt="Perfect Pixel Logo" />
            <div className={`overlay ${isMenuVisible ? 'show' : 'hidden'}`}></div>
            <ul className={`menu ${isMenuVisible ? 'show' : 'hidden'}`}>
                <li className="menuItem"><a href="#perfect-pixel">Perfect Pixel</a></li>
                <li className="menuItem"><a href="#mi-gallery">Mi Galería</a></li>
            </ul>
            <img className={`closeMenuButton ${!isMenuVisible ? 'show' : 'hidden'}`} src={menu} onClick={toggleMenu} />
            <img className={`closeMenuButton ${isMenuVisible ? 'show' : 'hidden'}`} src={closeIcon} onClick={toggleMenu} />            
        </header>
    )
}