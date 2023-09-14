import { People } from '@/data'
import { Person } from '@/models'
import { addFavorite, addPeople, removeFavorite } from '@/redux/states'
import { AppStore } from '@/redux/store'
import { Checkbox, IconButton } from '@mui/material'
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Delete from '@mui/icons-material/Delete'

export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
  const pageSize = 5
  const dispatch = useDispatch()

  const stateFavorites = useSelector((store: AppStore) => store.favorites)

  const handleClick = (person: Person) => {
    dispatch(removeFavorite(person))
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
            <IconButton
              aria-label="favorites"
              color="secondary"
              component="label"
              onClick={() => {
                handleClick(params.row)
              }}
            >
              <Delete />
            </IconButton>
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
        rows={stateFavorites}
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

export default FavoriteTable
