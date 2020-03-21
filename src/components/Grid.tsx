import React from 'react'
import './Grid.scss'
import Cell from './Cell'

interface GridProps {
  rows: number;
  columns: number;
  selected: number[];
}

function Grid({ rows, columns, selected }: GridProps) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 20px)`
  }
  const cells = new Array(rows * columns).fill(1)
  const isSelected = (index: number) => {
    return selected.includes(index)
  }
  return (
    <div className="grid">
      <div className="grid-container" style={gridStyle}>
        {cells.map((value, index) => {
          return <Cell key={index} selected={isSelected(index)} />
        })}
      </div>
    </div>
  )
}

export default Grid
