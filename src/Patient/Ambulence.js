import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Ambulence.css";
import { useNavigate } from "react-router-dom";
import FooterPage from "../Landpage/FooterPage";
import PatientNav from "./PatientNav";

const AmbulenceServices = () => {
  const navigate = useNavigate();

  var storedResponseString = localStorage.getItem("loggedIn");

  var storedResponse = JSON.parse(storedResponseString);

  var particularItem = storedResponse.patientId;
  var phone = storedResponse.patientMobileNumber;

  const [newCandidate, setNewCandidate] = useState({
    patientId: particularItem,
    email: "",
    mobileNumber: phone,
    facilities: "",
    disease: "",
    date: "",
    time: "",
    fromLocation: "",
    toLocation: "",
    fromAddress: {
      fromLine1: "",
      fromLine2: "",
      fromCity: "",
    },
    toAddress: {
      toLine1: "",
      toLine2: "",
      toCity: "",
    },
    fromHospitalName: "",
    toHospitalName: "",
    serviceFee: 0,
    totalFee: 0,
    providers: "",
  });

  const calculateServiceFee = () => {
    console.log("Calculating service fee...");
    let fee = 0;

    console.log("From Location:", newCandidate.fromLocation);
    console.log("To Location:", newCandidate.toLocation);
    console.log("From Hospital:", newCandidate.fromHospitalName);
    console.log("To Hospital:", newCandidate.toHospitalName);

    if (
      newCandidate.fromLocation === "Resident" &&
      newCandidate.toLocation === "Hospital"
    ) {
      fee = 200;
    } else if (
      newCandidate.fromLocation === "Hospital" &&
      newCandidate.toLocation === "Resident"
    ) {
      fee = 240;
    } else if (
      newCandidate.fromLocation === "Hospital" &&
      newCandidate.toLocation === "Hospital"
    ) {
      if (
        newCandidate.fromHospitalName === "Yashoda Hospital" &&
        newCandidate.toHospitalName === "Apollo Hospital"
      ) {
        fee = 200;
      } else if (
        newCandidate.fromHospitalName === "Yashoda Hospital" &&
        newCandidate.toHospitalName === "MGM Hospital"
      ) {
        fee = 250;
      } else if (
        newCandidate.fromHospitalName === "Apollo Hospital" &&
        newCandidate.toHospitalName === "MGM Hospital"
      ) {
        fee = 180;
      } else if (
        newCandidate.fromHospitalName === "MGM Hospital" &&
        newCandidate.toHospitalName === "Apollo Hospital"
      ) {
        fee = 500;
      } else if (
        newCandidate.fromHospitalName === "Continental Hospital" &&
        newCandidate.toHospitalName === "KIMS Hospitals"
      ) {
        fee = 250;
      } else if (
        newCandidate.fromHospitalName === "Apollo Hospital" &&
        newCandidate.toHospitalName === "Continental Hospital"
      ) {
        fee = 300;
      } else if (
        newCandidate.fromHospitalName === "Medicover Hospitals" &&
        newCandidate.toHospitalName === "Maxcure Hospitals"
      ) {
        fee = 320;
      } else if (
        newCandidate.fromHospitalName === "Sunshine Hospitals" &&
        newCandidate.toHospitalName === "Maxcure Hospitals"
      ) {
        fee = 280;
      } else if (
        newCandidate.fromHospitalName === "Yashoda Hospital" &&
        newCandidate.toHospitalName === "Continental Hospital"
      ) {
        fee = 400;
      } else {
        fee = 500;
      }
    }
    console.log("Fee:", fee);
    return fee;
  };

  const calculateTotalFee = () => {
    const gst = 0.12;
    const total = newCandidate.serviceFee * (1 + gst);
    return total;
  };

  useEffect(() => {
    const fee = calculateServiceFee();
    setNewCandidate((prevData) => ({ ...prevData, serviceFee: fee }));
  }, [
    newCandidate.fromLocation,
    newCandidate.toLocation,
    newCandidate.fromHospitalName,
    newCandidate.toHospitalName,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewCandidate((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    }  else {
      if (name === "date") {
        // Validate date
        const selectedDate = new Date(value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to start of day
        if (selectedDate < currentDate) {
          alert("Please select a present day or future date.");
          return;
        }
      }
  
      if (name === "time") {
        // Validate time
        const selectedDateTime = new Date(newCandidate.date + "T" + value);
        const currentDateTime = new Date();
        if (selectedDateTime <= currentDateTime) {
          alert("Please select a future time for the selected date.");
          return;
        }
      }
  
      setNewCandidate((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalFee = calculateTotalFee();
    const {
      patientId,
      email,
      mobileNumber,
      date,
      time,
      fromLocation,
      toLocation,
      serviceFee,
      disease,
      facilities,
      fromHospitalName,
      toHospitalName,
    } = newCandidate;
    const dataToSend = {
      patientId,
      email,
      mobileNumber,
      date,
      time,
      disease,
      facilities,
      fromLocation,
      toLocation,
      serviceFee,
      totalFee,
      fromHospitalName,
      toHospitalName,
      totalFee,
    };

    try {
      if (!newCandidate.patientId) {
        alert("Patient ID is required.");
        return;
      }
      if (!newCandidate.email) {
        alert("Email is required.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newCandidate.email)) {
        alert("Invalid email format.");
        return;
      }
      if (!newCandidate.mobileNumber) {
        alert("Mobile Number is required.");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(newCandidate.mobileNumber)) {
        alert(
          "Invalid phone number format. Please enter 10 digits without spaces or dashes."
        );
        return;
      }
      if (!newCandidate.facilities) {
        alert("Facilities is required.");
        return;
      }
      if (!newCandidate.fromLocation) {
        alert("From Location is required.");
        return;
      }
      if (newCandidate.fromLocation === "Resident") {
        if (
          !newCandidate.fromAddress.fromLine1 ||
          !newCandidate.fromAddress.fromLine2 ||
          !newCandidate.fromAddress.fromCity
        ) {
          alert("From Address is incomplete.");
          return;
        }
      } else if (newCandidate.fromLocation === "Hospital") {
        if (!newCandidate.fromHospitalName) {
          alert("From Hospital Name is required.");
          return;
        }
      }
      if (!newCandidate.toLocation) {
        alert("To Location is required.");
        return;
      }
      if (newCandidate.toLocation === "Resident") {
        if (
          !newCandidate.toAddress.toLine1 ||
          !newCandidate.toAddress.toLine2 ||
          !newCandidate.toAddress.toCity
        ) {
          alert("To Address is incomplete.");
          return;
        }
      } else if (newCandidate.toLocation === "Hospital") {
        if (!newCandidate.toHospitalName) {
          alert("To Hospital Name is required.");
          return;
        }
      }
      if (
        newCandidate.toLocation === "Resident" &&
        newCandidate.fromLocation === "Resident" &&
        newCandidate.fromAddress.fromLine1 === newCandidate.toAddress.toLine1 &&
        newCandidate.fromAddress.fromLine2 === newCandidate.toAddress.toLine2 &&
        newCandidate.fromAddress.fromCity === newCandidate.toAddress.toCity
      ) {
        alert("Both resident addresses should be different");
      }
      if (
        newCandidate.toLocation === "Hospital" &&
        newCandidate.fromLocation === "Hospital" &&
        newCandidate.fromHospitalName === newCandidate.toHospitalName
      ) {
        alert("Both hospitals should be different");
      }

      if (!newCandidate.date) {
        alert("Date is required.");
        return;
      }
      if (
        !newCandidate.patientId ||
        !newCandidate.email ||
        !newCandidate.mobileNumber ||
        !newCandidate.facilities ||
        !newCandidate.fromLocation ||
        !newCandidate.toLocation ||
        !newCandidate.date ||
        !newCandidate.time
      ) {
        alert("Please fill in all required fields.");
        return; // Halt submission
      }
      const response = await axios.post(
        "http://localhost:8910/insert",
        dataToSend
      );
      if (response.status === 201) {
        alert("Booking successful!");
        setNewCandidate({
          patientId: "",
          email: "",
          mobileNumber: "",
          facilities: "",
          disease: "",
          date: "",
          time: "",
          fromLocation: "",
          toLocation: "",
          fromAddress: {
            fromLine1: "",
            fromLine2: "",
            fromCity: "",
          },
          toAddress: {
            toLine1: "",
            toLine2: "",
            toCity: "",
          },
          fromHospitalName: "",
          toHospitalName: "",
          serviceFee: 0,
          totalFee: 0,
          providers: "",
        });
        navigate("/PaymentPage", { state: { ambulanceData: response.data } });
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <PatientNav />
      <div className="abcdef">
        <div className="marquee-1">
          <h3 className="marquee-2">
            {" "}
            Welcome to Online Doctor Appointment Portal! ThankYou! Visit Again{" "}
          </h3>
        </div>
        <div className="xyz">
          <div className="Ambulance-container">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="column-left">
                <strong>
                  <label>Patient ID:</label>
                </strong>
                <input type="text" name="patientId" value={particularItem} />

                <strong>
                  <label>Email:</label>
                </strong>
                <input
                  type="text"
                  name="email"
                  value={newCandidate.email}
                  onChange={handleInputChange}
                  required
                />

                <strong>
                  <label>Mobile Number:</label>
                </strong>
                <input type="text" name="mobileNumber" value={phone} />

                <strong>
                  <label>Ambulance Providers:</label>
                </strong>
                <select
                  name="providers"
                  value={newCandidate.providers}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Ambulance Provider</option>
                  <option value="RED Health">RED Health</option>
                  <option value="7 Hills Ambulance">7 Hills Ambulance</option>
                  <option value="Sri Laxmi Ambulance">
                    Sri Laxmi Ambulance
                  </option>
                  <option value="CARE Hospitals">CARE Hospitals</option>
                  <option value="Ganesh Ambulance">Ganesh Ambulance</option>
                  <option value="Sri Anjali Ambulance">
                    Sri Anjali Ambulance
                  </option>
                </select>

                <strong>
                  <label>Facilities:</label>
                </strong>
                <select
                  name="facilities"
                  value={newCandidate.facilities}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Facilities</option>
                  <option value="Oxygen">Oxygen</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Defibrillator">Defibrillator</option>
                  <option value="Suction Unit">Suction Unit</option>
                  <option value="Medical Kits">Medical Kits</option>
                  <option value="Other">Other</option>
                </select>

                <strong>
                  <label>Disease :</label>
                </strong>
                <select
                  name="disease"
                  value={newCandidate.disease}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Disease</option>
                  <option value="Accident">Accident</option>
                  <option value="Heartstroke">Heartstroke</option>
                  <option value="Poisoned">Poisoned</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Death">Death</option>
                  <option value="Others">Others</option>
                </select>

                <strong>
                  <label>Date:</label>
                </strong>
                <input
                  type="date"
                  name="date"
                  value={newCandidate.date}
                  onChange={handleInputChange}
                  required
                />

                <strong>
                  <label>Time:</label>
                </strong>
                <input
                  type="time"
                  name="time"
                  value={newCandidate.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="column-right">
                <strong>
                  <label>From Location:</label>
                </strong>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="fromLocation"
                      value="Resident"
                      checked={newCandidate.fromLocation === "Resident"}
                      onChange={handleInputChange}
                    />
                    Resident
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="fromLocation"
                      value="Hospital"
                      checked={newCandidate.fromLocation === "Hospital"}
                      onChange={handleInputChange}
                    />
                    Hospital
                  </label>
                </div>

                {newCandidate.fromLocation === "Resident" && (
                  <div>
                    <strong>
                      <label>Line 1:</label>
                    </strong>
                    <input
                      type="text"
                      name="fromAddress.fromLine1"
                      value={newCandidate.fromAddress.fromLine1}
                      onChange={handleInputChange}
                      required
                    />

                    <strong>
                      <label>Line 2:</label>
                    </strong>
                    <input
                      type="text"
                      name="fromAddress.fromLine2"
                      value={newCandidate.fromAddress.fromLine2}
                      onChange={handleInputChange}
                      required
                    />

                    <strong>
                      <label>City:</label>
                    </strong>
                    <input
                      type="text"
                      name="fromAddress.fromCity"
                      value={newCandidate.fromAddress.fromCity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {newCandidate.fromLocation === "Hospital" && (
                  <div>
                    <strong>
                      <label>Hospital Name:</label>
                    </strong>
                    <select
                      name="fromHospitalName"
                      value={newCandidate.fromHospitalName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Hospital</option>
                      <option value="Apollo Hospital">Apollo Hospital</option>
                      <option value="MGM Hospital">MGM Hospital</option>
                      <option value="Continental Hospital">
                        Continental Hospital
                      </option>
                      <option value="Yashoda Hospital">Yashoda Hospital</option>
                      <option value="KIMS Hospitals">KIMS Hospitals</option>
                      <option value="Medicover Hospitals">
                        Medicover Hospitals
                      </option>
                      <option value="Sunshine Hospitals">
                        Sunshine Hospitals
                      </option>
                      <option value="MaxCure Hospitals">
                        MaxCure Hospitals
                      </option>
                    </select>
                  </div>
                )}
                <br />
                <br />

                <strong>
                  <label>To Location:</label>
                </strong>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toLocation"
                      value="Resident"
                      checked={newCandidate.toLocation === "Resident"}
                      onChange={handleInputChange}
                    />
                    Resident
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="toLocation"
                      value="Hospital"
                      checked={newCandidate.toLocation === "Hospital"}
                      onChange={handleInputChange}
                    />
                    Hospital
                  </label>
                </div>

                {newCandidate.toLocation === "Resident" && (
                  <div>
                    <strong>
                      <label>Line 1:</label>
                    </strong>
                    <input
                      type="text"
                      name="toAddress.toLine1"
                      value={newCandidate.toAddress.toLine1}
                      onChange={handleInputChange}
                      required
                    />

                    <strong>
                      <label>Line 2:</label>
                    </strong>
                    <input
                      type="text"
                      name="toAddress.toLine2"
                      value={newCandidate.toAddress.toLine2}
                      onChange={handleInputChange}
                      required
                    />

                    <strong>
                      <label>City:</label>
                    </strong>
                    <input
                      type="text"
                      name="toAddress.toCity"
                      value={newCandidate.toAddress.toCity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {newCandidate.toLocation === "Hospital" && (
                  <div>
                    <strong>
                      <label>Hospital Name:</label>
                    </strong>
                    <select
                      name="toHospitalName"
                      value={newCandidate.toHospitalName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Hospital</option>
                      <option value="Apollo Hospital">Apollo Hospital</option>
                      <option value="MGM Hospital">MGM Hospital</option>
                      <option value="Continental Hospital">
                        Continental Hospital
                      </option>
                      <option value="Yashoda Hospital">Yashoda Hospital</option>
                      <option value="KIMS Hospitals">KIMS Hospitals</option>
                      <option value="Medicover Hospitals">
                        Medicover Hospitals
                      </option>
                      <option value="Sunshine Hospitals">
                        Sunshine Hospitals
                      </option>
                      <option value="MaxCure Hospitals">
                        MaxCure Hospitals
                      </option>
                    </select>
                  </div>
                )}
                <strong>
                  <label>Service Fee:</label>
                </strong>
                <span>{newCandidate.serviceFee}</span>
                <br />
                <br />
                <button type="submit" className="right-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <FooterPage></FooterPage>
    </>
  );
};

export default AmbulenceServices;
