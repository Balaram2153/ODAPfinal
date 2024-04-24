import React, { useState, useEffect } from "react";
import './Technicianlogin.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FooterPage from "../Landpage/FooterPage";
import LandNav from "../Landpage/LandNav";
import { setTechnicianDetails } from "../Patient/Authstate";

const Technicianlogin = () => {


    const navigate = useNavigate();
    const [technicianId, setTechnicianId] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if (technicianId !== "" && password !== "") {
            fetch('http://localhost:9902/Registration/Tdata')
                .then((response) => response.json())
                .then((tdata) => {
                    const isLoginSuccess = checkLogin(tdata, technicianId, password);

                    if (isLoginSuccess) {
                        alert("Loggedin Successfully");
                        navigate("/technicianDashboard");

                        const loggedIn = tdata.find(
                            (user) =>
                                user.technicianId === technicianId && user.password === password
                        );
                        console.log(loggedIn);
                        setTechnicianDetails(loggedIn);

                    } else {
                        alert("Invalid TechnicianId or password");

                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [technicianId, password]);
    function checkLogin(data, enteredName, enteredPassword) {
        // Your logic to check if the entered email and password match the data from the API
        // Example: (Replace with your actual logic)
        return data.some(
            (user) => user.technicianId === enteredName && user.password === enteredPassword
        );
    }

    function Submit() {

        const name = document.getElementById("inputpatientName").value;
        const password = document.getElementById("inputpassword").value;

        if (name === '' && password === '') {
            alert("please enter technician Id and password");
        }
        else if (name === '') {
            alert("technician id  is a Required Field");
        }
        else if (password === '') {
            alert("Password is a Required Field")
        }

        setTechnicianId(name);
        setPassword(password);

    }



    return (
        <>
        <LandNav></LandNav>

            <div className="container-fluid " style={{ backgroundImage: `url(https://www.litmus-solutions.com/wp-content/uploads/2018/12/GettyImages-927897070.jpg)`, height: '600px' }}>
                <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>Login</h1>
                <div className="row">

                    <div className="col-12">
                        <form className="p-5">

                            <div className="p-3" style={{ margin: 'auto', display: 'block', width: '300px' }}>
                                <label for="technicianId" className="form-label text-primary fw-bold">Technician Id :</label>
                                <input type="text" className="form-control" id="inputpatientName" required />
                            </div>

                            <div className="p-3" style={{ margin: 'auto', display: 'block', width: '300px' }}>
                                <label for="password" className="form-label text-primary fw-bold">Password :</label>
                                <input type="password" className="form-control" id="inputpassword" required />
                            </div>

                            <div className="p-4 text-center">
                                <p>Dont have an Account? <Link to='/Technicianregistration'>Register here</Link></p>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={Submit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterPage></FooterPage>
        </>
    )
}
export default Technicianlogin;
