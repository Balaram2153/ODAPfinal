import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FooterPage from "../Landpage/FooterPage";
import LandNav from "../Landpage/LandNav";
import Techniciannavbar from "../Landpage/Techniciannavbar";



export default function Technicianafterlogin() {

    const [data, setData] = useState({});


    // useEffect(() => {
    //     if (Techniciandetails) {
    //       fetch(`http://localhost:9900/Registration/Tdata/${Techniciandetails.patientId}`)
    //         .then((response) => response.json())
    //         .then((profileData) => {
    //           setData(profileData);
    //           console.log(profileData);
    //         }) 
    //         .catch((error) => {
    //           console.error("Error fetching profile data:", error);
    //         });
    //     }
    //   }, []);

    return (
        <>
        <LandNav></LandNav>
        <Techniciannavbar></Techniciannavbar>
            <div>
                <div>
                    <div className='profileimage' style={{ backgroundImage: `url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`, height: '1000px' }}>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='text-center fw-bold fs-2'>Personal Information </p>
                                    {Object.keys(data).length > 0 && (
                                        <div className='profile' >

                                            <p><span className='fw-bold'>Patient ID:</span> {data.technicianId}</p>
                                            <p><span className='fw-bold'>Patient Name:</span> {data.technicianname}</p>
                                            <p><span className='fw-bold'>Patient Name:</span> {data.diagnosticname}</p>
                                            <p><span className='fw-bold'>Patient Name:</span> {data.mobilenumber}</p>
                                            <p><span className='fw-bold'>Patient Name:</span> {data.email}</p>



                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>                
                    </div>
            </div>
            
            <FooterPage></FooterPage>
        </>
    );
}