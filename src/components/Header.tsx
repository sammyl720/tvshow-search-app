import React from 'react'
import { props as NavProps } from './Navigation'

type props = {
  title: string;
  Navigation: React.FC<NavProps>;
}
export default function Header({ title, Navigation }: props): React.ReactElement {
  return (
    <div className='header'>
      <h1 className="header-title">
        {title}
      </h1>
      <Navigation routes={[{ route: '/', name:'Search' }, { route: '/liked', name: 'Liked'}]} />
    </div>
  )
}
