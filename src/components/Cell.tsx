import React, { useContext } from 'react'
import classnames from 'classnames';
import { GameContext, IGameContext } from '../pages/GameContext';

interface CellProps {
  selected: boolean;
  index: number;
}
function Cell({ selected, index }: CellProps) {
  const { toggleSelected } = useContext<IGameContext>(GameContext);
  const classNameList = classnames('grid-item', { selected })
  return (
    <div className={classNameList} onClick={() => toggleSelected(index)}></div>
  )
}

export default Cell
