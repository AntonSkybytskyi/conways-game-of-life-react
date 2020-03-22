import React, { useState, useCallback, useEffect } from 'react'
import Grid, { Cell } from '../components/Grid'
import { GameContext } from './GameContext';
import { sortItems } from '../utils/sortItems';
import useInterval from '../hooks/useInterval';


interface Map {
  [key: number]: Cell;
}

export default function Game() {
  const [rows, setRows] = useState<number>(10);
  const [columns, setColumns] = useState<number>(10);
  const [seleceted, setSelected] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [map, setMap] = useState<Map>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetGame = (): void => {
    setSelected([]);
    setCounter(0);
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

  const onStartClicked = () => {
    setIsRunning(!isRunning);
  }
  useInterval(() => {
    setCounter(counter + 1);
  }, isRunning ? 100 : null)
  const toggleSelected = (index: number): void => {
    const updateSelected: number[] = seleceted.includes(index)
      ? seleceted.filter(item => item !== index)
      : [...seleceted, index]

      setSelected(sortItems(updateSelected))
  }

  const setCells = (cells: Cell[]) => {
    const updatedMap: Map = {};
    cells.forEach((cell: Cell) => {
      updatedMap[cell.id] = cell;
    });
    setMap(updatedMap);
  }
  const isCurrentItemAlife = (id: number): boolean => seleceted.includes(id);
  useEffect(() => {
    // next tick
    const newSelected: number[] = []
    Object.values(map).forEach(({ id, neighbors }: Cell) => {
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
    setSelected(newSelected);
    if (seleceted.length === 0) {
      setIsRunning(false);
    }
  }, [counter]);

  return (
      <GameContext.Provider value={{
        toggleSelected,
        setCells
      }}>
        <form onSubmit={handleSubmit}>
          <input type="number" name="rows" placeholder="rows" />
          <input type="number" name="columns" placeholder="columns" />
          <button type="submit">Apply</button>
        </form>
        <Grid rows={rows} columns={columns} cells={Object.values(map)} selected={seleceted} />

        <br />
        <strong>{counter}</strong>
        <br />
        <button onClick={() => setCounter(counter + 1)}>Next</button>
        <button onClick={() => onStartClicked()}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={() => resetGame()}>Clean</button>


      </GameContext.Provider>
  )
}
