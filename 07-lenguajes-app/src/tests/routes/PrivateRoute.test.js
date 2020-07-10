import React from 'react';
import {  mount } from "enzyme"
import { PrivateRoute } from "../../router/PrivateRoute"
import { MemoryRouter } from 'react-router-dom';


describe('Test <PrivateRoute />', () => {

  const props = {
    location: {
      pathname: '/marvel'
    }
  }

  // modificamos el protoype del localStorage para hacerlo una funcion de jest
  Storage.prototype.setItem = jest.fn();
  
  test('should mostrar el componente si esta autenticado y guardar localStorage', () => {
    
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    // console.log(wrapper.html());
    expect(wrapper.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

  })

  test('should bloquear el componente si no esta autenticado', () => {
    
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute 
          isAuthenticated={false}
          component={() => <h1>Componente bloqueado</h1>}
          {...props}
        />
      </MemoryRouter>
    )

    expect(wrapper).toEqual({});
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

  })
  
  


})
