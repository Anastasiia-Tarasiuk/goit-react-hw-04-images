export const ImageGalleryItem = ({ url, title }) => {
    // console.log(item);
    return <li className="gallery-item">
        <img src={url} alt={title} />
</li>
}