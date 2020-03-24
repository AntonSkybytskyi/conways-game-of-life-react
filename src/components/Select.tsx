import React, { ChangeEvent } from 'react'
interface SelectProps {
  options: Array<{value: number}>
  selected: number;
  onChange: (select: number) => void;
}
export default function Select({ options, onChange, selected }: SelectProps) {
  return (
    <select value={selected} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
      onChange(Number(event.target.value))
    }}>
      {options.map((option, index) => {
        return <option key={index} value={option.value}>{option.value}</option>
      })}
    </select>
  )
}
