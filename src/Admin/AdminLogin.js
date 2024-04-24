
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { setDoctorDetails } from "../Patient/Authstate"
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";


const AdminLogin=()=>
{

    const navigate = useNavigate();
    const [adminEmail,setAdminEmail]=useState("");
    const [password,setPassword]=useState("");


    useEffect(()=>
    {
        if(adminEmail!== "" && password!== "")
        {
            fetch('http://localhost:8099/getadmins')
            .then((response)=>response.json())
            .then((pdata)=>
            {
                const isLoginSuccess=checkLogin(pdata,adminEmail,password);
             
                        if (isLoginSuccess) {
                          alert("Loggedin Successfully");
                          navigate("/admindoctor");
                        
                          const loggedIn = pdata.find(
                            (user) =>
                              user.adminEmail === adminEmail && user.password === password
                          );
                          console.log(loggedIn);
                          setDoctorDetails(loggedIn);
                          
                        } else {
                          // Handle unsuccessful login
                          alert("Invalid email or password");
                          
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching data:", error);
                        // Handle error fetching data
                      });
                  }
                }, [adminEmail, password]);
                function checkLogin( data, enteredid, enteredPassword) {
                  // Your logic to check if the entered email and password match the data from the API
                  // Example: (Replace with your actual logic)
                  return data.some(
                    (user) => user.adminEmail === enteredid && user.password === enteredPassword
                  );
                }
      
        function Submit(){
      
              const email = document.getElementById("inputpatientName").value;
              const password = document.getElementById("inputpassword").value;
              
              if(email==='' && password===''){
                  alert("enter email and password");
              }
              else if(email===''){
                  alert("mail is a Required Field");
              }
              else if(password===''){
                  alert("Password is a Required Field")
              }
             
              setAdminEmail(email);
              setPassword(password);
                    
      }
      
      
      
          return (
              <>
           
         <LandNav/>
                      <div className="container-fluid " style={{backgroundImage:`url(https://static.vecteezy.com/system/resources/previews/000/219/529/original/medical-background-vector.jpg)`,height:'600px'}}>
                      <h2 style={{textAlign:'center',paddingTop:'50px',color:'green'}}>Admin Login</h2>
                          <div className="row">
                              <div className="col-12">
                                  <form className="p-5">
                              
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="mail" className="form-label text-primary fw-bold">Admin Email:</label>
                                          <input type="email" className="form-control" id="inputpatientName"    required/>
                                      </div>
                                      
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="password" className="form-label text-primary fw-bold">Password :</label>
                                          <input type="password" className="form-control" id="inputpassword" required />
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


export default AdminLogin;