import { BrowserRouter, Routes, Route } from 'react-router'
import App from "./App"

function Routing(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={< App />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;
