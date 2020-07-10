import React from 'react'
import { mount } from 'enzyme'
import { DashboardRoutes } from '../../router/DashboardRoutes'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'


describe('test en <DashboardRoutes />', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: 'Lucero',
      logged: true
    }
  }

  test('should show correctly', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.find('.text-info').text().trim()).toBe('Lucero');
  });


  
  
})
