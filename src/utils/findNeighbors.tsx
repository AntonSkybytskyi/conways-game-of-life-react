import { sortItems } from './sortItems';

const getLeft = (position: number, columns: number): number => {
  return position % columns === 0 ? position + columns - 1 : position - 1;
}
const getRight = (position: number, columns: number): number => {
  const result = (position + 1) % columns === 0 ? position - columns + 1 : position + 1;

  return result;
}
const getNeighborsForOtherRow = (start: number, columns: number, gridSize: number): number[] => {
  if (start < 0) {
    // last row data
    return [
      getLeft(start + gridSize, columns),
      start + gridSize,
      getRight(start + gridSize, columns),
    ];
  }
  if (start >= gridSize) {
    // get first row
    return [
      getLeft(start - gridSize, columns),
      start - gridSize,
      getRight(start - gridSize, columns),
    ];
  }
  return [getLeft(start, columns), start, getRight(start, columns)];
}

export default function(cell: number, columns: number, gridSize: number): number[] {
  const neighborsTop: number[] = getNeighborsForOtherRow(cell - columns, columns, gridSize);
  const neighborsBelow: number[] = getNeighborsForOtherRow(cell + columns, columns, gridSize)
  const neighborsOnRow: number[] = [getLeft(cell, columns), getRight(cell, columns)]

  return sortItems([
    ...neighborsTop,
    ...neighborsOnRow,
    ...neighborsBelow,
  ]);
}
