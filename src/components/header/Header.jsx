import logo from '../../assets/perfect_pixel_logo.png'
import './Header.css'
import menu from '../../assets/menu_icon.png'

export const Header = () => {

    return (
        <header className='header'>
            <img className='logo' src={ logo } alt="Perfect Pixel Logo"/>
            <img className='menuButton' src={ menu }/>
        </header>
    )
}