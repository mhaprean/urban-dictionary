import { useQuery } from '@tanstack/react-query';
import { IUrbanDictionaryWord } from '../components/WordDefinition';

interface IUrbanDictionaryResponse {
  list: IUrbanDictionaryWord[];
}

const getWordByName = async (word: string): Promise<IUrbanDictionaryResponse> => {
  const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default function useWord(word: string) {
  return useQuery(['word', word], () => getWordByName(word));
}
