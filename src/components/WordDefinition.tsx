import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment';

export interface IUrbanDictionaryWord {
  definition?: string;
  permalink?: string;
  thumbs_up?: number;
  sound_urls?: string[];
  author?: string;
  word?: string;
  defid?: number;
  current_vote?: string;
  written_on?: string;
  example?: string;
  thumbs_down?: number;
}

interface IPropsWordDefinition {
  word: IUrbanDictionaryWord;
  onChange: (value: string) => void;
}

const StyledWordDefinition = styled('div')`
  margin-bottom: 20px;
  background: var(--background-paper);
  border-radius: 4px;
  padding: 20px 10px;
  border: 1px solid var(--border-color);

  .wordHeader {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    border-radius: 50px;
    padding: 5px 5px;
    background: var(--background-paper-darker);
    border: 1px solid var(--border-color);
    max-width: 100%;
    margin: 5px;

    &:first-child {
      margin-left: auto;
    }

    .thumb {
      display: flex;
      align-items: center;
      flex-grow: 1;
      margin: 0 5px;
      max-width: 120px;

      &:first-child {
        border-right: 1px solid var(--border-color);
      }

      span {
        margin: 0 10px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    svg {
      width: 16px;
      height: 16px;
      fill: var(--primary-color);
      flex-shrink: 0;
    }
  }

  .Word {
    color: var(--primary-color);
    margin-right: auto;
  }

  .Examples,
  .Definition {
    margin-top: 40px;
    word-wrap: anywhere;
    color: var(--text-color);
  }

  .line {
    margin-top: 20px;
  }

  .highlighted-text {
    color: var(--primary-color);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: 0.2s all ease-in-out;
    z-index: 1;
    padding: 2px;

    &:hover {
      background-color: var(--primary-color-light);
    }
  }
`;

/**
 * Helper function that we use inside WordDefinition component.
 * @param text - a long string containing a definition of a word.
 * the definition may contain also some words that we can search, and those words are inside Square brackets. ex: [night]
 * @returns an array with all those highlighted words. ex: ['[fruit]', '[oranges]']
 */
const extractWords = (text: string) => {
  const regexBrackets = /\[(.*?)\]/g;
  const wordList = [];
  let found = null;
  while ((found = regexBrackets.exec(text))) {
    wordList.push(`[${found[1]}]`);
  }

  return wordList;
};

const WordDefinition = ({ word, onChange }: IPropsWordDefinition) => {
  /**
   * This is a custom JSX block that we can pass to Highlighter library.
   * This way we can add our own custom classes to style the element as we need.
   * also we can add an onClick function to the custom element.
   * @param children is the text that we need to highlight
   * @returns
   */
  const Highlight = ({ children, highlightIndex }: { children: string; highlightIndex: number }) => {
    const term = children.replace('[', '').replace(']', '');

    return (
      <strong className="highlighted-text" onClick={() => onChange(term)}>
        {term}
      </strong>
    );
  };

  const wordDate = moment(word.written_on).format('DD-MMM-YYYY');

  return (
    <StyledWordDefinition className="WordDefinition">
      <div className="wordHeader">
        <h2 className="Word">{word.word}</h2>
        <div className="chip">
          <div className="thumb">
            <svg viewBox="0 0 24 24">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
            </svg>

            <span>{word.thumbs_up}</span>
          </div>

          <div className="thumb">
            <svg viewBox="0 0 24 24">
              <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
            </svg>

            <span>{word.thumbs_down}</span>
          </div>
        </div>

        <div className="chip">
          <div className="thumb">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path>
            </svg>
            <span>{word.author}</span>
          </div>
          <div className="thumb">
            <svg viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
            </svg>
            <span>{wordDate}</span>
          </div>
        </div>
      </div>

      <div className="Definition">
        <h4>Definition:</h4>
        {word?.definition?.split('\n').map((line, idx) => (
          <div key={idx} className="line">
            <Highlighter searchWords={extractWords(line || '')} autoEscape={true} textToHighlight={line || ''} highlightTag={Highlight} />
          </div>
        ))}
      </div>

      <div className="Examples">
        <h4>Example:</h4>

        {word?.example?.split('\n').map((example, idx) => (
          <div key={idx} className="line">
            <Highlighter searchWords={extractWords(example)} autoEscape={true} textToHighlight={example} highlightTag={Highlight} />
          </div>
        ))}
      </div>
    </StyledWordDefinition>
  );
};

export default WordDefinition;
