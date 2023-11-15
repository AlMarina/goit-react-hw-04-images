import { LiItem, ImgItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ items, onClick }) => {
  return (
    <>
      {items.map(({ id, webformatURL, tags, largeImageURL }) => (
        <LiItem key={id}>
          <ImgItem
            src={webformatURL}
            alt={tags}
            onClick={() => onClick(largeImageURL, tags)}
          />
        </LiItem>
      ))}
    </>
  );
};
