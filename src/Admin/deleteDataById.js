

const deleteDataById = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:9081/api/v1/${appointmentId}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        alert(`Record with ID ${appointmentId} deleted successfully`);
      } else {
        console.error(`Failed to delete record with ID ${appointmentId}`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  };
  



  
  export default deleteDataById;
