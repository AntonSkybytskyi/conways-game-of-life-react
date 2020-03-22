import { createContext } from 'react';
import { Cell } from '../components/Grid';

export interface IGameContext {
  toggleSelected: (index: number) => void;
  setCells: (cells: Cell[]) => void;
}

export const GameContext = createContext({
  toggleSelected: (index: number) => {},
  setCells: (cells: Cell[]) => {},
});
