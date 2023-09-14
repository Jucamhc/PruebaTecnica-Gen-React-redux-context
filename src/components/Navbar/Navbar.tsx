import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { CustomDialog, dialogOpenSubject$ } from '..'
import { FavoriteTable } from './FavoriteTable'
import FavoriteIcon from '@mui/icons-material/Favorite'

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
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

          <Button variant="outlined">Open Favorites</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
