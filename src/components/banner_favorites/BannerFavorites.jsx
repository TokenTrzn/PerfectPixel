import { useState } from 'react'
import './BannerFavorites.css'
import searchIcon from '../../assets/search_icon.png'
import { SortBy } from '../../components/sort_by/SortBy'

export const BannerFavorites = ({ onSearch }) => {

    const [input, setInput] = useState('')
    const [sortCriteria, setSortCriteria] = useState('')

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = () => {
        onSearch(input)
    }

    const handleSortCriteria = (newSortCriteria) => {
        setSortCriteria(newSortCriteria)
    }

    const sortOptions = [
        { label: 'Más Likes', value: 'likes' },
        { label: 'Más Ancho', value: 'width' },
        { label: 'Más Alto', value: 'height' },
        { label: 'Más Antiguo', value: 'latest' }
    ]

    return (
        <div className="bannerFavorites">
            <div className="searchBarFav">
                <input
                    className='inputFav'
                    type="textFav"
                    placeholder="Search..."
                    value={input}
                    onChange={handleInput}
                />
                <img className='searchIconFav' src={searchIcon} onClick={handleSubmit} />
            </div>
            <SortBy options={sortOptions} onSortChange={handleSortCriteria} />
        </div>
    )
}