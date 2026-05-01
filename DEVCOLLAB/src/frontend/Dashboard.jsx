import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../backend/middleware/Axios.js";

function Dashboard() {
  const [name, setName] = useState("");
  const [projectCount, setProjectCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      setError("");
      const res = await api.get("/dashboard");
      setName(res.data.name);
      setUserId(res.data.id);
      setProjectCount(res.data.projectCount ?? 0);
    } catch (err) {
      if (err.response?.status === 401) {
        return window.location.href = "/";
      }
      setError(err.response?.data?.message || "Invalid token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  });

  const ChekProject = () =>{
    navigate("/Check-Project");
  }


  const goToCreateProject = () => {
    navigate("/Create-Project");
  };

  const logout = () => {
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <h1>Hello {name || "User"}</h1>
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="error">{error}</p>}

      <div className="dashboard-actions">
        <button onClick={goToCreateProject}>Create project</button>
        <button onClick={logout}>Logout</button>
      </div>

      <ul className="dashboard-stats">
        <li>Your name: {name || "-"}</li>
        <li>Your ID: {userId || "-"}</li>
        <li>number of project : {projectCount}</li>
        <li><button onClick={ChekProject}>Check project</button></li>
        <li>Click Create button for project Creation</li>
      </ul>
    </div>
  );
}

export default Dashboard;
