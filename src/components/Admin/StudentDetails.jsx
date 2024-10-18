import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function StudentDetails() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Function to fetch students
  async function pageRendered() {
    let res = await axios.get('https://studentattendancemanagement.onrender.com/admin-app/student-details');
    if (res.data.message === 'deatils fetched') {
      setStudents(res.data.payload);
    } else {
      console.log('Error in fetching');
    }
  }

  useEffect(() => {
    pageRendered();

    // Add a listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set the initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewDetails = (studentObj) => {
    navigate('/admin-profile/student-page', { state: studentObj });
  };

  const handleRemoveStudent = async (id) => {
    try {
      let res = await axios.delete(`https://studentattendancemanagement.onrender.com/admin-app/student-delete/${id}`);
      if (res.data.message === 'Deleted Successfully') {
        toast.success('Deleted successfully');
        pageRendered();
      } else {
        toast.error('Could not delete');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Server error');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Student Details</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light text-center">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {students.map((student) => (
              <tr key={student.userId}>
                <td>{student.userId}</td>
                <td>{student.name}</td>
                <td>
                <button
                  
                  className='rounded btn-success p-1'
                  style={{ backgroundColor: "rgba(74, 208, 43, 0.556)" }}
                  onClick={() => handleViewDetails(student)}
                >
                    {isMobile ? 'View' : 'View Details'}
                  </button>
                  <button
                  style={{ backgroundColor: "rgba(255, 0, 0, 0.556)" }}
                  className='rounded btn-danger p-1 ms-2'
                  onClick={() => handleRemoveStudent(student.userId)}
                >
                    {isMobile ? 'Remove' : 'Remove Student'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentDetails;
