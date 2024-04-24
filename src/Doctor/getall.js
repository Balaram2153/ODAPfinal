

  
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

       
  
  export { getAllData };