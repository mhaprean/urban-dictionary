import WordDefinition, { IUrbanDictionaryWord } from "./WordDefinition";
import styled from 'styled-components';

interface IPropsWordList {
  status: "error" | "loading" | "success";
  isFetching: boolean;
  words: IUrbanDictionaryWord[];
  onTermUpdate: (term: string) => void;
}

const StyledWordList = styled('div')`

  .definitionsCount {
    margin-bottom: 20px;
  }
`;

const WordList = ({ status, isFetching, words, onTermUpdate }: IPropsWordList) => {

  return <StyledWordList className="WordList">
    {words && <div className="definitionsCount">{words.length} definitions:</div>}
    {isFetching && 'Loading...'}
    {!isFetching && status === 'error' && 'Error fetching data. Try again later'}
    {!isFetching && words?.map((element, idx: number) => <WordDefinition onChange={onTermUpdate} key={idx} word={element} />)}
  </StyledWordList>
}

export default WordList;