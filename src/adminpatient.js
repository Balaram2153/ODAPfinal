


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios if you're using it

const AdminPatient = () => {  // Define state to store the slot dates

    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    const [allTimeSlots] = useState([
      "10:00 AM", "10:20 AM", "10:40 AM",
      "11:00 AM", "11:20 AM", "11:40 AM",
      "12:00 PM", "12:20 PM", "12:40 PM",
      "2:00 PM", "2:20 PM", "2:40 PM",
      "3:00 PM", "3:20 PM", "3:40 PM",
      "4:00 PM", "4:20 PM", "4:40 PM",
      "5:00 PM", "5:20 PM"
    ]);
   
    const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);
      // Define state to store the slot dates and timings
      const [slotDates, setSlotDates] = useState([]);
      const [selectedDate, setSelectedDate] = useState(null);
    

      useEffect(() => {
        async function fetchBookedSlotsdata() {
          try {
            const response = await axios.get("http://localhost:9081/api/v1/all");
    
            const allSlots = response.data;
    
            const bookingTimes = allSlots.map((slot) => ({
              time: slot.bookingTime,
              date: slot.bookingDate,
            }));
    
            setUnavailableSlots((prevUnavailableSlots) => [
              ...prevUnavailableSlots,
              ...bookingTimes
                .filter((slot) => slot.date === selectedDate)
                .map((slot) => slot.time),
            ]);
    
            setUnavailableSlotsDate((prevUnavailableSlots) => [
              ...prevUnavailableSlots,
              ...bookingTimes.map((slot) => slot.date),
            ]);
    
            setBookedSlots((prevBookedSlots) => [
              ...prevBookedSlots,
              ...bookingTimes,
            ]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        if (selectedDate) {
          fetchBookedSlotsdata();
        }
      }, [selectedDate]);
    
      const handleSlotClick = (clickedTime) => {
        if (
          !unavailableSlots.includes(clickedTime) &&
          !bookedSlots.some(
            (slot) => slot.time === clickedTime && slot.date === selectedDate
          )
        ) {
          setSelectedTimeSlot(clickedTime);
        }
      };
    
      // Function to fetch slot dates from the server
      const fetchSlotDates = async () => {
        try {
          // Make an HTTP GET request to fetch slot dates
          const response = await axios.get(' http://localhost:9099/api/weeklySlotDates/1'); // Replace '/weeklySlotDates/1' with your endpoint
          const data = response.data;
    
          // Update the state with the fetched slot dates
          setSlotDates(data.slotDates);
        } catch (error) {
          console.error('Error fetching slot dates:', error);
        }
      };
    
      // Function to handle date selection
      const handleDateSelect = (date) => {
        // Update the selected date state
        setSelectedDate(date);
      };
    
      // Fetch slot dates when the component mounts
      useEffect(() => {
        fetchSlotDates();
      }, []); // Empty dependency array ensures the effect runs only once
    
      return (
        <div>
<form>
<div className="form-group booking-date-container">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
             
            />
          </div>

          {allTimeSlots.map((time, index) => {
            const isUnavailable =
              unavailableSlots.includes(time) && unavailableSlotsDate.includes(selectedDate) &&
              bookedSlots.some(
                (slot) => slot.date === selectedDate && slot.time === time
              );

            return (
              <label
                key={index}
                className={`time-slot ${
                  isUnavailable
                    ? "unavailable"
                    : selectedTimeSlot === time
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="option-input radio"
                  name="timeSlot"
                  onChange={() => handleSlotClick(time)}
                  disabled={isUnavailable}
                  checked={selectedTimeSlot === time}
                />
                {time}
              </label>
            );
          })}
          <h2>List of Slot Dates</h2>
          <div className="slot-dates-container">
            {slotDates.map((date) => (
              <div
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`slot-date ${date === selectedDate ? 'selected' : ''}`}
              >
                {date}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div>
              <h3>Slots for {selectedDate}</h3>
             {allTimeSlots.map((time, index) => {
            const isUnavailable =
              unavailableSlots.includes(time) && unavailableSlotsDate.includes(selectedDate) &&
              bookedSlots.some(
                (slot) => slot.date === selectedDate && slot.time === time
              );

            return (
              <label
                key={index}
                className={`time-slot ${
                  isUnavailable
                    ? "unavailable"
                    : selectedTimeSlot === time
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="option-input radio"
                  name="timeSlot"
                  onChange={() => handleSlotClick(time)}
                  disabled={isUnavailable}
                  checked={selectedTimeSlot === time}
                />
                {time}
              </label>
            );
          })}
            </div>
          )}
          </form>
        </div>
      );
    };
    

    
     

//   // Define state to store the slot dates and timings
//   const [slotTimings, setSlotTimings] = useState([]);

//   // Function to generate slots for each date
//   const generateSlots = (startDate, endDate, startTime, endTime) => {
//     const slots = [];
//     let currentDate = new Date(startDate);

//     // Loop through each date and generate slots
//     while (currentDate <= endDate) {
//       const dateString = currentDate.toISOString().split('T')[0];
//       const slotTiming = {
//         date: dateString,
//         slots: generateTimeSlots(startTime, endTime),
//       };
//       slots.push(slotTiming);
//       currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//     }

//     return slots;
//   };

//   // Function to generate time slots for a given date
//   const generateTimeSlots = (startTime, endTime) => {
//     const slots = [];
//     let currentTime = new Date(`2000-01-01T${startTime}`);
//     const endTimeObj = new Date(`2000-01-01T${endTime}`);

//     // Loop through each time slot
//     while (currentTime < endTimeObj) {
//       const slotTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       slots.push(slotTimeString);
//       currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment by 15 minutes
//     }

//     return slots;
//   };

//   // Function to fetch slot dates and timings from the server
//   const fetchSlotTimings = async () => {
//     try {
//       // Make an HTTP GET request to fetch slot dates and timings
//       const response = await axios.get('http://localhost:9099/api/weeklySlotDates/1'); // Replace '/weeklySlotDates/1' with your endpoint
//       const data = response.data;

//       // Generate slots for each date using the provided data
//       const startDate = new Date(data.slotDates[0]);
//       const endDate = new Date(data.slotDates[data.slotDates.length - 1]);
//       const slots = generateSlots(startDate, endDate, data.startTime, data.endTime);

//       // Update the state with the generated slot timings
//       setSlotTimings(slots);
//     } catch (error) {
//       console.error('Error fetching slot timings:', error);
//     }
//   };

//   // Fetch slot timings when the component mounts
//   useEffect(() => {
//     fetchSlotTimings();
//   }, []); // Empty dependency array ensures the effect runs only once

//   return (
//     <div>
//       <h2>List of Slot Timings</h2>
//       {slotTimings.map((slot) => (
//         <div key={slot.date}>
//           <h3>{slot.date}</h3>
//           <ul>
//             {slot.slots.map((time, index) => (
//               <li key={index}>{time}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };


//   const [slotDates, setSlotDates] = useState([]);

//   // Function to fetch slot dates from the server
//   const fetchSlotDates = async () => {
//     try {
//       // Make an HTTP GET request to fetch slot dates
//       const response = await axios.get(' http://localhost:9099/api/weeklySlotDates/1'); // Replace '/weeklySlotDates/1' with your endpoint
//       const data = response.data;

//       // Update the state with the fetched slot dates
//       setSlotDates(data.slotDates);
//     } catch (error) {
//       console.error('Error fetching slot dates:', error);
//     }
//   };

//   // Fetch slot dates when the component mounts
//   useEffect(() => {
//     fetchSlotDates();
//   }, []); // Empty dependency array ensures the effect runs only once

//   return (
//     <div>
//       <h2>List of Slot Dates</h2>
//       <ul>
//         {slotDates.map((date, index) => (
//           <li key={index}>{date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };




export default AdminPatient;
