import { ResponseDataProp } from "../interfaces";

interface action {
  type: string,
  payload: any
}

const initialState: ResponseDataProp[] = []

export const dataReducer = (state = initialState, action: action) => {
  
  if (action.type === 'FETCH_DATA') {
    return [...action.payload]
  }
  return initialState
};