import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/",
    withCredentials: true,
});

function Front() {
    const [email,emailState] = useState("");
    const [password,passwordState] = useState("");
    const [error,errorState] = useState(null);
    const [loading,loadingState] = useState(false);
    const navigate = useNavigate();

    const sendtoRegister = () =>{
        navigate("/register-hm");
    }

    const login = async () =>{
        try {
        loadingState(true);
        const res = await api.post("/auth/checkuser", { email, password });
        console.log("success:", res.data);
        navigate("/Dashboard-hm");
        } catch (err) {
         errorState(err.response?.data?.message);
        } finally{
            loadingState(false);
        }
    }

return(
        <>
            <div>
                <h1 className="title">Welcome to the site</h1>
                <div className="front">
                    {loading && <p>loading...</p>}
                    <input type="text" placeholder="email" 
                    value={email} onChange={e => emailState(e.target.value)}/> 
                    <input type="password" placeholder="password" 
                    value={password} onChange={e => passwordState(e.target.value)}/>
                    <button onClick={login}>Login</button>
                    <button onClick={() => sendtoRegister()}>Register</button>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
}
export default Front;