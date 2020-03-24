import React from 'react'
import './Grid.scss'
import Cell from './Cell'
import ICell from '../models/cell'

interface GridProps {
  columns: number;
  selected: number[];
  cells: ICell[];
}


function Grid({ columns, selected, cells }: GridProps) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 20px)`
  }

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
