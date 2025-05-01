// import React from 'react'
import FormElem from './UserForm';
import ReactDOM from "react-dom/client";
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/components/App' ;
// import { store } from './components'; 
import {store} from "./store";

const App = () => {
  return (
    <div>
  <FormElem/>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export default App
