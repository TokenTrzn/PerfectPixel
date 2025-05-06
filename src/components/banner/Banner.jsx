import { useState } from 'react'
import './Banner.css'
import banner from '../../assets/banner.jpg'
import searchIcon from '../../assets/search_icon.png'
import { TagScroll } from '../../components/tags_scroll/TagScroll'

export const Banner = ({ onSearch }) => {

    const [input, setInput] = useState('')

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = () => {
        onSearch(input)
    }

    return (
        <div className="banner">
            <img
                className='banner-img'
                src={banner}
                alt="Banner"
            />
            <p className='text'>Las mejores fotos gratis y sin derechos, creadas por la comunidad</p>
            <div className="searchBar">
                <input
                    className='input'
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={handleInput}
                />
                <img className='searchIcon' src={ searchIcon } onClick={handleSubmit} />
            </div>
            <TagScroll />
        </div>
    )
}