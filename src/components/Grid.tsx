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
const getLeft = (position: number, columns: number): number => {
  return position % columns === 0 ? position + columns - 1 : position - 1;
}
const getRight = (position: number, columns: number): number => {
  const result = (position + 1) % columns === 0 ? position - columns + 1 : position + 1;

  return result;
}
const getNeighborsForOtherRow = (start: number, columns: number, rows: number): number[] => {
  const size = columns * rows;
  if (start < 0) {
    // last row data
    return [
      getLeft(start + size, columns),
      start + size,
      getRight(start + size, columns),
    ];
  }
  if (start >= size) {
    // get first row
    return [
      getLeft(start - size, columns),
      start - size,
      getRight(start - size, columns),
    ];
  }
  return [getLeft(start, columns), start, getRight(start, columns)];
}
const getPosibleNeighborsToItem = (item: number, columns: number, rows: number): number[] => {
  const neighborsTop: number[] = getNeighborsForOtherRow(item - columns, columns, rows);
  const neighborsBelow: number[] = getNeighborsForOtherRow(item + columns, columns, rows)
  const neighborsOnRow: number[] = [getLeft(item, columns), getRight(item, columns)]

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
        neighbors: getPosibleNeighborsToItem(index, columns, rows)
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
