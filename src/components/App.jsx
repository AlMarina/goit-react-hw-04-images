import { useEffect, useState } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchSerch } from '../api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ContainerApp } from './App.styled';
import Loader from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

const PER_PAGE = 12;

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);
  const [img, setImg] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ img: '', alt: '' });

  useEffect(() => {
    if (!name) {
      return;
    }
    async function getName() {
      try {
        setIsLoading(true);
        setError(false);

        const idx = name.indexOf('/');
        const clearSearchName = name.slice(idx + 1);

        const { hits, totalHits } = await fetchSerch(
          clearSearchName,
          page,
          PER_PAGE
        );

        setImg(prevState => [...prevState, ...hits]);
        setTotalImg(totalHits);

        if (page === 1)
          toast.success('Yes! We found image!', {
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: '#713200',
              fontWeight: 700,
            },
          });
      } catch (error) {
        setError(error.message);

        toast.error('Ooops, there was an error...', {
          style: {
            border: '1px solid #713200',
            padding: '10px',
            color: '#713200',
            fontWeight: 700,
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
    getName();
  }, [name, page]);

  const onSubmit = name => {
    setName(`${Date.now()}/${name}`);
    setPage(1);
    setImg([]);
  };

  const onClickLoad = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setModalData({ img: largeImageURL, alt: tags });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const quantityPages = Math.ceil(totalImg / PER_PAGE);

  return (
    <ContainerApp>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}

      {error && <p>Sorry, we have, some error. Error: {error}</p>}
      <ImageGallery items={img} onClick={handleOpenModal} />

      {name && page < quantityPages && <Button click={onClickLoad} />}
      {showModal && (
        <Modal
          onclose={handleCloseModal}
          img={modalData.img}
          alt={modalData.alt}
        />
      )}
      <Toaster />
    </ContainerApp>
  );
};
