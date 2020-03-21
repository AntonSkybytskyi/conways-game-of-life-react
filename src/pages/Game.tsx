import React, { useState, useCallback, FormEvent } from 'react'
import Grid from '../components/Grid'

export default function Game() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      const { rows, columns } = event.target.elements;
      setRows(rows.value);
      setColumns(columns.value);
    },
    [],
  )
  const seleceted = [1, 10, 20, 99]
  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" name="rows" placeholder="rows" />
          <input type="number" name="columns" placeholder="columns" />
          <input type="submit" value="Apply" />
        </form>
        {/* <input type="number"  /> */}
        <Grid rows={rows} columns={columns} selected={seleceted} />
      </div>
  )
}
