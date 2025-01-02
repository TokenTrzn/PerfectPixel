import { Chip } from '@mui/material'
import './TagScroll.css'

export const TagScroll = () => {
    const tags = ['Animales', 'Deportes', 'Arte', 'Nieve', 'Naturaleza', 'Océano', 'Abstacto', 'Coches', 'Comida']

    return (
        <div className='container'>
            {tags.map((title, index) => (
                <Chip
                    className='tag'
                    key={index}
                    label={title}
                />
            ))}
        </div>
    )
}