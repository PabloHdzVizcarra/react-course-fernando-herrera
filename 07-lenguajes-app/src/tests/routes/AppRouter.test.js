import React from 'react';
import { mount } from "enzyme"
import { AppRouter } from '../../router/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en <AppRouter />', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }

  test('should mostrar el login si no esta autenticado', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  test('should mostrar el componente de marvel si esta autenticado', () => {
   
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Lucero'
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    )
    expect(wrapper.find('h2').text()).toBe('Marvel Heroes');
    expect(wrapper.find('.navbar').exists()).toBe(true);
  })
  
  
  
})
