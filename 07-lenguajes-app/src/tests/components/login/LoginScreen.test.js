import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('test in <LoginScreen />', () => {

  const historyMock = {
    replace: jest.fn(),
  }

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Thiago'
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <LoginScreen history={historyMock}/>
      </MemoryRouter>
    </AuthContext.Provider>
  )

  test('should Renderizarse correctamente el componente', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(wrapper).toMatchSnapshot();
  })
  
  test('should realizar el dispatch y la navegacion', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <LoginScreen history={historyMock}/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const helperClick = wrapper.find('button').prop('onClick');
    helperClick();

    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Pablo'
      }
    })
    expect(historyMock.replace).toHaveBeenCalledWith('/');

    // Simulando el localStorage
    localStorage.setItem('lastPath', '/dc');
    helperClick();
    expect(historyMock.replace).toHaveBeenCalledWith('/dc');

  })

  
  
  
})
