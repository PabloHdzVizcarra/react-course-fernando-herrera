import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByNmae';


export const SearchScreen = ({history}) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const [{ searchText }, handleInputChange] = useForm({ searchText: q });
  
  const handleSearch = (event) => {
    event.preventDefault();

    history.push(`?q=${searchText}`);
  }

  const heroesFilter = useMemo(() => getHeroByName(q), [q]);

  return (
    <div>
      <h1>Search</h1>
      <hr />
      
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form
            onSubmit={handleSearch}
          >
            <input
              autoComplete='off'
              type="text" 
              placeholder="busca tu heroe"
              className='form-control'
              name='searchText'
              value={searchText}
              onChange={handleInputChange}
            />
            
            <button
              type='submit'
              className='btn mt-1 btn-block btn-outline-primary'
            >
              Buscar
            </button>
          </form>
          
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {
            (q === '')
              && 
              <div className='alert alert-info'>
                Busca un Heroe
              </div>
          }

          {
            (q !== '' && heroesFilter.length === 0)
              && 
              <div className='alert alert-danger'>
                No existen heroes {q}
              </div>
          }
          
          {
            heroesFilter.map((hero) => (
              <HeroCard 
                key={hero.id}
                {...hero}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
