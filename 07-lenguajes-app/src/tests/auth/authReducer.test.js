import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";


describe('Tests authReducer', () => {
  
  const initialState = {
    logged: false
  }

  test('should return default state', () => {

    const state = authReducer(initialState, {});
    // console.log(state);
    expect(state).toEqual(initialState);
    
  });

  test('should autenticar y colocar el name del usuario', () => {
    
    const action = {
      type: types.login,
      payload: {
        name: 'Andrea',
      }
    }

    const state = authReducer(initialState, action);
    // console.log(state);
    expect(state).toEqual({
      name: 'Andrea',
      logged: true
    });

  });

  test('should erase username and logged false', () => {
    
    const action = {
      type: types.logout
    }

    expect(authReducer(initialState, action)).toEqual({
      logged: false
    });

  })
  
  
  
})
