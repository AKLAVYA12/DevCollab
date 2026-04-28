import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../backend/middleware/Axios.js";

function Dashboard(){
    const [message, messageState] = useState("");
    const [name,nameState] = useState("");
    const [user, userState] = useState(null);
    const [error, errorState] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await api.get("/dashboard");
                const getname = res.data.name;
                nameState(getname);
            } catch (err) {
                if(err.response?.status === 401){
                    return window.location.href = "/";
                }
                errorState(err.response?.data?.message || "invalid token");
            }
        };

        verifyToken();
    }, []);

    const Create_project = () =>{
        navigate("/Create-Project");
    }

    return(
        <>
            <h1>Hello {name}</h1>
            <button onClick={Create_project}>Create project</button> 
            <button>Check exist</button>
            <ul>
                <li>Your stats</li>
                <li>...</li>
            </ul>
        </>
    );
}
export default Dashboard;
