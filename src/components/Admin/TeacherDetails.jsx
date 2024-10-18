import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function TeacherDetails() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  async function pageRendered() {
    let res = await axios.get('https://studentattendancemanagement.onrender.com/admin-app/teacher-details');
    if (res.data.message === 'deatils fetched') {
      setTeachers(res.data.payload);
    } else {
      console.log("error in fetching");
    }
  }

  useEffect(() => {
    pageRendered();
  }, []);

  const handleViewDetails = (teacherObj) => {
    navigate('/admin-profile/teacher-page', { state: teacherObj });
  };

  const handleRemoveTeacher = async (id) => {
    try {
      let res = await axios.delete(`https://studentattendancemanagement.onrender.com/admin-app/teacher-delete/${id}`);
      if (res.data.message === 'Deleted Successfully') {
        toast.success('Deleted Successfully');
        pageRendered();
      } else {
        toast.error('Could not delete');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Server error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Teacher Details</h1>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.userId}>
                <td>{teacher.userId}</td>
                <td>{teacher.name}</td>
                <td>
                <button
                  style={{ backgroundColor: "rgba(74, 208, 43, 0.556)" }}
                  className='rounded btn-success p-1'
                  onClick={() => handleViewDetails(teacher)}
                >
                    <span className="d-none d-md-inline">View Details</span>
                    <span className="d-inline d-md-none">View</span>
                  </button>
                  <button
                  style={{ backgroundColor: "rgba(255, 0, 0, 0.556)" }}
                  className='rounded btn-danger p-2 ms-2'
                  onClick={() => handleRemoveTeacher(teacher.userId)}
                >
                    Remove
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

export default TeacherDetails;
