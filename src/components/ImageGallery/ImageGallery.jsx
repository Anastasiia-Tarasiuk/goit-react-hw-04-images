import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from './ImageGallery.styled'; 
    
export const ImageGallery = ({ items }) => {

    return items.length > 0 &&
        <ImageGalleryList>
            {items.map(item => 
                <ImageGalleryItem url={item.webformatURL} key={item.id} title={item.tags} />
            )}
        </ImageGalleryList>
}
