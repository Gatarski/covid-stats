import { ResponseDataProp, CountryData } from "../interfaces";

interface action {
  type: string,
  payload: any
}

interface state {
  fetchedData: ResponseDataProp[],
  userInput: CountryData
}

const initialState: state = {
  fetchedData: [],
  userInput: {
    checkbox: false,
    country: ''
  }
} 

export const dataReducer = (state = initialState, action: action) => {
  
  if (action.type === 'FETCH_DATA') {
    return { ...state, fetchedData: action.payload }
  }
  if (action.type === 'USER_INPUT') {
    return { ...state, userInput: action.payload }
  }

  return initialState;
};