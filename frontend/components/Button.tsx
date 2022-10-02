import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  background-color: var(--primary-color);
  color: var(--white-color);
  position: relative;
  border-radius: 25px;
  overflow: hidden;

  > button {
    width: 100%;
    height: 100%;
    font-size: 15px;
  }
`;

interface ButtonType {
  title: string;
  color?: string;
}

const Button = ({
  title,
  color,
}: ButtonType) => (
  <Wrapper color={color}>
    <button type="button">{title}</button>
  </Wrapper>
);
export default Button;