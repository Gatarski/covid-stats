import { Provider } from "react-redux";
import { App } from "./App"
import Store from "./store/Store"

export const Wrapper = () => {
  return(
    <Provider store={Store}>
      <App></App>
    </Provider>
  )
};