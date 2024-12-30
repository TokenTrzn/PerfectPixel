import { useState } from 'react'
import './SortBy.css'

export const SortBy = ({ options, onSortChange}) => {

    const [selectedOption, setSelectedOption] = useState('')

    const handleSortChange = (event) => {
        const value = event.target.value
        setSelectedOption(value)
        if (onSortChange) {
            onSortChange(value)
        }
    }

    return (
        <div className='sortBy'>
            <select 
                id='sort-options' 
                className='options' 
                value={selectedOption} 
                onChange={handleSortChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}