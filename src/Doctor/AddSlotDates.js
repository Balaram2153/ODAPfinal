import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSlotDates() {
  var doctors = localStorage.getItem('loggedIn');
  var stored = JSON.parse(doctors);
  var id = stored.doctorId;  

  const [slotDates, setSlotDates] = useState([]);
  const [doctorId, setDoctorId] = useState(id);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate('');

  const handleAddSlotDate = (e) => {
    const selectedDate = e.target.value;
    if (!slotDates.includes(selectedDate)) {
      setSlotDates([...slotDates, selectedDate]);
    }
  };

  const handleRemoveSlotDate = (index) => {
    const newSlotDates = [...slotDates];
    newSlotDates.splice(index, 1);
    setSlotDates(newSlotDates);
  };

  const handleSubmit = async () => {
    
    if (!slotDates.length) {
      alert('Please add at least one slot date');
      return;
    }
    
    const data = {
      slotDates,
      doctorId,
      startTime,
      endTime
    };

    try {
      
      const currentDate = new Date();
    
    for (const selectedDate of slotDates) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0);

      if (selectedDateObj <= currentDate) {
        alert('Please select a future date.');
        return;
      }
    }
      if(startTime === ''){
        alert("Please select a start time");
        return;
      }
      if(endTime === ''){
        alert("Please select a end time");
        return;
      }
      
      const response = await axios.post('http://localhost:9099/api/weeklySlotDates', data);
      console.log(response);
      setSlotDates([]);
      setDoctorId('');
      setStartTime('');
      setEndTime('');
      alert("Slots updated successfully");
      navigate("/DDashboard");
    } catch (error) {
      console.error('Error posting slot dates:', error);
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: '80px', width: '600px' }}>
        <p style={{ textAlign: 'center' }}>Add Doctor Slots</p>
        <div>
          <label>Slot Dates:</label>
          {slotDates.map((date, index) => (
            <div key={index}>
              {date}
              <button onClick={() => handleRemoveSlotDate(index)}>Remove</button>
            </div>
          ))}
          <input type="date" onChange={handleAddSlotDate} />
        </div>
        <div>
          <label htmlFor="doctorId">Doctor ID:</label>
          <input type="text" id="doctorId" value={id} readOnly />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default AddSlotDates;
