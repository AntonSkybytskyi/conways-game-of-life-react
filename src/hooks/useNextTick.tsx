import { useEffect, useRef } from 'react';
import { Cell } from '../components/Grid';

export default function(callback: (items: number[]) => void, cells: Cell[], seleceted: number[], counter: number) {
  const isCurrentItemAlife = (id: number): boolean => seleceted.includes(id);
  const savedCallback = useRef<any>()
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // next tick
    const newSelected: number[] = []
    cells.forEach(({ id, neighbors }: Cell) => {
      const neighborsCounter: number = neighbors.reduce((result: number, value: number) => {
        return seleceted.includes(value) ? result + 1 : result;
      }, 0);
      if (isCurrentItemAlife(id)) {
        if (neighborsCounter === 2 || neighborsCounter === 3) {
          newSelected.push(id);
        }
      } else {
        if (neighborsCounter === 3) {
          newSelected.push(id);
        }
      }
    });
    savedCallback.current(newSelected);
  }, [counter]);
}
