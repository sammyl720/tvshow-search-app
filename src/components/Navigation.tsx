import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge } from '@material-ui/core'
import TvContext from '../context/TvContext/TvContext'
import { useLocation } from 'react-router-dom'
import { ChevronLeftOutlined } from '@material-ui/icons'
import FavoriteIcon from '@material-ui/icons/Favorite'
export type props = {
  routes: { route: string; name: string }[]
}

const Navigation = ({ routes }: props): React.ReactElement => {
  const {
    state: { liked },
    fetchLikedShows
  } = useContext(TvContext)
  const location = useLocation()
  useEffect(() => {
    fetchLikedShows()
  }, [])
  return (
    <nav className="navigation-wrapper">
      <ul className="navigation-list">
        {location.pathname !== '/' && (
          <li className="nav-item">
            <Link to="/">
              <Button>
                <ChevronLeftOutlined />
              </Button>
            </Link>
          </li>
        )}
        {routes.map(({ route, name }) => {
          return (
            <Link className="navigation-item" key={name} to={route}>
              <li className="navigation-item">
                {liked.length > 0 && (
                  <Badge badgeContent={liked.length} color="primary">
                    <FavoriteIcon />
                  </Badge>
                )}
              </li>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
