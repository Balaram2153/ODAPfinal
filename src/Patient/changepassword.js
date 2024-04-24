
import axios from "axios";

import { Link } from "react-router-dom";
import { getPatientDetail, getPatientDetails } from "./Authstate";
import { useState } from "react";
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";

const Changepassword=()=>{
   
    const [patientId,setPatientId]=useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submit=async()=>{

        if(patientId===''){
            document.getElementById('message').innerHTML='enter patientId';
            document.getElementById('message').style.color='red';
            document.getElementById('pass').style.borderColor='red';
        }
        else if(password===''){
            document.getElementById('message').innerHTML='enter the new password';
            document.getElementById('message').style.color='red';
            document.getElementById('pass').style.borderColor='red';
        }else if(confirmPassword===''){
            document.getElementById('remessage').innerHTML='enter the re-password';
            document.getElementById('remessage').style.color='red';
            document.getElementById('repass').style.borderColor='red';
        }else if (!isValidPassword(password)) {
            alert(
              'Password must be 8 to 16 characters long and include at least one letter, one number, and one special character.'
            );
            document.getElementById('pass').style.borderColor = 'red';
          }else if (!isValidRePassword(confirmPassword)) {
            alert(
              'Password must be 8 to 16 characters long and include at least one letter, one number, and one special character.'
            );
            document.getElementById('repass').style.borderColor = 'red';
          }else if(password===confirmPassword){
        const data={
            patientId,
            password,
            confirmPassword,
        }
       
       
        try{
            const response=axios.put(`http://localhost:8098/api/register/${patientId}`,data)

            setPatientId('');
            setPassword('');
            setConfirmPassword('');
            document.getElementById('sucessmessage').innerHTML='your password has been changed successfully';
            document.getElementById('redirect').innerHTML='Go to Login page';
            console.log(response);
        }catch{
            console.log("some error occured");
        }
    }else{
        alert("changing the password is failed");
    }
    }

    const isValidPassword = (password) =>{
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
    }
    const isValidRePassword = (confirmPassword) =>{
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(confirmPassword);
    }
    
    return(
        <>
        <LandNav/>
        <div className="container-fluid">
            <div className="container mx-auto d-block">
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-body-secondary mx-auto d-block p-3 mt-5" style={{width:"30rem"}}>
                        <label className="text-info p-2 fw-bold">Patient ID</label>
                        <input type="text" placeholder="Enter Patient ID" id="pass" value={patientId} onChange={(e)=>setPatientId(e.target.value)} className="form-control"/>
                        <span id="message" className="fw-bold text-center p-2"></span><br/>
                        <label className="text-info p-2 fw-bold">New Password</label>
                        <input type="text" placeholder="Enter the New Password" id="pass" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"/>
                        <span id="message" className="fw-bold text-center p-2"></span>
                        <br/>
                        <label className="text-info p-2 fw-bold">Re-Enter Password</label>
                        <input type="text" placeholder="Re-Enter the password" id="repass" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="form-control"/>
                        <span id="remessage" className="fw-bold text-center p-2"></span>
                        <div>
                            <button className="btn btn-success mt-4 fw-bold" onClick={submit}>Change the password</button>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                    <span id="sucessmessage" className="text-success fw-bold text-center"></span>
                    <div className="mt-3">
                    <Link to='/login' className="text-info fw-bold" id="redirect"></Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterPage/>
        </>
    )
}
export default Changepassword;