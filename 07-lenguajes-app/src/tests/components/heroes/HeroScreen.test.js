import React from 'react';
import { mount } from "enzyme";
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Test en <HeroScreen />', () => {
  
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  }

  const wrapper = mount(
    <MemoryRouter initialEntries={['/hero']}>
      <HeroScreen history={historyMock} />
    </MemoryRouter>
  );

  test('should mostrar redirect si no hay argumentos en el URL', () => {
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Redirect').exists()).toBe(true);
  })
  
  test('should mostrar un heroe si el parametro existe y se encuentra', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('p').text().trim()).toBe('Tony Stark');
    expect(wrapper.find('.row').exists()).toBe(true);

  })

  test('should debe de regresar a la pantalla anterior con push', () => {
    
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock}/>}   
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.goBack).not.toHaveBeenCalled();

  })

  test('should regresar a la pantalla anterior', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route 
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    )

    wrapper.find('button').prop('onClick')();

    expect(historyMock.goBack).toHaveBeenCalledWith();
    expect(historyMock.push).not.toHaveBeenCalled();
  })

  test('should llamar el redirect si el hero no existe', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron45644564']}>
        <Route 
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    )

    expect(wrapper.text()).toBe('');

    
  })
  
  
  
  
  
})
