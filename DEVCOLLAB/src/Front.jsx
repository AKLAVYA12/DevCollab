import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api = axios.create({
    baseURL : "http://localhost:3000/",
});

function Front() {
    const [email,emailState] = useState("");
    const [password,passwordState] = useState(null);
    const [error,errorState] = useState(null);
    const [loading,loadingState] = useState(false);
    const navigate = useNavigate();

    const sendtoRegister = () =>{
        navigate("/register-hm");
    }

    const login = async () =>{
        // const storeData = await api.post("/userRegister",{name,password});
        navigate("/Dashboard-hm");
    }

    return(
        <>
            <div>
                <h1 className="title">Welcome to the site</h1>
                <div className="front">
                    <input type="text" placeholder="email" 
                    value={email} onChange={e => emailState(e.target.value)}/>
                    <input type="password" placeholder="password" 
                    value={password} onChange={e => passwordState(e.target.value)}/>
                    <button onClick={login}>Login</button>
                    <button onClick={() => sendtoRegister()}>Register</button>
                </div>
            </div>
        </>
    );
}
export default Front;