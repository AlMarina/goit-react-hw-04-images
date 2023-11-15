import { LoadButton } from './Button.styled';

export const Button = ({ click }) => {
  return (
    <LoadButton type="button" onClick={click}>
      Load more
    </LoadButton>
  );
};
