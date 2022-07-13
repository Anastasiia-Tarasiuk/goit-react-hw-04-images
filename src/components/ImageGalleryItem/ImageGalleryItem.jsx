import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ url, title }) => {

    return <GalleryItem>
        <GalleryImage src={url} alt={title} />
    </GalleryItem>
}