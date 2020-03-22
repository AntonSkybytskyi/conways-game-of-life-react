import React, { useEffect, useState, useContext } from 'react'
import './Grid.scss'
import Cell from './Cell'
import { sortItems } from '../utils/sortItems'
import { GameContext } from '../pages/GameContext'

interface GridProps {
  rows: number;
  columns: number;
  selected: number[];
  cells: Cell[];
}

export interface Cell {
  id: number;
  neighbors: number[];
}
const getPosibleNeighborsToItem = (item: number, columns: number): number[] => {
  const neighborsTop: number[] = [item - columns - 1, item - columns, item - columns + 1]
  const neighborsBelow: number[] = [item + columns - 1, item + columns, item + columns + 1]
  const neighborsOnRow: number[] = [item - 1, item + 1]
  return sortItems([
    ...neighborsTop,
    ...neighborsOnRow,
    ...neighborsBelow,
  ]);
}

function Grid({ rows, columns, selected, cells }: GridProps) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 20px)`
  }
  const { setCells } = useContext<any>(GameContext);


  useEffect(() => {
    const _cells: Cell[] = new Array(rows * columns).fill(null).map((value, index) => {
      return {
        id: index,
        neighbors: getPosibleNeighborsToItem(index, columns)
      }
    });
    setCells(_cells);
  }, [rows, columns])


  const isSelected = (index: number) => {
    return selected.includes(index)
  }
  return (
    <div className="wrapper">
      <div className="grid-container" style={gridStyle}>
        {cells.map(({ id: key }) => {
          return <Cell key={key} index={key} selected={isSelected(key)} />
        })}
      </div>
    </div>
  )
}

export default Grid
