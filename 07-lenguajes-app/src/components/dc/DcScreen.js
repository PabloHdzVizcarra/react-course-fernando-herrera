import React from 'react'
import HeroList from '../heroes/HeroList'

export const DcScreen = () => {
  return (
    <div className=''>
      <h2>Dc Heroes</h2>
      <hr />
      
      <HeroList publisher={'DC Comics'} />
    </div>
  )
}
