import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/",
    withCredentials: true,
});

function Dashboard(){
    const [message, messageState] = useState("");
    const [user, userState] = useState(null);
    const [error, errorState] = useState("");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await api.get("/dashboard");

                messageState(res.data.message);
                userState(res.data.user);
            } catch (err) {
                errorState(err.response?.data?.message || "invalid token");
            }
        };

        verifyToken();
    }, []);

    return(
        <>
            <h1>Hi...Login</h1>
            {message && <p>{message}</p>}
            {user && <p>{user.userId}</p>}
            {error && <p>{error}</p>}
        </>
    );
}
export default Dashboard;
