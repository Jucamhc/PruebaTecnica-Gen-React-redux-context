import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { CustomDialog, dialogOpenSubject$ } from '..'
import { FavoriteTable } from './FavoriteTable'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
 useSelector((store: AppStore) => store.favorites)


  const handleClick = () => {
    dialogOpenSubject$.setSubject = true
  }

  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Programing Test Application
          </Typography>

          <IconButton
            aria-label="favorites"
            color="secondary"
            component="label"
            onClick={handleClick}
          >
            <FavoriteIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
