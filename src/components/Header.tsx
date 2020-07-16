import React from 'react'
import props from '../interfaces/Header'

export default function Header({ title }: props): React.ReactElement {
  return (
    <div className='header'>
      <h1 className="header-title">
        {title}
      </h1>
    </div>
  )
}
