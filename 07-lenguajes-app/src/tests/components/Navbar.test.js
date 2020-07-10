import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom'

import { AuthContext } from '../../auth/AuthContext';
import { Navbar } from '../../components/ui/NavBar';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../types/types';

describe('Test in <Navbar />', () => {

  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  }

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Pablo',
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  )

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should mostrarse correctamente', () => {
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Pablo');
  });

  test('should llamar logout y usar el history', () => {
    
    wrapper.find('button').prop('onClick')();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
    expect(historyMock.replace).toHaveBeenCalledTimes(1);
  })
  
  
})
