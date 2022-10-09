import { useDispatch } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { MenuOutlined } from "@mui/icons-material"
import { ActiveLink } from './ActiveLink'

const pages = [
  {
    text: 'Predios',
    href: '/'
  },
  {
    text: 'Terrenos',
    href: '/terrenos'
  },
  {
    text: 'Construcciones',
    href: '/construcciones'
  },
  {
    text: 'Propietarios',
    href: '/propietarios'
  },
]

export const NavBar = ({ drawerWidth = 240 }) => {

  return (
    <AppBar 
        position="fixed"
        sx={{
            width: { sm:`100%` },
            ml: { sm: `${ drawerWidth }px` }
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{ mr:2, display: { sm: 'none' } }}
            >
                <MenuOutlined/>
            </IconButton> 

            <Grid 
                container 
                direction="row"
                justifyContent="space-between"
                alignItems='center'
            >
                <Typography variant='h6' noWrap component='div'> Proyecto Catastro </Typography>

                {
                  pages.map( ({text, href}) => (
                    <ActiveLink key={href} text={text} href={href}/>
                  ))
                }

            </Grid>

        </Toolbar>
    </AppBar>
  )
}
