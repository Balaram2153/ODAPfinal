import React, { useState } from 'react';
import axios from 'axios';
import './Diagnostic.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import PatientNav from './Patient/PatientNav';
import FooterPage from './Landpage/FooterPage';
import SubtestsDropdown from './Subtest';
import { useEffect } from 'react';


function PatientForm() {
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const [selectedTests, setSelectedTests] = useState([]);
    const calculateTotalAmount = (selectedTests) => {
        let totalAmount = 0;
        selectedTests.forEach((test) => {
          const price = parseInt(test.label.split(' - ')[1].replace('$', ''), 10);
          totalAmount += price;
        });
        return totalAmount;
      };



var storedResponseString = localStorage.getItem('loggedIn');

var storedResponse = JSON.parse(storedResponseString);
var ids=storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;
var disease=storedResponse.chronicDisease;
var gender=storedResponse.gender;

  const [patientData, setPatientData] = useState({
    patientName: name,
    patientId: ids,
    tests: '',
    chronicDisease: disease,
    typeofservices: '',
    bookingDate: '',
    bookingTime: '',
    addressLine1: '',
    address: '',
    referralDoctorName: '',
    diagnosticCenter: '',
    gender: gender,
    age: '',
    amount:'',
    collection: '',
    prescription: null,
    patientEmail: '',
    patientMobileNumber: phone
  });

 
  const handleFileChange = (e) => {
    setPatientData({ ...patientData, prescription: e.target.files[0] });
  };


  
 const [referralDoctorNameError, setReferralDoctorNameError] = useState('');
 const [bookingDateError, setBookingDateError] = useState('');
 const [addressError, setAddressError] = useState('');
 const [bookingTimeError, setBookingTimeError] = useState('');
 const [isValid, setIsValid] = useState(false);
 
 const [validAddress,setValidAddress]=useState(false)
 const [ValidDoctorName,setValidDoctorName]=useState(false)
 const [validBookingTime,setValidBookingTime]=useState(false)
 const [validBookingDate,setValidBookingDate]=useState(false)

 const handleChange = (e) => {
  const { name, value } = e.target;
  let notValid = false;

  // Update the patientData state with the new value
  setPatientData({ ...patientData, [name]: value });

  // Check validation for each field
  switch (name) {
   

    case 'referralDoctorName':
      if (!/^(?! +$)[a-zA-Z\s]{3,20}$/.test(value.trim())) {
        setReferralDoctorNameError('Doctor name should be between 3 and 20 characters and should not contain special characters or only spaces.');
        notValid = true;
        setIsValid(false);
        setValidDoctorName(false)
      } else {
        setReferralDoctorNameError('');
        setIsValid(true);
        setValidDoctorName(true)
      }
      break;

   

      case 'bookingDate':
        const selectedDate = new Date(value); // Convert booking date to a Date object
        const currentDate = new Date(); // Get current date
      
        // Set hours, minutes, seconds, and milliseconds to 0 for both selected and current date
        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
      
        if (selectedDate < currentDate) {
          setBookingDateError('Please select a future date.');
          notValid = true;
          setIsValid(false);
          setValidBookingDate(false);
          setValidBookingDate(false);
        } else {
          setBookingDateError('');
          setIsValid(true);
          setValidBookingDate(true);
        }
        break;
      

      case 'addressLine1':
        if (!/^[a-zA-Z0-9\s,\\-]{3,50}$/.test(value.trim())) {
          setAddressError('Address should contain only letters, spaces, commas, hyphens, and numbers (0-9). Minimum 3 and maximum 50 characters allowed.');
          notValid = true;
          setIsValid(false);
          setValidAddress(false)
        } else {
          setAddressError('');
          setIsValid(true);
          setValidAddress(true)
        }
        break;
       
      

        case 'bookingTime':
  // Convert booking date to a Date object
  const selectedDate1 = new Date(patientData.bookingDate);
  
  // Split the time value (hh:MM) and convert it to hours and minutes
  const timeParts = value.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  
  // Create a new Date object with the date from selectedDate1 and the time from the value
  const selectedDateTime1 = new Date(
    selectedDate1.getFullYear(),
    selectedDate1.getMonth(),
    selectedDate1.getDate(),
    hours,
    minutes
  );

  // Get current date and time
  const currentDateTime1 = new Date();

  // Check if selected date and time is in the past or present
  if (selectedDateTime1 < currentDateTime1) {
    // If selected date and time is in the past or present, show an error
    setBookingTimeError('Please select a future date and time.');
    notValid = true;
    setIsValid(false);
    setValidBookingTime(false);
  } else {
    // If selected date and time is in the future, time is considered valid
    setBookingTimeError('');
    setIsValid(true);
    setValidBookingTime(true);
  }
  break;

        

    default:
      break;
  }

  
  console.log(isValid)
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  if (selectedTests.length === 0) {
    alert('Please select at least one test.');
    return;
  }
  if(!patientData.bookingDate){
    alert("select booking date")
    return
  }
  if(!patientData.bookingTime){
    alert("please select booking time")
    return
  }
  if(!patientData.prescription){
    alert("please drop a prescription")
    return
  }
  if(!patientData.collection){
  alert("please select collection type")
  return
  }
  if (!patientData.city) {
    alert("Please enter a search city.");
    return;
  }
  
  if(!ValidDoctorName){
    alert('Enter Valid Docter Name')
    return;
  }
  
  if(!validAddress){
    alert('Enter Valid Address')
    return
  }
  if(!validBookingDate){
    alert('Select Valid Booking Date')
    return
  }
  if(!validBookingTime){
    alert('Select Valid Booking Time')
    return
  }
  
  
  if (selectedSubtests.length === 0) {
    alert('Please select at least one subtest.');
    return;
  }
  
  if (!patientData.typeofservices) {
    alert('Please select a service type.');
    return;
  }
  
  if(!patientData.age || (patientData.age).length >2 || patientData.age === 0){
    alert('please enter valid age details');
    return;
  }
  
  if(!patientData.patientEmail)
  {
    alert("please enter email");
    return;
  }

  if (!/^(?! +$)[a-zA-Z\s]{3,20}$/.test(patientData.referralDoctorName.trim())) {
    alert('Doctor name should be between 3 and 20 characters and should not contain special characters or only spaces.');
    return;
  }

  
  if (!/^[a-zA-Z0-9\s,\\-]{3,50}$/.test(patientData.addressLine1.trim())) {
    alert('Address should contain only letters, spaces, commas, hyphens, and numbers (0-9). Minimum 3 and maximum 50 characters allowed.');
    return;
  }

  const selectedDate = new Date(patientData.bookingDate); // Convert booking date to a Date object
  const currentDate = new Date(); // Get current date
  selectedDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  if (selectedDate < currentDate) {
    alert('Please select a future date.');
    return;
  }

  const selectedDateTime = new Date(patientData.bookingDate + 'T' + patientData.bookingTime); // Combine date and time
  const currentDateTime = new Date(); // Get current date and time
  if (selectedDateTime < currentDateTime) {
    alert('Please select a future date and time.');
    return;
  }

 
    const totalAmount = calculateTotalAmount(selectedTests);

    // Update the amount field in the patientData state
    setPatientData({ ...patientData, amount: totalAmount });
    const testsWithSubtests = ` ${patientData.subtests}`;


    try {

      function generateUniqueID(existingIDs) {
        let id = '';
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
        // Function to shuffle array elements (Fisher-Yates shuffle)
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
    
        // Generate a random permutation of digits
        const shuffledDigits = shuffleArray(digits);
    
        // Construct ID from the shuffled digits
        for (let i = 0; i < 6; i++) {
            id += shuffledDigits[i];
        }
    
        // Check if the ID is unique
        while (existingIDs.includes(id)) {
            // If not unique, shuffle again
            shuffleArray(shuffledDigits);
            id = '';
            for (let i = 0; i < 6; i++) {
                id += shuffledDigits[i];
            }
        }
    
        return id;
    }
    let existingIDs = [];

// Call the function to generate a unique ID
const newID = generateUniqueID(existingIDs);

// Store the returned ID in the existingIDs array
existingIDs.push(newID);
console.log(newID);
        const formData = new FormData();
        formData.append('patientName', name);
        formData.append('patientId',ids);
        formData.append('tests', testsWithSubtests);
        formData.append('chronicDisease', disease);
        formData.append('typeofservices', patientData.typeofservices);
        formData.append('bookingDate', patientData.bookingDate);
        formData.append('bookingTime', patientData.bookingTime);
        formData.append('addressLine1', patientData.addressLine1);
        formData.append('address', searchCity);
        formData.append('referralDoctorName', patientData.referralDoctorName);
        formData.append('diagnosticCenter', patientData.diagnosticCenter);
        formData.append('gender', gender);
        formData.append('age', patientData.age);
        formData.append('amount', patientData.amount);
        formData.append('collection', patientData.collection);
        formData.append('prescription', patientData.prescription); // Add prescription file
        formData.append('patientEmail', patientData.patientEmail);
        formData.append('patientMobileNumber', phone);
        formData.append('appointmentRefId', newID);

      const response=  await axios.post('http://localhost:8080/api/patients/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setData(response.data);
        console.log(data)

        navigate("/test" ,{ state: { patientData: response.data } })
      // Clear form after successful submission
      setPatientData({
        patientName: '',
        patientId:'',
        tests: '',
        chronicDisease: '',
        typeofservices: '',
        bookingDate: '',
        bookingTime: '',
        addressLine1: '',
        address: '',
        referralDoctorName: '',
        diagnosticCenter: '',
        gender: '',
        age: '',
        amount:'',
        collection: '',
        prescription: null,
        patientEmail: '',
        patientMobileNumber: ''
      });

      // Add any success message/alert if needed
    } catch (error) {
      console.error('Error occurred while submitting patient data:', error);
      // Handle error messages/alerts
    }
};
useEffect(() => {
  const totalAmount = calculateTotalAmount(selectedTests);
  setPatientData({ ...patientData, amount: totalAmount });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedTests]);



  const handleCollectionChange = (selectedOption) => {
    setPatientData({ ...patientData, collection: selectedOption.value });
};

const collectionOptions = [
    
    { value: 'Home-Visit', label: 'Home-Visit' }
];
const cityDiagnosticCenters = {
  Hyderabad: ['Surya Diagnostics', 'Omkar Diagnostics'],
  Bangalore: ['Santhosh Diagnostics', 'Kaveri Diagnostics'],
  Chennai: ['AARTHI SCANS & LABS', 'Vijaya Diagnostics']
  // Add more cities and their diagnostic centers
};

const handleCityChange = (selectedOption) => {
  const city = selectedOption.value;
  const diagnosticCenterOptions = cityDiagnosticCenters[city] || [];
  const defaultDiagnosticCenter = diagnosticCenterOptions.length > 0 ? diagnosticCenterOptions[0] : '';

  setPatientData({
      ...patientData,
      city: city,
      diagnosticCenterOptions: diagnosticCenterOptions,
      diagnosticCenter: defaultDiagnosticCenter // Set default diagnostic center
  });
};
const [selectedSubtests, setSelectedSubtests] = useState([]);
useEffect(() => {
  setSelectedTests([]);
  setSelectedSubtests([]);
  setPatientData({ ...patientData, tests: '', typeofservices: '', subtests: '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const testOptions = [
  {
    value: 'BloodTest',
    label: 'Blood Test - $100',
    typeofservices: 'Pathology',
    subtests: ['BloodTest-Complete Blood Count', 'BloodTest-Blood Glucose', 'BloodTest-Blood Type']
  },
  {
    value: 'EEG',
    label: 'Urine Analysis - $80',
    typeofservices: 'Neurology',
    subtests: ['EEG-Urine Color', 'EEG-Urine pH', 'EEG-Urine Specific Gravity']
  },
  {
    value: 'ECG',
    label: 'ECG (Electrocardiogram) - $150',
    typeofservices: 'Cardiology',
    subtests: ['ECG-Heart Rate', 'ECG-Rhythm Analysis', 'ECG-ST Segment Measurement']
  },
  {
    value: 'X-Ray',
    label: 'X-Ray - $200',
    typeofservices: 'Radiology',
    subtests: ['X-Ray-Chest X-Ray', 'X-Ray-Abdominal X-Ray', 'X-Ray-Bone X-Ray']
  },
];

// Handle test selection change
// Handle test selection change
const handleChangeTests = (selectedOption) => {
  setSelectedTests(selectedOption);

  // Extract selected test labels and service types
  const selectedTestLabels = selectedOption.map(option => option.label);
  const selectedServiceTypes = selectedOption.map(option => option.typeofservices);

  // Join selected test labels and service types
  const testsValue = selectedTestLabels.join(', ');
  const serviceTypesValue = selectedServiceTypes.join(', ');

  // Update state with selected tests and service types
  setPatientData({
    ...patientData,
    tests: testsValue,
    typeofservices: serviceTypesValue,
  });
};



const handleChangeSubtests = (selectedOption) => {
  // Update selected subtests without resetting existing ones
  setSelectedSubtests(prevSubtests => {
    const updatedSubtests = Array.from(new Set([...prevSubtests, ...selectedOption]));
    return updatedSubtests;
  });

  // Join selected subtest labels
  const selectedSubtestLabels = selectedOption.map(option => option.label);
  const subtestsValue = selectedSubtestLabels.join(', ');

  // Update patient data with selected subtests
  setPatientData({
    ...patientData,
    subtests: subtestsValue,
  });
};
const [searchCity, setSearchCity] = useState('');
const [filteredCityOptions, setFilteredCityOptions] = useState([]);
const [cityOptions, setCityOptions] = useState([
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Chennai', label: 'Chennai' }
  // Add more city options as needed
]);
useEffect(() => {
  // Filter city options based on search query
  const filteredOptions = cityOptions.filter(option =>
    option.label.toLowerCase().includes(searchCity.toLowerCase())
  );
  setFilteredCityOptions(filteredOptions);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchCity]);

// Event handler for city search input change
const handleCitySearchChange = (e) => {
  setSearchCity(e.target.value);
};
const handleCitySearch = (searchTerm) => {
  if (searchTerm.trim() === '') {
      // If search term is empty, reset city options to original list
      setCityOptions([
          { value: 'Hyderabad', label: 'Hyderabad' },
          { value: 'Bangalore', label: 'Bangalore' },
          { value: 'Chennai', label: 'Chennai' }
          // Add more city options as needed
      ]);
  } else {
      // Filter city options based on the input
      const filteredOptions = cityOptions.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCityOptions(filteredOptions);
  }
};
// Event handler for city selection
const handleCitySelect = (selectedCity) => {
  setPatientData({ ...patientData, city: selectedCity });
  setSearchCity(''); // Clear search input after selecting a city
};


// Render subtests


  return (

    <>
    <PatientNav/>
    <div className="container mt-5" style={{width:'700px'}}>
      <h2 style={{textAlign:'center'}}>Diagnostics</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">Patient Name</label>
              <input type="text" className="form-control" id="patientName" name="patientName" placeholder="Enter patient name" value={name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="patientId" className="form-label">Patient ID</label>
              <input type="text" className="form-control" id="patientId" name="patientId" placeholder="Enter patient name" value={ids} onChange={handleChange} required />
            </div>
            {/* Add rest of the input fields */}
            <div className="mb-3">
              <label htmlFor="tests" className="form-label">Tests</label>
              <Select
                isMulti
                options={testOptions}
                value={selectedTests}
                onChange={handleChangeTests}
                placeholder="Select tests..."
              />
            </div>
            {selectedTests.length > 0 && (
          <SubtestsDropdown
            subtests={selectedTests.flatMap(test => test.subtests)}
            selectedSubtests={selectedSubtests}
            onChange={handleChangeSubtests}
          />
        )}
            <div className="mb-3">
              <label htmlFor="chronicDisease" className="form-label">Chronic Disease</label>
              <input type="text" className="form-control" id="chronicDisease" name="chronicDisease" placeholder="Enter chronic disease" value={disease} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="typeofservices" className="form-label">Type of Services</label>
              <input type='text' className="form-control" id="typeofservices" name="typeofservices" value={patientData.typeofservices} onChange={handleChange}/>
                
            </div>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">Booking Date</label>
              <input type="date" className="form-control" id="bookingDate" name="bookingDate" placeholder="Select booking date" value={patientData.bookingDate} onChange={handleChange} />
              {bookingDateError && (
                    <span className="text-danger">{bookingDateError}</span>
                )}
                 {validBookingDate && <div style={{ color: 'green' }}>Valid Booking Date!</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="bookingTime" className="form-label">Booking Time</label>
              <input type="time" className="form-control" id="bookingTime" name="bookingTime" placeholder="Select booking time" value={patientData.bookingTime} onChange={handleChange} />
              {bookingTimeError && (
                    <span className="text-danger">{bookingTimeError}</span>
                )}
                 {validBookingTime && <div style={{ color: 'green' }}>Valid Booking Time!</div>}
            </div>
            <div className="mb-3">
            <label htmlFor="collection" className="form-label">Collection</label>
            <Select
                options={collectionOptions}
                onChange={handleCollectionChange}
                placeholder="Select collection method"
                value={collectionOptions.find(option => option.value === patientData.collection)}
            />
        </div>
          </div>
          <div className="col-md-6">

          <div className="mb-3">
              <label htmlFor="referralDoctorName" className="form-label">Referral Doctor Name</label>
              <input type="text" className="form-control" id="referralDoctorName" name="referralDoctorName" placeholder="Enter referral doctor name" value={patientData.referralDoctorName} onChange={handleChange} />
              {referralDoctorNameError && (
        <span className="text-danger">{referralDoctorNameError}</span>
    )}
     {ValidDoctorName && <div style={{ color: 'green' }}>Valid Refferred Doctor Name!</div>}
          </div>
            <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <Select
                                options={cityOptions}
                                onInputChange={handleCitySearch}
                                onChange={handleCityChange}
                                placeholder="Search or select city"
                                value={{ value: patientData.city, label: patientData.city }}
                            />
                        </div>
           
                        <div className="mb-3">
                    <label htmlFor="diagnosticCenter" className="form-label">Diagnostic Center</label>
                    <Select
    options={(patientData.diagnosticCenterOptions || []).map(center => ({ value: center, label: center }))}
    onChange={(selectedOption) => setPatientData({ ...patientData, diagnosticCenter: selectedOption.value })}
    placeholder="Select diagnostic center..."
    value={{ value: patientData.diagnosticCenter, label: patientData.diagnosticCenter }}

/>  {addressError && (
                    <span className="text-danger">{addressError}</span>
                )}
                 {validAddress && <div style={{ color: 'green' }}>Valid address!</div>}
                </div>
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label">Address</label>

              <input type="text" className="form-control" id="addressLine1" name="addressLine1" placeholder="Enter address" value={patientData.addressLine1} onChange={handleChange} />
              {addressError && (
                    <span className="text-danger">{addressError}</span>
                )}
                 {validAddress && <div style={{ color: 'green' }}>Valid address!</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-control" id="gender" name="gender" value={gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" name="age" placeholder="Enter age" value={patientData.age} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="text" className="form-control" id="amount" name="amount"  placeholder="Amount"   value={calculateTotalAmount(selectedTests)} disabled />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="prescription" className="form-label">Prescription</label>
          <input type="file" className="form-control" id="prescription" name="prescription" onChange={handleFileChange} accept=".pdf,.jpg,.png" required />
        </div>
        <div className="mb-3">
          <label htmlFor="patientEmail" className="form-label">Patient Email</label>
          <input type="email" className="form-control" id="patientEmail" name="patientEmail" placeholder="Enter patient email" value={patientData.patientEmail} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="patientMobileNumber" className="form-label">Patient Mobile Number</label>
          <input type="tel" className="form-control" id="patientMobileNumber" name="patientMobileNumber" placeholder="Enter patient mobile number" value={phone} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <FooterPage/>
    </>
  );
}

export default PatientForm;
