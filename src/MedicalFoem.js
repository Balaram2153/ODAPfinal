import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
function MedicinesForm() {
  const [formData, setFormData] = useState({
    doctorInfo: '',
    date: '',
    time: '',
    patientName: '',
    temperature: '',
    bloodPressure: '',
    symptoms: '',
    treatment: '',
    medicines: [],
    recommendedTests: [],
    followUpDate: ''
  });

  useEffect(() => {
    // Fetch all medicines when the component mounts
    fetchMedicines();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://localhost:8084/medicine-form/all');
      if (response.ok) {
        // const data = await response.json();
        // You can use 'data' here if needed
      } else {
        console.error('Failed to fetch medicines');
      }
    } catch (error) {
      console.error('Error occurred while fetching medicines:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    
    // Simulate fetching data from a backend API
    try {
      const response = await fetch('http://localhost:8089/medicine-form/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('Form submitted successfully!');
        // Fetch medicines again after form submission to update the list
        fetchMedicines();
      } else {
        console.error('Form submission failed!');
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
    }
  };


  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddMedicine = () => {
    setFormData(prevData => ({
      ...prevData,
      medicines: [...prevData.medicines, { name: '', type: '', measure: [], form: '', suspension: '', dispensable: '', quantity: '', dosageTiming: '' }]
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      medicines: prevData.medicines.map((medicine, i) => i === index ? { ...medicine, [field]: value } : medicine)
    }));
  };

  const handleMeasureCheckboxChange = (index, measure, checked) => {
    setFormData(prevData => ({
      ...prevData,
      medicines: prevData.medicines.map((medicine, i) => i === index ? { ...medicine, measure: checked ? [...medicine.measure, measure] : medicine.measure.filter(m => m !== measure) } : medicine)
    }));
  };

  const handleRecommendedTestChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        recommendedTests: [...prevData.recommendedTests, name]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        recommendedTests: prevData.recommendedTests.filter(test => test !== name)
      }));
    }
  };
  const handleReceipt = () => {
    const pdf = new jsPDF();



     
    const headers = [['Index','Name', 'Medicine Type', 'Measure', 'Form', 'Nos.', 'Dosage Timing']];
    const medicineData = formData.medicines.map((medicine, index) => [
        index + 1,
        medicine.name,
        medicine.type,
        medicine.measure.join(', '), // Convert measure array to comma-separated string
        medicine.form,
        medicine.quantity, // Assuming quantity is the same as Nos.
        medicine.dosageTiming
      ]);


    pdf.setFontSize(16); // Adjust the font size as needed
    pdf.setFont('helvetica'); 

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();


 
pdf.text('Treatment Prescription', 80, 80);
pdf.text(`Name of Doctor: Dr.${formData.doctorInfo}`,20,90);
pdf.text(` Date: ${currentDate}`, 140, 90);
pdf.text(` Time: ${currentTime}`, 140, 100);
// pdf.text('Appointmet Details: ',80,100);
// pdf.text(`Patient Id: ${formData.patientId}`,20,110);
// pdf.text(`Patient Name: ${formData.patientName}`,20,120);
// pdf.text(`Chronic Diseases: ${formData.chronicDisease}`,20,130);
pdf.text(`BookingDate : ${formData.date}`,20,140);
pdf.text(`Symptoms : ${formData.symptoms}`,20,150);
pdf.text(`Temperature : ${formData.temperature}`,140,160);
pdf.text(`B.P :${formData.bloodPressure}`,150,170);
pdf.autoTable({
  startY: 180, // Adjust startY as needed to position the table below previous content
  head: headers,
  body: medicineData,
  theme: 'grid',
  styles: {
    font: 'helvetica',
    fontSize: 10
  },
  columnStyles: {
    0: { fontStyle: 'bold' }
  }
});
pdf.text(`Follow up Date: ${formData.followUpDate}`,20,270);
pdf.text(`Recommended Test:${formData.recommendedTests}`,20,260);
pdf.save('Prescription.pdf');


alert("Payment successful!");
  }

  return (
    <form onSubmit={handleSubmit} className="medicine-form">
      <fieldset>
        <legend>Doctor Information</legend>
        <input type="text" name="doctorInfo" placeholder="Enter Doctor's Information" value={formData.doctorInfo} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Date & Time</legend>
        <input type="date" name="date" placeholder="Select Date" value={formData.date} onChange={handleChange} />
        <input type="time" name="time" placeholder="Select Time" value={formData.time} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Patient Information</legend>
        <input type="text" name="patientName" placeholder="Enter Patient's Name" value={formData.patientName} onChange={handleChange} />
        <input type="text" name="symptoms" placeholder="Enter Symptoms" value={formData.symptoms} onChange={handleChange} />
        <input type="text" name="temperature" placeholder="Enter Temperature" value={formData.temperature} onChange={handleChange} />
        <input type="text" name="bloodPressure" placeholder="Enter Blood Pressure" value={formData.bloodPressure} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Treatment</legend>
        <input type="text" name="treatment" placeholder="Enter Treatment Details" value={formData.treatment} onChange={handleChange} />
        <input type="text" placeholder="Rx"/> 
      </fieldset>

      <fieldset>
        <legend>Medicines</legend>
        {formData.medicines.map((medicine, index) => (
          <div key={index}>
            <input type="text" placeholder="Enter Medicine Name" value={medicine.name} onChange={e => handleMedicineChange(index, 'name', e.target.value)} />
            <input type="text" placeholder="Medicine Type" value={medicine.type} onChange={e => handleMedicineChange(index, 'type', e.target.value)} />
            <input type="checkbox" name="measure" value="mg" checked={medicine.measure.includes('mg')} onChange={(e) => handleMeasureCheckboxChange(index, 'mg', e.target.checked)} /> mg
            <input type="checkbox" name="measure" value="cal" checked={medicine.measure.includes('cal')} onChange={(e) => handleMeasureCheckboxChange(index, 'cal', e.target.checked)} /> cal
            <input type="checkbox" name="measure" value="units" checked={medicine.measure.includes('units')} onChange={(e) => handleMeasureCheckboxChange(index, 'units', e.target.checked)} /> units
            <input type="checkbox" name="measure" value="%" checked={medicine.measure.includes('%')} onChange={(e) => handleMeasureCheckboxChange(index, '%', e.target.checked)} /> %
            <input type="text" placeholder="Form" value={medicine.form} onChange={e => handleMedicineChange(index, 'form', e.target.value)} />
            <select value={medicine.suspension} onChange={e => handleMedicineChange(index, 'suspension', e.target.value)}>
              <option value="">Select Suspension</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <select value={medicine.dispensable} onChange={e => handleMedicineChange(index, 'dispensable', e.target.value)}>
              <option value="">Select Dispensable</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input type="text" placeholder="Quantity" value={medicine.quantity} onChange={e => handleMedicineChange(index, 'quantity', e.target.value)} />
            <input type="text" placeholder="Dosage Timing" value={medicine.dosageTiming} onChange={e => handleMedicineChange(index, 'dosageTiming', e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
      </fieldset>

      <fieldset>
        <legend>Recommended Tests</legend>
        <label>
          <input type="checkbox" name="Blood" checked={formData.recommendedTests.includes('Blood')} onChange={handleRecommendedTestChange} />
          Blood
        </label>
        <label>
          <input type="checkbox" name="Urine" checked={formData.recommendedTests.includes('Urine')} onChange={handleRecommendedTestChange} />
          Urine
        </label>
        <label>
          <input type="checkbox" name="Stool" checked={formData.recommendedTests.includes('Stool')} onChange={handleRecommendedTestChange} />
          Stool
        </label>
        <label>
          <input type="checkbox" name="Sputum" checked={formData.recommendedTests.includes('Sputum')} onChange={handleRecommendedTestChange} />
          Sputum
        </label>
        <label>
          <input type="checkbox" name="Radiology" checked={formData.recommendedTests.includes('Radiology')} onChange={handleRecommendedTestChange} />
          Radiology
        </label>
        <label>
          <input type="checkbox" name="Scan" checked={formData.recommendedTests.includes('Scan')} onChange={handleRecommendedTestChange} />
          Scan
        </label>
        <input type="text" placeholder="Other Test" value={formData.otherTest} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Follow-up Date</legend>
        <input type="date" name="followUpDate" placeholder="Select Follow-up Date" value={formData.followUpDate} onChange={handleChange} />
      </fieldset>

      <div className="button-group">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <button type="button" onClick={handleReceipt}>Print</button>
        <button type="button">Send</button>
      </div>
    </form>
  );
}

export default MedicinesForm;
