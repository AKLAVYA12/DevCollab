import { useEffect, useState } from "react";
import api from "../backend/middleware/Axios.js";

function Create_project(){
  const [fileByte,fileByteState] = useState(null);
  const [error,errorState] = useState(null);
  const [name,nameState] = useState("");
  const [show,showState] = useState(false);
  const [projectName,projectNameState] = useState("");
  const [loading,loadingState] = useState(false);

useEffect(()=>{
    const verify = async () =>{
      try {
        const check = await api.get("/dashboard");
        nameState(check.data.name);
      } catch (err) {
        if(err.response?.status === 401){
          return window.location.href = "/";
        }
      }
    }
    verify();
  },[]);
 
  const sendfile = async () =>{
    if(!fileByte){
      window.alert("select file first");
    }
    const form = new FormData();
    form.append("pdf",fileByte);
    form.append("projectName",projectName);
    loadingState(true);
    try {
      const dataSend = await api.post("/uplodefile",form);
      console.log(dataSend.data);
      showState(true);
    } catch (error) {
      errorState(error.message);
    } finally{
      loadingState(false);
    }
  }

return(
    <>
      <div>
          <h1>Create Your Project</h1>
          {loading && <p>Loading...</p>}
        <div className="createproject">
            <input type="text" placeholder="Enter your project name" 
            onChange={e => projectNameState(e.target.value)} value={projectName}/>
            <input type="file"
             onChange={e => fileByteState(e.target.files[0])}/> 
            <button onClick={sendfile}>submit</button>  
            {show && (
              <>
                <p>Your Project has been created</p>
                <p>Createby: {name}</p>
              </>
            )}
        </div>
      </div>
    </>
);
}
export default Create_project;