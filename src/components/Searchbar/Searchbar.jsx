import { Component } from 'react';
import {
  ButtonSerch,
  FormSerch,
  HeaderSerch,
  InputSerch,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  onChangeInput = evt => {
    this.setState({
      name: evt.target.value.trim().toLowerCase(),
    });
  };

  submitForm = evt => {
    evt.preventDefault();
    if (this.state.name.trim() === '')
      return toast('Can not be empty!', {
        icon: '☝',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 700,
        },
      });

    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <HeaderSerch>
        <FormSerch onSubmit={this.submitForm}>
          <ButtonSerch type="submit">
            <span>
              <BsSearch />
            </span>
          </ButtonSerch>

          <InputSerch
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
            name="name"
            value={this.state.name}
          />
        </FormSerch>
      </HeaderSerch>
    );
  }
}
