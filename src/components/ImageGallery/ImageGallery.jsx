import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { UlGallery } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <UlGallery>
      <ImageGalleryItem items={items} onClick={onClick} />
    </UlGallery>
  );
};
