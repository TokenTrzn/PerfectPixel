import { Chip } from '@mui/material'
import './TagScroll.css'

export const TagScroll = () => {
    const tags = ['Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag']

    return (
        <div className='container'>
            {tags.map((tag, index) => (
                <Chip
                    className='tag'
                    key={index}
                    label={tag}
                />
            ))}
        </div>
    )
}