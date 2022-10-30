const SET_DATA_ACCOUNTS = 'SET_DATA_ACCOUNTS';

export function setDataAccounts(data: any) {
  return {
    type: SET_DATA_ACCOUNTS,
    payload: data,
  };
}

const initialState = {
  data: null,
};

export function someReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_DATA_ACCOUNTS:
      return {...state, data: action.payload};
    default: return state;
  }
}
