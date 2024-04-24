import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Technicianregistration.css'
import axios from "axios";
import FooterPage from "../Landpage/FooterPage";
import LandNav from "../Landpage/LandNav";


export default function Technicianregistration() {

    const [technicianname, setTechnicianname] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [technicianstudy, setTechnicianstudy] = useState('');
    const [technicianexperiences, setTechnicianexperiences] = useState('');
    const [typeofservices,setTypeofservices]=useState('');
    const [diagnosticCenter, setDiagnosticCenter] = useState('');
    const [diagnosticaddress, setDiagnosticaddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate('');

    const submit = async () => {
        const data = {
            technicianname,
            email,
            mobilenumber,
            typeofservices,
            technicianstudy,
            technicianexperiences,
            diagnosticCenter,
            diagnosticaddress,
            password,
            confirmpassword,
        };
        try {
            
            setError(false);            
            const digits = /[0-9]/;
            const emaildigit = /^[0-9]/;
            const mobilestart = /^[6789]/;
            const alphabets = /[a-z]/;
            const passwordtest = /[0123456789@#qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFAZXCVBNM]/;
            const specialchars = /[!@#$%^&*()_+|}{:"?><}]/;
            const emailspecialchars = /[!#$%^&*()_+|}{":?><}]/;
            const emailend = /[@gamil.com | @Yahoo.com]/;

            if (digits.test(technicianname) || specialchars.test(technicianname))
                throw new Error("Enter valid name.");
            if (emaildigit.test(email) || emailspecialchars.test(email) || !email.endsWith("gmail.com"))
                throw new Error("Enter valid email address.");
            if (alphabets.test(mobilenumber) || specialchars.test(mobilenumber) || mobilenumber.length !== 10 || !mobilestart.test(mobilenumber))
                throw new Error("Enter valid mobile number.");
            if (digits.test(technicianstudy) || specialchars.test(technicianstudy))
                throw new Error("Enter the proper qualification details.");
            if (specialchars.test(technicianexperiences) || alphabets.test(technicianexperiences) || technicianexperiences.length > 2 || technicianexperiences < 0)
                throw new Error("Enter valid experience details.");
            if (digits.test(diagnosticCenter) || specialchars.test(diagnosticCenter))
                throw new Error("Enter valid diagnostic name.");
            if (digits.test(diagnosticaddress))
                throw new Error("Enter valid address")
            if(technicianexperiences==='')
                throw new Error("enter experience")
            if(technicianname==='')
               throw new Error("enter technician name")
            if(technicianstudy==='')
               throw new Error("enter technician study")
            if (diagnosticaddress.length === 0)
                throw new Error("Please enter the diagnostic address")
            if (password.length < 8)
                throw new Error("password must contain at least 8 characters.")
            if (password !== confirmpassword)
                throw new Error("password and confirm password must match.")
            if (technicianname.length == 0 || email.length == 0 || mobilenumber.length == 0 || technicianstudy.length == 0 ||
                technicianexperiences.length == 0 || diagnosticCenter.length == 0 || diagnosticaddress.length == 0 ||
                password.length == 0 || confirmpassword.length == 0)
                throw new Error("please fill in all the details")
                

                // const emailExistsResponse = await axios.get(`http://localhost:9902/Registration/getemail/${email}`);
        
                // console.log("Email exists response status code:", emailExistsResponse.status);
        
                // if (emailExistsResponse.status === 404) {
                //     // Email does not exist, registration can proceed
                           
                // Make the request to check if the email exists
                
                // const emailExistsResponse = await axios.get(`http://localhost:9902/Registration/getemail/${email}`);
                
                // if (emailExistsResponse.data === "Duplicate Email") {
                //     // Email already exists, show alert
                //     alert("Email already exists");
               
                    // Email does not exist, proceed with registration
                    const response = await axios.post('http://localhost:9902/Registration/saveT', data);
            
                    // Clear form fields
                    setTechnicianname('');
                    setEmail('');
                    setMobilenumber('');
                    setTypeofservices('');
                    setTechnicianstudy('');
                    setTechnicianexperiences('');
                    setDiagnosticCenter('');
                    setDiagnosticaddress('');
                    setPassword('');
                    setConfirmpassword('');
            
                    
                    console.log(response);
                    if(response.data==="Duplicate Email"){
                        alert("Email already exists");
                    }
                    else{
                        alert("Technician registration successful");
                        navigate('/Technicianlogin');
                    }
                    
                    
                
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
                console.error("Error occurred: ", error);
            }
        };

    return (
        <>
            <LandNav></LandNav>


            
            {/* <div className="TRbody">
                <h1>Technician Registration</h1>
                <div className="trcontainer">
                    {/* <div className="col-xl-6 col-md-6 col-sm-12 trimage1">
                    <img src="https://source.unsplash.com/1600x1000/?diagnostic"></img>
                </div> */}
                    {/* <div className=" trtablecontainer">
                        <table>
                            <tr>
                                <td>Technician Name :</td>
                                <td><input type="text" value={technicianname} onChange={(e) => setTechnicianname(e.target.value)} placeholder="technician full name" required></input></td>
                            </tr>
                            <tr>
                                <td>Email :</td>
                                <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required></input></td>
                            </tr>
                            <tr>
                                <td>Mobile number :</td>
                                <td><input type="number" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)} placeholder="ph number" required></input></td>
                            </tr>
                            <tr>
                                <td>Qualification :</td>
                                <td><input type="text" value={technicianstudy} onChange={(e) => setTechnicianstudy(e.target.value)} placeholder="qualification" required></input></td>
                            </tr>
                            <tr>
                                <td>Type of Services :</td>
                                <td><input type="text" value={typeofservices} onChange={(e) => setTypeofservices(e.target.value)} placeholder="typeofservices" required></input></td>
                            </tr>
                            <tr>
                                <td>Experience :</td>
                                <td><input type="number" value={technicianexperiences} onChange={(e) => setTechnicianexperiences(e.target.value)} placeholder="years of experience as technician" required></input></td>
                            </tr>
                            <tr>
                                <td>Diagnostic Name</td>
                                <td><input type="text" value={diagnosticCenter} onChange={(e) => setDiagnosticCenter(e.target.value)} placeholder="diagnostic name" required></input></td>
                            </tr>
                            <tr>
                                <td>Diagnostic Address</td>
                                <td><input type="text" value={diagnosticaddress} onChange={(e) => setDiagnosticaddress(e.target.value)} placeholder="diagnostic address" required></input></td>
                            </tr>
                            <tr>
                                <td>Password :</td>
                                <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="create a password"></input></td>
                            </tr>
                            <tr>
                                <td>Confirm Password :</td>
                                <td><input type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder="should match the above password" required></input></td>
                            </tr>
                        </table>

                        <button type='button' className="trbtn" onClick={submit}>submit</button>
                        {error && <p style={{ color: "royalblue", textAlign: "center" }}>{errorMessage}</p>}
                    </div>
                </div> */}
            


            <div className="container trtablecontainer" style={{backgroundColor:'white'}}>
                <div className="row">
                <div className="d-flex col-md-12 col-sm-12 techheadcontainer" style={{ padding: "20px", alignItems: "center" }}>
                    <img src="technician123.jpg" style={{ height: "150px", width: "200px", borderRadius: "8px" }} />
                    <div className="techregisterheading">
                        <h2>Technician Registration</h2>
                        <p>Please register by filling your details</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between techformcontainer">
                    <div className="col-lg-5 col-md-5 col-sm-12">
                        <p>TechnicianType :</p>
                        <select type="text" value={typeofservices} style={{marginTop:"9px",backgroundColor:"orange"}} onChange={(e) => setTypeofservices(e.target.value)}>
                            <option>Therapy</option>
                            <option>Audiology</option>
                            <option>Dialysis</option>
                            <option>Radiology</option>
                            <option>Pathology</option>
                        </select>
                        <p>TechnicianName :</p>
                        <input type="text" value={technicianname} onChange={(e) => setTechnicianname(e.target.value)}></input>
                        <p>Email :</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <p>Mobilenumber :</p>
                        <input type="number" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)}></input>
                        <p>TechnicianStudy :</p>
                        <input type="text" value={technicianstudy} onChange={(e) => setTechnicianstudy(e.target.value)}></input>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12">
                        <p>Experience :</p>
                        <input type="number" value={technicianexperiences} onChange={(e) => setTechnicianexperiences(e.target.value)}></input>
                        <p>Diagnostic Name :</p>
                        <input type="text" value={diagnosticCenter} onChange={(e) => setDiagnosticCenter(e.target.value)}></input>
                        <p>Diagnostic Address :</p>
                        <input type="text" value={diagnosticaddress} onChange={(e) => setDiagnosticaddress(e.target.value)}></input>
                        <p>password :</p>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <p>Confirm Password :</p>
                        <input type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}></input>
                    </div>
                </div>
                </div>

                <button type='button' className="trbtn" onClick={submit}>submit</button>
                {error && <p style={{ color: "royalblue", textAlign: "center" }}>{errorMessage}</p>}
            </div>

            <FooterPage></FooterPage>
        </>
    );
}