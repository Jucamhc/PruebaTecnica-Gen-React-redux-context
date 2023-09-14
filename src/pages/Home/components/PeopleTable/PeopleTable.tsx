import { People } from '@/data'
import { Person } from '@/models'
import { addFavorite, addPeople } from '@/redux/states'
import { AppStore } from '@/redux/store'
import { Checkbox } from '@mui/material'
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const pageSize = 5
  const dispatch = useDispatch()

  const statePeople = useSelector((store: AppStore) => store.people)

  const findPerson = (person: Person) =>
    !!selectedPeople.find((p) => p.id === person.id)

  const filterPerson = (person: Person) =>
    selectedPeople.filter((p) => p.id != person.id)

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person]

    dispatch(addFavorite(filteredPeople))
    setSelectedPeople(filteredPeople)
  }

  const colums = [
    {
      field: 'Actions',
      type: 'actions',
      sortable: false,
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

  useEffect(() => {
    dispatch(addPeople(People))
  }, [])

  return (
    <div>
      <DataGrid
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        pageSizeOptions={[pageSize]}
        columns={colums}
        rows={statePeople}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getRowId={(row: any) => row.id}
      />
    </div>
  )
}

export default PeopleTable
