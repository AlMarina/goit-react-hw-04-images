import { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export const Modal = ({ onclose, img, alt }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') onclose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onclose]);

  const handleClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) onclose();
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalContainer>
        <img src={img} alt={alt} loading="lazy" />
      </ModalContainer>
    </Overlay>
  );
};
