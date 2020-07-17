import React from 'react'
import { Link } from 'react-router-dom'

export type props = {
  routes: { route: string; name: string }[]
}

const Navigation = ({ routes }: props): React.ReactElement => {
  return (<nav className='navigation-wrapper'>
      <ul className="navigation-list">
        { routes.map(({ route, name }) => {
          return ( <Link className='navigation-item' key={name} to={route} >
              <li className="navigation-item">
                { name }
              </li>
            </Link>)
        })}
      </ul>
    </nav>)
}

export default Navigation
