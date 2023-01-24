import { useState } from 'react';
import SearchBox from './components/SearchBox';
import useWord from './hooks/useWord';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import WordList from './components/WordList';

const StyledApp = styled('div')`
  background: var(--background-default);
  min-height: 100vh;
  color: var(--text-color);
`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  const { status, data, error, isFetching } = useWord(searchTerm);

  const updateTerm = (newTerm: string) => {
    setSearchTerm(newTerm);
  };

  const onThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <StyledApp className={`App ${darkMode ? 'dark' : ''}`}>
      <Navigation onThemeChange={onThemeChange} isDarkMode={darkMode} />
      <div className="container">
        <SearchBox searchTerm={searchTerm} onChange={updateTerm} />
        <WordList words={data?.list || []} isFetching={isFetching} status={status} onTermUpdate={updateTerm} />
      </div>
    </StyledApp>
  );
}

export default App;
