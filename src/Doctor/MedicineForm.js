import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
// import MedicinesList from './MedicinesList';
import axios from 'axios';

const MedicineForm = () => {
  
  const [name,setName]=useState('');
  const [medicineType,setMedicineType]=useState('');
  const [measure,setMeasure]=useState('');
  const [form,setForm]=useState('');
  const [nos,setNos]=useState('');
  const [dosageTiming,setDosageTiming]=useState('');

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    // Simulate fetching data from a backend API
    try {

        const data=
    {
        name,
        medicineType,
        measure,
        form,
        nos,
        dosageTiming,

    }
       
      const response = await axios.post('http://localhost:8092/medicine-form/submit',data);
    //    setDosageTiming('');
    //    setNos('');
    //    setForm('');
    //    setMedicineType('');
    //    setName('');
    //    setMeasure('');
    console.log(response);
      
      if (response.status===200) {
        console.log('Form submitted successfully!');
        // Fetch medicines again after form submission to update the list
        console.log(response);
      } else {
        console.error('Form submission failed!');
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
    } 
  };

 

  return (
    <div className="form-container">
     
       
          <div>
            <h2>Medicine Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
              </label>
              <br />
              <label>
                Medicine Type:
                <select name="medicineType" value={medicineType} onChange={(e)=>setMedicineType(e.target.value)}>
                  <option value="tablet">Tablet</option>
                  <option value="syp">Syrup</option>
                  <option value="inhaler">Inhaler / Respules</option>
                  <option value="ointment">Ointment</option>
                  <option value="injection">Injection</option>
                </select>
              </label>
              <br />
            
              <br />
              <label>
                Measure:
                <input type="text" name="measure" value={measure} onChange={(e)=>setMeasure(e.target.value)} />
              </label>
              <br />
              <label>
                Form:
                <input type="text" name="form" value={form} onChange={(e)=>setForm(e.target.value)} />
              </label>
              <br />
              <label>
                Nos.:
                <input type="text" name="nos" value={nos} onChange={(e)=>setNos(e.target.value)} />
              </label>
              <br />
              <label>
                Dosage Timing:
                <select name="dosageTiming" value={dosageTiming} onChange={(e)=>setDosageTiming(e.target.value)}>
                  <option value="once">Once</option>
                  <option value="twice">Twice</option>
                  <option value="thrice">Thrice</option>
                  <option value="week">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="sos">SOS (As Needed)</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
            <div>
             
            </div>
          </div>
      
        
    </div>
  );
};

export default MedicineForm;


