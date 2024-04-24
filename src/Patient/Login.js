
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import { setPatientDetail, setPatientDetails } from "./Authstate";
const Login=()=>
{

    const navigate = useNavigate();
    const [patientName,setPatientName]=useState("");
    const [password,setPassword]=useState("");


    useEffect(()=>
    {
        if(patientName!== "" && password!== "")
        {
            fetch('http://localhost:8098/getall/patients')
            .then((response)=>response.json())
            .then((pdata)=>
            {
                const isLoginSuccess=checkLogin(pdata,patientName,password);
             
                        if (isLoginSuccess) {
                          alert("Loggedin Successfully");
                          navigate("/patientdashboard");
                        
                          const loggedIn = pdata.find(
                            (user) =>
                              user.patientName === patientName && user.password === password
                          );
                          console.log(loggedIn);
                          var responseString = JSON.stringify(loggedIn);

// Store the string in local storage
localStorage.setItem('loggedIn', responseString);
//window.localStorage.setItem("myObject",JSON.parse(loggedIn));
//                          //setPatientDetails(loggedIn);
                          
                        } else {
                          // Handle unsuccessful login
                          alert("Invalid patientName or password");
                          
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching data:", error);
                        // Handle error fetching data
                      });
                  }
                }, [patientName, password]);
                function checkLogin( data, enteredName, enteredPassword) {
                  // Your logic to check if the entered email and password match the data from the API
                  // Example: (Replace with your actual logic)
                  return data.some(
                    (user) => user.patientName === enteredName && user.password === enteredPassword
                  );
                }
      
        function Submit(){
      
              const name = document.getElementById("inputpatientName").value;
              const password = document.getElementById("inputpassword").value;
              
              if(name==='' && password===''){
                  alert("please enter patient name and password ");
              }
              else if(name===''){
                  alert("patientname is a Required Field");
              }
              else if(password===''){
                  alert("Password is a Required Field")
              }
             
              setPatientName(name);
              setPassword(password);
                    
      }
      
      
      
          return (
              <>
           
           <LandNav/>
                  <div className="container-fluid " style={{backgroundImage:`url(https://cdn.pixabay.com/photo/2021/02/19/04/00/doctor-6029164_960_720.png)`}}>
                      <h1 style={{textAlign:'center',paddingTop:'50px'}}> Patient Login</h1>
                          <div className="row">
                           
                              <div className="col-12">
                                  <form className="p-5">
                              
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="patientName" className="form-label text-primary fw-bold">Patient Name :</label>
                                          <input type="text" className="form-control" id="inputpatientName"    required/>
                                      </div>
                                      
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="password" className="form-label text-primary fw-bold">Password :</label>
                                          <input type="password" className="form-control" id="inputpassword" required />
                                      </div>
                        
                                      <div className="p-4 text-center">
                                          <p>Dont have an Account? <Link to='/register'>Register here</Link></p>
                                      </div>
                                      <div className="p-3 text-center">
                                          <p>forgot password? <Link to='/sendotp'>click here</Link></p>
                                      </div>
                                      <div className="text-center">
                                      <button type="button" className="btn btn-primary" onClick={Submit}>Submit</button>
                                      </div>
                                </form>
                              </div>
                          </div>
                      </div>
         <FooterPage/>   
     
    </>
    )
}

export default Login;