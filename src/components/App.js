import React from 'react'
import FormElem from './UserForm';
import ReactDOM from "react-dom/client";

const app = () => {
  return (
    <div>
  <FormElem/>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FormElem />); 

export default app
