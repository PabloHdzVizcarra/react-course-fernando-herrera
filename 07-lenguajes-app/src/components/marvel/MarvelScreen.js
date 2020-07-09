import React from 'react'
import HeroList from '../heroes/HeroList'

export const MarvelScreen = () => {
  return (
    <div className=''>
      <h2>Marvel Heroes</h2>
      <hr />
      
      <HeroList publisher={'Marvel Comics'} />
    </div>
  )
}
