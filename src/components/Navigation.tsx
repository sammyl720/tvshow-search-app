import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import TvContext from '../context/TvContext/TvContext'
import { useLocation } from 'react-router-dom'
import { ChevronLeftOutlined } from '@material-ui/icons'
export type props = {
  routes: { route: string; name: string }[]
}

const Navigation = ({ routes }: props): React.ReactElement => {
  const {
    state: { liked }
  } = useContext(TvContext)
  const location = useLocation()

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
                {name}
                {liked.length > 0 && (
                  <span className="badge">{liked.length}</span>
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
