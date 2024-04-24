




let Patientdetails=null;

export function setPatientDetails(patients)
{
    Patientdetails=patients;
}

export function getPatientDetails()
{
    return Patientdetails;
}





let allpatients=null;

export function setAllPatients(Patient)
{
    allpatients=Patient;
}

export function getAllPatients()
{
    return allpatients;
}






let slotdetails=null;

export function setSlotDetails(patientslots)
{
    slotdetails=patientslots;
}

export function getSlotDetails()
{
    return slotdetails;
}


let appointDetails=null;

export function setAppointDetails(bookedslots)
{
    appointDetails=bookedslots;
}

export function getAppointDetails()
{
    return appointDetails;
}


let doctordetails=null;

export function setDoctorDetails(doctor)
{
    doctordetails=doctor;
}

export function  getDoctorDetails()
{
    return doctordetails;
}

let technicianDetails=null;

export function setTechnicianDetails(technician)
{
    technicianDetails=technician;
}

export function getTechnicianDetails()
{
    return technicianDetails;
}