import { useEffect, useRef } from 'react';
import Cell from '../models/cell';

const isCurrentItemAlife = (id: number, seleceted: number[]): boolean => seleceted.includes(id);
const isGenerateNewLife = (count: number): boolean => count === 3;
const isPossibleToBeAlive = (count: number): boolean => [2, 3].includes(count);
const getNeighborsCount = (neighbors: number[], seleceted: number[]): number => {
  return neighbors.reduce((result: number, value: number) => {
    return seleceted.includes(value) ? result + 1 : result;
  }, 0);
}

export default function(callback: (items: number[]) => void, cells: Cell[], seleceted: number[], counter: number) {
  const savedCallback = useRef<any>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const nextTick = () => {
    // next tick
    const newSelected: Cell[] = cells.filter(({ id, neighbors }: Cell): boolean => {
      const neighborsCounter: number = getNeighborsCount(neighbors, seleceted)
      if (!isPossibleToBeAlive(neighborsCounter)) {
        return false;
      }
      return isCurrentItemAlife(id, seleceted) ? true : isGenerateNewLife(neighborsCounter);
    });
    savedCallback.current(newSelected.map(({ id }: Cell): number => id));
  };

  useEffect(nextTick, [counter]);
}
