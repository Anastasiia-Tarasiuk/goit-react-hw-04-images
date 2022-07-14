import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from './ImageGallery.styled'; 
    
export const ImageGallery = ({ items, onClick }) => {

    return items.length > 0 &&
        <ImageGalleryList>
            {items.map(item => 
                <ImageGalleryItem onClick={onClick} url={item.webformatURL} urlLarge={item.largeImageURL} key={item.id} title={item.tags} />
            )}
        </ImageGalleryList>
}
