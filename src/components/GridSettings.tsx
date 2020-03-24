import React, { useContext } from 'react'
import { GameContext, IGameContext } from '../pages/GameContext'
import Select from './Select'

interface GridSettingsProps {
  rows: number;
  columns: number;
}

interface GridSettingsOption {
  value: number;
}

export default function GridSettings({ rows, columns }: GridSettingsProps) {
  const options: GridSettingsOption[] = [
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
  ]
  const { setRows, setColumns } = useContext<IGameContext>(GameContext)

  return (
    <div>
      <Select options={options} selected={rows} onChange={(rows: number) => setRows(rows)} />
      <Select options={options} selected={columns} onChange={(columns: number) => setColumns(columns)} />
    </div>
  )
}
