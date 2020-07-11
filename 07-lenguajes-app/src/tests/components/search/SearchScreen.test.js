import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';


describe('test en <SearchScreen />', () => {
  
  test('should show correctly with default values', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']} >
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Busca un Heroe');

  });

  test('should mostrar a batman y el input con el calor del queryString', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']} >
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });

  test('should show text error when not exists hero', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']} >
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-danger').text().trim()).toBe('No existen heroes batman123');
  });

  test('should llamar el push de history', () => {
    
    const history = {
      push: jest.fn(),
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']} >
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault() { }
    });

    expect(history.push).toHaveBeenCalledWith('?q=batman');

  })
  
  
  
  
})
