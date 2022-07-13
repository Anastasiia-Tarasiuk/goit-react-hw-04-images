import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ items }) => {
    // console.log(items)

    return items.length > 0 &&
        <ul className="gallery">
            {items.map(item => 
                // console.log(item)
                <ImageGalleryItem url={item.webformatURL} key={item.id} title={item.tags} />
            )}
        </ul>
}
