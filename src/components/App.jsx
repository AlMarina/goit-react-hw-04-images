import { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchSerch } from '../api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ContainerApp } from './App.styled';
import Loader from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    name: '',
    page: 1,
    totalImg: 0,
    img: [],
    error: false,
    isLoading: false,
    showModal: false,
    modalData: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    )
      try {
        this.setState({ isLoading: true, error: false });

        const idx = this.state.name.indexOf('/');
        const clearSearchName = this.state.name.slice(idx + 1);

        const { hits, totalHits } = await fetchSerch(
          clearSearchName,
          this.state.page,
          PER_PAGE
        );

        this.setState(prevState => ({
          img: [...prevState.img, ...hits],
          totalImg: totalHits,
        }));
        if (this.state.page === 1)
          toast.success('Yes! We found image!', {
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: '#713200',
              fontWeight: 700,
            },
          });
      } catch (error) {
        this.setState({ error: error.message });
        toast.error('Ooops, there was an error...', {
          style: {
            border: '1px solid #713200',
            padding: '10px',
            color: '#713200',
            fontWeight: 700,
          },
        });
      } finally {
        this.setState({ isLoading: false });
      }
  }

  onSubmit = name => {
    this.setState({ name: `${Date.now()}/${name}`, page: 1, img: [] });
  };

  onClickLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, modalData: { img: largeImageURL, tags } });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLoading, img, name, page, showModal, modalData, totalImg } =
      this.state;

    const quantityPages = Math.ceil(totalImg / PER_PAGE);

    return (
      <ContainerApp>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}

        <ImageGallery items={img} onClick={this.handleOpenModal} />
        {name && page < quantityPages && <Button click={this.onClickLoad} />}
        {showModal && (
          <Modal
            onclose={this.handleCloseModal}
            img={modalData.img}
            alt={modalData.tags}
          />
        )}
        <Toaster />
      </ContainerApp>
    );
  }
}
