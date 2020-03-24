import { useState, useEffect } from 'react';
import Cell from '../models/cell';
import findNeighbors from '../utils/findNeighbors';

interface UseGridCellsResponse {
  cells: Cell[]
}

export default function(rows: number, columns: number): UseGridCellsResponse {
  const [cells, setCells] = useState<Cell[]>([]);

  const setItems = () => {
    const gridSize = columns * rows;
    const createdCells: Cell[] = new Array(rows * columns).fill(null).map((value, index) => {
      return {
        id: index,
        neighbors: findNeighbors(index, columns, gridSize)
      }
    });
    setCells(createdCells);
  }
  useEffect(setItems, [rows, columns])
  return {
    cells
  }
}
