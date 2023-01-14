const initialState = { status: '' };

export default function(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
}