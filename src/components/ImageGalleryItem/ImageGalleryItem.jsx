import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ url, title, onClick, urlLarge }) => {

    return <GalleryItem>
        <GalleryImage onClick={() => onClick(urlLarge, title)} src={url} alt={title} />
    </GalleryItem>
}