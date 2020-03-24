import { createContext } from 'react';

export interface IGameContext {
  toggleSelected: (index: number) => void;
  setRows: (value: number) => void;
  setColumns: (value: number) => void;
}

export const GameContext = createContext({
  toggleSelected: (index: number) => {},
  setRows: (value: number) => {},
  setColumns: (value: number) => {},
});
