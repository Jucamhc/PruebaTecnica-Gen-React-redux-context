import React from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { People } from '@/data'
import { useState } from 'react'
import { Person } from '@/models'
import { Checkbox } from '@mui/material'

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const pageSize = 5

  const findPerson = (person: Person) =>
    !!selectedPeople.find((p) => p.id === person.id)

  const filterPerson = (person: Person) =>
    selectedPeople.filter((p) => p.id != person.id)

  const handleChange = (person: Person) => {
    setSelectedPeople(
      findPerson(person) ? filterPerson(person) : [...selectedPeople, person]
    )
  }

  const colums = [
    {
      field: 'Actions',
      headerName: '',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'category',
      headerName: 'Categories',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'company',
      headerName: 'companies',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ]
  return (
    <div>
      <DataGrid
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        pageSizeOptions={[pageSize]}
        columns={colums}
        rows={People}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
        }}
        getRowId={(row: any) => row.id}
      />
    </div>
  )
}

export default Home
