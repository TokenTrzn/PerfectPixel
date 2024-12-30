import { useState } from 'react'
import './Banner.css'
import banner from '../../assets/banner.jpg'
import searchIcon from '../../assets/search_icon.png'
import { TagScroll } from '../../components/tags_scroll/TagScroll'

export const Banner = () => {

    const [search, setSearch] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', search);
    };

    return (
        <div className="banner">
            <img
                className='banner-img'
                src={banner}
                alt="Banner"
            />
            <p className='text'>Las mejores fotos gratis y sin derechos, creadas por la comunidad</p>
            <p className='photoCredits'>Foto de <span className='author'>Juan Herrero</span></p>
            <div className="searchBar">
                <input
                    className='input'
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img className='searchIcon' src={ searchIcon } />
            </div>
            <TagScroll />
        </div>
    )
}