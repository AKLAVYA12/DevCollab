import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const api = axios.create({
    baseURL : "http://localhost:3000/",
});

function Register() {
    
    const navigate = useNavigate();
    const [name,nameState] = useState("");
    const [email,emailState] = useState("");
    const [pass1,pass1State] = useState("");
    const [pass2,pass2State] = useState("");
    const [error,errorState] = useState("");
    const [errorpass,errorpassState] = useState("");
    const [errormail,errormailState] = useState("");
    const [errorname,errornameState] = useState("");
    const [loading,loadingState] = useState(false);

useEffect(() => {
    errorpassState(pass1 !== pass2 ? "Passwords do not match" : null);

    errormailState(
        email && !email.includes("@gmail.com") ? "Invalid email" : null
    );

    errornameState(
        /\d/.test(name) ? "Name cannot contain numbers" : null
    );
}, [pass1, pass2, name, email]);

const submitData = async () =>{
        try {
            loadingState(true);
            const storeData = await api.post("/auth/register",{name,email,pass1});
        } catch (err) {
            errorState(err.response.data);
        } finally{
            loadingState(false);
        }
}

const getback = () =>{
    navigate("/");
}

const isempty =  !name || !email || !pass1 || !pass2;

return(
        <>
            <div>
                <h1>Register here...</h1>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                <div className="Register">
                    <input type="text" placeholder="Enter name"
                     value={name} onChange={e => nameState(e.target.value)}/> <p className="error1">{errorname}</p>
                    <input type="text" placeholder="Email.." 
                    value={email} onChange={e => emailState(e.target.value)}/><p className="error2">{errormail}</p>
                    <input type="password" placeholder="Enter password" 
                    value={pass1} onChange={e => pass1State(e.target.value)}/><p className="error3">{errorpass}</p>
                    <input type="password" placeholder="Enter password again" 
                    value={pass2} onChange={e => pass2State(e.target.value)}/>
                    <button onClick={submitData} 
                    disabled={isempty} >Submit</button>
                    <button onClick={getback}>Login</button>
                </div>
            </div>
        </>
    );
}
export default Register;
