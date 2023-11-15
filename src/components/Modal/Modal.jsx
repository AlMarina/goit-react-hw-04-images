import { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') this.props.onclose();
  };

  handleClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) this.props.onclose();
  };

  render() {
    const { img, alt } = this.props;
    return (
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalContainer>
          <img src={img} alt={alt} loading="lazy" />
        </ModalContainer>
      </Overlay>
    );
  }
}
