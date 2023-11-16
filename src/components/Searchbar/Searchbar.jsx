import { useState } from 'react';
import {
  ButtonSerch,
  FormSerch,
  HeaderSerch,
  InputSerch,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const onChangeInput = evt => {
    setName(evt.target.value.trim().toLowerCase());
  };

  const submitForm = evt => {
    evt.preventDefault();
    if (name.trim() === '')
      return toast('Can not be empty!', {
        icon: '☝',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 700,
        },
      });
    onSubmit(name);
    setName('');
  };

  return (
    <HeaderSerch>
      <FormSerch onSubmit={submitForm}>
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
          onChange={onChangeInput}
          name="name"
          value={name}
        />
      </FormSerch>
    </HeaderSerch>
  );
};
