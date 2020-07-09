import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

const HeroList = ({ publisher }) => {

  // usando use memo para ahorrar tiempo de carga en renderizado
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className='card-columns animate__animated animate__fadeIn'>
      {
        heroes.map((hero) => (
          <HeroCard 
            key={hero.id}
            {...hero}
          />
        ))
      } 
    </div>
  )
}

export default HeroList;
