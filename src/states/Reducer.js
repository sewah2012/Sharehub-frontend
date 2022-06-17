// reducer.js
export default function reducer(state, action) {
    switch (action.type) {
      case 'LOGIN':
        return {
            ...state,
            isAuthenticated: action.payload,
        };
      case 'SIGNOUT':
        return {
          ...state,
          isAuthenticated: action.payload,
        };
      case 'CURRENT_USER':
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  }