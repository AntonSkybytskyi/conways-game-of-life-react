import { createContext } from 'react';

export interface IGameContext {
  toggleSelected: (index: number) => void;
}

export const GameContext = createContext({
  toggleSelected: (index: number) => {}
});
