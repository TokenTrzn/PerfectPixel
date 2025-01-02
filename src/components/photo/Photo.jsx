import './Photo.css'

export const Photo = ({ src, alt }) => {

    return (
        <>
            <div className="photoContainer">
                <img className='photo' src={src} alt={alt} />
            </div>
        </>
    )
}