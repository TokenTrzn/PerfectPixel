import { useState } from 'react'
import logo from '../../assets/perfect_pixel_logo.png'
import './Header.css'
import menu from '../../assets/menu_icon.png'
import closeIcon from '../../assets/close_icon.png'
import { Link } from 'react-router-dom'

export const Header = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const toggleMenu = () => {
        setIsMenuVisible((prevState) => !prevState)
    }

    return (
        <header className='header'>
            <img className='logo' src={logo} alt="Perfect Pixel Logo" />
            <div className={`overlay ${isMenuVisible ? 'show' : 'hidden'}`} onClick={toggleMenu}></div>
            <ul className={`menu ${isMenuVisible ? 'show' : 'hidden'}`}>
                <li className="menuItem" onClick={toggleMenu}><Link to='/'><a>Perfect Pixel</a></Link></li>
                <li className="menuItem" onClick={toggleMenu}><Link to='/myGallery'><a>Mi Galería</a></Link></li>
            </ul>
            <img className={`closeMenuButton ${!isMenuVisible ? 'show' : 'hidden'}`} src={menu} onClick={toggleMenu} />
            <img className={`closeMenuButton ${isMenuVisible ? 'show' : 'hidden'}`} src={closeIcon} onClick={toggleMenu} />            
        </header>
    )
}