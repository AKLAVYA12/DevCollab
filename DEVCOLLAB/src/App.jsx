import Front from "./Front.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import { Routes,Route } from "react-router-dom";
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Front/>}></Route>
      <Route path="/register-hm" element={<Register/>}></Route>
      <Route path="/Dashboard-hm" element={<Dashboard/>}></Route>
    </Routes>  
  )
}

export default App
