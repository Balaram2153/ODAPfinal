
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FooterPage from '../Landpage/FooterPage';
import { Link } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import jsPDF from 'jspdf';
import files  from "../img/Prescriptions.jpg";
import logo from "../img/logosymbol.jpg";
import autoTable from 'jspdf-autotable';

const Treat = () => {


  var [date,setDate] = useState(new Date());


  
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }  
  });
  
   
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};


  
  var doctors = localStorage.getItem('loggedIn');

// Convert the string back to an object
var stored = JSON.parse(doctors);

// Access the particular item within the response object
var dname = stored.doctorName;



const getAllData = async () => {
    try {
      const response = await fetch(`http://localhost:9081/api/v1/get/${dname}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const [formData,setFormData]=useState(
    {
      medicines:[],
    }
  )
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);


      const [file, setFile] = useState(null);
      const [doctorName,setDoctorName]=useState(dname);
      const [prognosis,setPrognosis]=useState('');
      const [temperature,setTemperature]=useState('');
      const [bp,setBP]=useState('');
      const [treatment,setTreatment]=useState('');
      const [spO2,setSPO2]=useState('');
      const [followupDate,setFollowUpDate]=useState('');
      const [recommendedTest,setRecommendedTest]=useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [bookingDate,setBookingDate]=useState('');

  const handleFileChange = (e) => {
             setFile(e.target.files[0]);
       };
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllData();
        setData(allData);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);






  useEffect(() => {
    if (selectedId && data.length > 0) {
      const selected = data.find(item => item.appointmentId === selectedId);
      setSelectedData(selected);
    }
  }, [selectedId, data]);

  const handleSelectId = (appointmentId) => {
    setSelectedId(appointmentId);
  };

  const handleSymptomsChange = (e) => {
    setPrognosis(e.target.value);
};

const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
};

const handleTreatmentChange = (e) => {
  setTreatment(e.target.value);
};

const handlespo2Change = (e) => {
  setSPO2(e.target.value);
};

const handleBPChange = (e) => {
    setBP(e.target.value);
};

const handleRecommendedTestChange = (e) => {
    setRecommendedTest(e.target.value);
};

const handleFollowUpDateChange = (e) => {
    setFollowUpDate(e.target.value);
};

const handleAddMedicine = () => {
  setFormData(prevData => ({
    ...prevData,
    medicines: [...prevData.medicines, { medicinename: '', medicineType: '',  form: '',  quantity: '', dosageTiming: '' }]
  }));
};

const handleMedicineChange = (index, field, value) => {
  setFormData(prevData => ({
    ...prevData,
    medicines: prevData.medicines.map((medicine, i) => i === index ? { ...medicine, [field]: value } : medicine)
  }));
};

  const handleSubmit = async (e) => {
            e.preventDefault();
    
            const formData = new FormData();
        formData.append('patientName', selectedData.patientName);       
        formData.append('bookingDate',selectedData.bookingDate);
        formData.append('patientEmail',selectedData. patientEmail);
        formData.append('doctorName',doctorName);
        formData.append('prognosis',prognosis);
        formData.append('treatment',treatment);
        formData.append('spO2',spO2);
        formData.append('followupDate',followupDate);
        formData.append('temperature',temperature);
        formData.append('bp',bp);
        formData.append('recommendedTest',recommendedTest);
        formData.append('file', file);
            
    
        try {
                    await axios.post('http://localhost:8092/sentemail', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    alert("pdf sent successfully");
                    console.log('Prescription sent to email successfully');
                } catch (error) {
                    console.error('Error sending PDF email:', error);
                }


            try {
    
             const response=await axios.post('http://localhost:8092/upload', formData);
console.log(response);
                alert('treatement made successful');
                console.log('File uploaded successfully!');
            } catch (error) {
                console.error('Failed to upload file.', error);
            }
        };

        
        const handleReceipt = () => {
          const pdf = new jsPDF();


     
           
          const headers = [['Index','Name', 'Medicine Type', 'Measure', 'Form', 'Nos.', 'Dosage Timing']];
          // const data = medicines.map((medicine, index) => [
          //   index, // Add the index as the key
          //   medicine.name,
          //   medicine.medicineType,
          //   medicine.measure,
          //   medicine.form,
          //   medicine.nos,
          //   medicine.dosageTiming
          // ]);
          const data = formData.medicines.map((medicine, index) => [
            index + 1,
            medicine.name,
            medicine.type,
            medicine.measure,
            medicine.form,
            medicine.quantity, // Assuming quantity is the same as Nos.
            medicine.dosageTiming
          ]);



          pdf.setFontSize(12); // Adjust the font size as needed
          pdf.setFont('helvetica'); 

          const currentDate = new Date().toLocaleDateString();
          const currentTime = new Date().toLocaleTimeString();


          pdf.addImage(files, 'JPG', 0, 0, 800,1600);
          pdf.addImage(logo, 'JPG',20,20,40,40);
      pdf.text('Treatment Prescription', 80, 80);
      pdf.text(`Name of Doctor: Dr.${selectedData.doctorName}`,20,90);
      pdf.text(`Specialization :${selectedData.speciality}`,20,100);
      pdf.text(` Date: ${currentDate}`, 140, 90);
      pdf.text(` Time: ${currentTime}`, 140, 100);
       pdf.text('Patient Info: ',80,110);
      pdf.text(`Appointment Id: ${selectedData.appointmentId}`,20,120);
      pdf.text(`Patient Name: ${selectedData.patientName}`,20,130);
      pdf.text(`Chronic Diseases: ${selectedData.chronicDisease}`,20,140);
      pdf.text(`BookingDate : ${selectedData.bookingDate}`,20,150);
      pdf.text(`Prognosis : ${prognosis}`,20,160);
      pdf.text(`Temperature : ${temperature}`,134,150);
      pdf.text(`B.P :${bp}`,150,160);
      pdf.text(`spO2:${spO2}`,150,170);
      pdf.text(`Treatment: ${treatment} `,20,180);
      pdf.text("℞",20,190);
      pdf.autoTable({
        startY: 200, // Adjust startY as needed to position the table below previous content
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 10
        },
        columnStyles: {
          0: { fontStyle: 'bold' }
        }
      });
      pdf.text(`Follow up Date: ${followupDate}`,20,270);
      pdf.text(`Recommended Test:${recommendedTest}`,20,260);
      pdf.save('Prescription.pdf');
      
      
      alert("PDF generated successful!");
        }

  return (
    <>
 <DoctorDashboard/>     
     

        <div class="container-fluid display-table">
        <div class="row display-table-row">
        <div class="col-md-1 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                        <img src="https://tse4.mm.bing.net/th?id=OIP.XsFTO6Tr5I4mfdTm3qsmBQAAAA&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'180px',width:'300px',borderRadius:'50%'}} />
                </div>
                <div class="navi">
                <ul>
                <li><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        <li class="active"><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li>
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li ><Link to='/pdf'><i class="bi bi-person-lines-fill"></i>Patient Reports</Link></li>
                        <li ><Link to='/manage'><i class="bi bi-person-lines-fill"></i>Appointment and Management</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align">
                <div class="row">
                    <header>
                        <div class="col-md-12">     

    <div>
      <h1>Patient Names</h1>
      
      <ul style={{backgroundColor:'lightblue'}}>
        {data.map(item => (
          <ol key={item.appointmentId} onClick={() => handleSelectId(item.appointmentId)}>
            {item.appointmentId}  {item.patientName}
          </ol>
        ))}
      </ul>

      

      {selectedData && (
        <div>
        
          

          <div className="container-fluid bg-body-tertiary p-3" style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/99-998859_background-image-for-hospital.jpg)`}}>
       <h2 style={{textAlign:'center'}}>Treatment </h2>
        <div className="row">
        <div className="col-12">
           <div className="container pt-4" style={{width:'800px'}}>
         
             <form className="row g-3">   
          <p>Doctor Info:</p>
          <div className='col-md-6'>
             <label for='doctorName'  text-primary fw-bold>Doctor Name :</label> 
            <input type='text' className="form-control" id='inputdoctorName' value={dname} onChange={(e)=>setDoctorName(e.target.value)} placeholder="enter doctor name"  required/>
           </div>
           <div className='col-md-6'>
             <label for='doctorName'  text-primary fw-bold>Doctor Specialization :</label> 
            <input type='text' className="form-control" id='inputdoctorName' value={selectedData.speciality} required/>
           </div>
          <p>Patient Info:</p>
           <div className='col-md-6'>
             <label for='doctorName'  text-primary fw-bold>Appointment ID :</label> 
            <input type='text' className="form-control" id='inputdoctorName' value={selectedData.appointmentId} required/>
           </div>
          <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Patient Name :</label> 
            <input type='text' className="form-control" id='inputPatientName' value={selectedData.patientName}  placeholder="enter patient name"  required/>
          </div>
          <div className='col-md-6'>
             <label for='doctorName'  text-primary fw-bold>Patient ID :</label> 
            <input type='text' className="form-control" id='inputdoctorName' value={selectedData.patientId} required/>
           </div>
           
          <div className='col-md-6'>
            <label for='email' >Email :</label>
            <input type='email' className="form-control" id='inputemail'value={selectedData.patientEmail} required/>
          </div>

          <div className='col-md-6'>
            <label for='symptoms' >Prognosis :</label>
            <input type='text' className="form-control" id='symptoms'value={prognosis} onChange={handleSymptomsChange} required/>
          </div>

          <div className='col-md-6'>
            <label for='temp' >Temperature :</label>                                                                       
            <input type='text' className="form-control" id='temp'value={temperature} onChange={handleTemperatureChange}  required/>
          </div>
          
          <div className='col-md-6'>
            <label for='bp' >B.P :</label>
            <input type='text' className="form-control" id='bp'value={bp} onChange={handleBPChange} required/>
          </div>
          <div className='col-md-6'>
            <label for='spo2' >SpO2:</label>
            <input type='text' className="form-control" id='spo2'value={spO2} onChange={handlespo2Change} required/>
          </div>
          <div>
          <div className='col-md-6'>
            <label for='treatment' >Treatment :</label>
            <textarea type='text' className="form-control" rows={5} cols={5} id='treatment'value={treatment} onChange={handleTreatmentChange} required/>
          </div>
          Rx
          <fieldset>
        {formData.medicines.map((medicine, index) => (
          <div key={index}>
            <input type="text" placeholder="Enter Medicine Name" value={medicine.name} onChange={e => handleMedicineChange(index, 'name', e.target.value)} />
            <label>
                Medicine Type:
                <select name="medicineType" value={medicine.type} onChange={e => handleMedicineChange(index, 'type', e.target.value)}>
                  <option value="">select type</option>
                  <option value="tablet">Tablet</option>
                  <option value="syp">Syrup</option>
                  <option value="inhaler">Inhaler / Respules</option>
                  <option value="ointment">Ointment</option>
                  <option value="injection">Injection</option>
                </select>
              </label>
              <label>
                Measure:
                <select name="measure" value={medicine.measure} onChange={e => handleMedicineChange(index, 'measure', e.target.value)}>
                  <option value="">select type</option>
                  <option value="mg">mg</option>
                  <option value="units">units</option>
                  <option value="%">%</option>                  
                </select>
              </label>
            

            <label>
                Medicine Form:
                <select name="form" value={medicine.form} onChange={e => handleMedicineChange(index, 'form', e.target.value)} >
                <option value="">select form</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Dispersion">Dispersion</option>
                 
                </select>
              </label>
            <input type="text" placeholder="Quantity" value={medicine.quantity} onChange={e => handleMedicineChange(index, 'quantity', e.target.value)} />
            <label>
                Dosage Timing:
                <select name="dosageTiming" value={medicine.dosageTiming} onChange={e => handleMedicineChange(index, 'dosageTiming', e.target.value)} >
                  <option value="once">Once</option>
                  <option value="twice">Twice</option>
                  <option value="thrice">Thrice</option>
                  <option value="week">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="sos">SOS (As Needed)</option>
                  <option value="other">Other</option>
                </select>
              </label>
          </div>
        ))}
        <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
      </fieldset>
          </div>
          <div className='col-md-6'>
  <label htmlFor='recommendedTest'>Recommended Tests:</label>
  <br/>
  <input type='checkbox' id='test1' name='test1' value='Blood' onChange={handleRecommendedTestChange} />
  <label htmlFor='test1'>Blood </label>
  <input type="text" placeholder="Details for Blood Test" onChange={handleRecommendedTestChange} />
  <br/>
  <input type='checkbox' id='test2' name='test2' value='Urine' onChange={handleRecommendedTestChange} />
  <label htmlFor='test2'>Urine </label>
  <input type="text" placeholder="Details for Urine Test" onChange={handleRecommendedTestChange} />
  <br/>
  <input type='checkbox' id='test3' name='test3' value='Scan' onChange={handleRecommendedTestChange} />
  <label htmlFor='test3'> Scan  </label>
  <input type="text" placeholder="Details for Scan Test" onChange={handleRecommendedTestChange} />
  <br/>
  <input type='checkbox' id='test4' name='test4' value='Sputum' onChange={handleRecommendedTestChange} />
  <label htmlFor='test4'>Sputum</label>
  <input type="text" placeholder="Details for Sputum Test" onChange={handleRecommendedTestChange} />
  <br/>
  <input type='checkbox' id='test5' name='test5' value='Radiology' onChange={handleRecommendedTestChange} />
  <label htmlFor='test5'> Radiology</label>
  <input type="text" placeholder="Details for Radiology Test" onChange={handleRecommendedTestChange} />
  <br/>
  <input type="text" placeholder="Other Test" value={recommendedTest} onChange={handleRecommendedTestChange} />
</div>


      
          <div className='col-md-6'>
            <label for='followupdate' >Follow up Date :</label>
            <input type='date' className="form-control" id='followupdate'value={followupDate} onChange={handleFollowUpDateChange} required/>
          </div>
         
         
     
           <div className='col-md-6'>           
             <label for='file' >Prescription :</label>
             <input type='file' accept=".pdf" name='file'  onChange={handleFileChange}/>
          </div>
          <div className='text-center'>
              <button type='button' className="btn btn-primary" onClick={handleReceipt}>Generate Pdf</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} >Send</button>
          </div> 
           </form>
        </div>
        </div>
        </div>
        </div>
        </div>
       
      )}
    </div>

    </div>
                    </header>
                </div>
                
            </div>
      
</div>
</div>





    <FooterPage/>
    </>
  );
};

export default Treat;















