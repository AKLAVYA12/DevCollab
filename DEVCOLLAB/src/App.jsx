import Front from "./frontend/Front.jsx";
import Register from "./frontend/Register.jsx";
import Dashboard from "./frontend/Dashboard.jsx";
import CreateProject from "./frontend/CreateProject.jsx";
import CheckProject from "./frontend/CheckProject.jsx";
import { Routes,Route } from "react-router-dom";
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Front/>}></Route>
      <Route path="/register-hm" element={<Register/>}/>
      <Route path="/Dashboard-hm" element={<Dashboard/>}/>
      <Route path="/Create-Project" element={<CreateProject/>}/>
      <Route path="/Check-Project" element={<CheckProject/>}/>
    </Routes>  
  )
}

export default App
