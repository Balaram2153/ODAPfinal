import FooterPage from "../Landpage/FooterPage";
import { getTechnicianDetails } from "../Patient/Authstate";
import { useEffect,useState } from "react";
import LandNav from "../Landpage/LandNav";
import Techniciannavbar from "../Landpage/Techniciannavbar";
import { Link } from "react-router-dom";

function TechnicianProfile()
{

    const [technician, setTechnician] = useState([]);

  useEffect(() => {

    const techniciandetail = getTechnicianDetails();
    if (techniciandetail) {
      fetch(`http://localhost:9902/Registration/Tdata/${techniciandetail.technicianId}`)
        .then((response) => response.json())
        .then((profileData) => {
          setTechnician(profileData);
          console.log(profileData);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []); 

    return (
        <>
        
       
        <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12'>
               <p className='text-center fw-bold fs-2'>Personal Information </p>
               {Object.keys(technician).length > 0 && (
                  <div className='profile' >
    
                <p><span className='fw-bold'>Technician ID:</span> {technician.technicianId}</p>
                <p><span className='fw-bold'>Technician Name:</span> {technician.technicianname}</p>
                <p><span className='fw-bold'>Mobile No:</span> {technician.mobilenumber}</p>
                <p><span className='fw-bold'>Email:</span> {technician.email}</p>                
                <p><span className='fw-bold'>Technician Study:</span> {technician.technicianstudy}</p>               
                <p><span className='fw-bold'>Technician Experience:</span> {technician.technicianexperiences}</p>
                <p><span className='fw-bold'>Diagnostic Name:</span> {technician.diagnosticCenter}</p>
                <p><span className='fw-bold'>Type of Service:</span> {technician.typeofservices}</p>

               
            </div>
          )}

        </div>
      </div>
    </div>
  </div>

        
        
        </>
    )
}


export default TechnicianProfile;