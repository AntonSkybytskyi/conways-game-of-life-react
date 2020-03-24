import React, { useState, useCallback, useEffect } from 'react'
import Grid from '../components/Grid'
import { GameContext } from './GameContext';
import { sortItems } from '../utils/sortItems';
import useInterval from '../hooks/useInterval';
import useNextTick from '../hooks/useNextTick';
import useGridCells from '../hooks/useGridCells';

export default function Game() {
  const [rows, setRows] = useState<number>(10);
  const [columns, setColumns] = useState<number>(10);
  const [seleceted, setSelected] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetGame = (): void => {
    setSelected([]);
    setCounter(0);
    setIsRunning(false);
  }
  const handleSubmit = useCallback(
    (event: any): void => {
      event.preventDefault();
      resetGame();
      const { rows, columns } = event.target.elements;
      setRows(Number(rows.value));
      setColumns(Number(columns.value));
    }, []
  )
  useInterval(() => {
    setCounter(counter + 1);
  }, isRunning ? 100 : null);

  const { cells } = useGridCells(rows, columns)

  useNextTick((updatedSelected: number[]) => {
    setSelected(sortItems(updatedSelected));
  }, cells, seleceted, counter);

  const toggleSelected = (index: number): void => {
    const updateSelected: number[] = seleceted.includes(index)
      ? seleceted.filter(item => item !== index)
      : [...seleceted, index]

      setSelected(sortItems(updateSelected));
  }

  return (
      <GameContext.Provider value={{
        toggleSelected
      }}>
        <form onSubmit={handleSubmit}>
          <input type="number" name="rows" placeholder="rows" />
          <input type="number" name="columns" placeholder="columns" />
          <button type="submit">Apply</button>
        </form>
        <Grid columns={columns} cells={cells} selected={seleceted} />

        <br />
        <strong>{counter}</strong>
        <br />
        <button onClick={() => setCounter(counter + 1)}>Next</button>
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={() => resetGame()}>Clean</button>


      </GameContext.Provider>
  )
}
