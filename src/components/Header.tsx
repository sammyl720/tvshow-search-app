import React from 'react'
import { props as NavProps } from './Navigation'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Container, Grid, Button } from '@material-ui/core'

type props = {
  title: string
  Navigation: React.FC<NavProps>
}
export default function Header({
  title,
  Navigation
}: props): React.ReactElement {
  return (
    <Container maxWidth="lg">
      <Grid
        spacing={2}
        container
        alignItems="center"
        justify="space-evenly"
        style={{ margin: 'auto 15px' }}
      >
        <Grid item xs={12} lg={2}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'rgb(43,90,180)',
              display: 'flex',
              alignItems: 'center'
            }}
            to="/"
          >
            <img src="assets/Tv-Icon.png" alt={title} />
            <h3
              className="header-title"
              style={{ marginLeft: '20px', display: 'inline-block' }}
            >
              {title}
            </h3>
          </Link>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SearchBar />
        </Grid>

        <Grid item xs={12} lg={2} style={{ textAlign: 'center' }}>
          <Navigation routes={[{ route: '/liked', name: 'Liked Episodes' }]} />
        </Grid>
      </Grid>
    </Container>
  )
}
