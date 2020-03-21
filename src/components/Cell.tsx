import React from 'react'
import classnames from 'classnames';

interface CellProps {
  selected: boolean;
}
function Cell({ selected }: CellProps) {
  const classNameList = classnames('grid-item', { selected })
  return (
    <div className={classNameList}></div>
  )
}

export default Cell
