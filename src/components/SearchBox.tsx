import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface IPropsSearchBox {
  searchTerm: string;
  onChange: (value: string) => void;
}

const StyledSearchBox = styled('div')`
  display: flex;
  color: var(--button-color);
  margin-bottom: 20px;

  .SearchInput {
    flex-grow: 1;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid var(--input-border-color);
    background: var(--input-background);
    color: var(--input-color);

    &:hover {
      border: 1px solid var(--input-border-color-hover);
    }
  }
  .SearchButton {
    border: none;
    margin: 0;
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-left: 10px;
    cursor: pointer;

    background: var(--primary-color);

    svg {
      width: 20px;
      height: 20px;
      fill: var(--button-color);
    }
  }
`;

const SearchBox = ({ searchTerm, onChange }: IPropsSearchBox) => {
  const [term, setSearchTerm] = useState(searchTerm);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSearchTerm();
    }
  };

  const updateSearchTerm = () => {
    onChange(term);
  };

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <StyledSearchBox>
      <input className="SearchInput" type="text" ref={inputRef} onChange={handleChangeSearchTerm} value={term} onKeyDown={handleKeyDown} />
      <button className="SearchButton" onClick={updateSearchTerm}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 487.95 487.95">
          <path
            d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
          />
        </svg>
      </button>
    </StyledSearchBox>
  );
};

export default SearchBox;
