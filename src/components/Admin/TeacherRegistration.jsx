import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

function AddTeacher() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.password = data.userId; // Setting password as userId for this example

    try {
      const res = await axios.post('https://studentattendancemanagement.onrender.com/admin-app/teacher-registration', data);
      if (res.data.message === "user exists") {
        toast.warning("Teacher exists");
      } else if (res.data.message === "user added") {
        toast.success("Teacher added");
      }
    } catch (error) {
      console.error('There was an error registering the teacher!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Faculty Registration</h3>
      <div className="card shadow mx-auto" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-control"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-control"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="userId">Employee ID</label>
              <input 
                type="text" 
                id="userId" 
                className="form-control"
                {...register('userId', { required: 'Employee ID is required' })}
              />
              {errors.userId && <span className="text-danger">{errors.userId.message}</span>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phonenumber">Phone Number</label>
              <input 
                type="text" 
                id="phonenumber" 
                className="form-control"
                {...register('phonenumber', { required: 'Phone Number is required' })}
              />
              {errors.phonenumber && <span className="text-danger">{errors.phonenumber.message}</span>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="dob">Date of Birth</label>
              <input 
                type="date" 
                id="dob" 
                className="form-control"
                {...register('dob', { required: 'Date of Birth is required' })}
              />
              {errors.dob && <span className="text-danger">{errors.dob.message}</span>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender">Gender</label>
              <select 
                id="gender" 
                className="form-control"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Choose an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
            </div>
          </div>

          {/* Row 4 */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="course">Course&Dept.</label>
              <select 
                id="course" 
                className="form-control"
                {...register('course', { required: 'Course is required' })}
              >
                <option value="">Choose an option</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="EEE">EEE</option>
                <option value="AUTOMOBILE">AUTOMOBILE</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              {errors.course && <span className="text-danger">{errors.course.message}</span>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="qualification">Qualification</label>
              <input 
                type="text" 
                id="qualification" 
                className="form-control"
                {...register('qualification', { required: 'Qualification is required' })}
              />
              {errors.qualification && <span className="text-danger">{errors.qualification.message}</span>}
            </div>
          </div>

          {/* Row 5 */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="joiningYear">Joining Year</label>
              <input 
                type="date" 
                id="joiningYear" 
                className="form-control"
                {...register('joiningYear', { required: 'Joining Year is required' })}
              />
              {errors.joiningYear && <span className="text-danger">{errors.joiningYear.message}</span>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="designation">Designation</label>
              <input 
                type="text" 
                id="designation" 
                className="form-control"
                {...register('designation', { required: 'Designation is required' })}
              />
              {errors.designation && <span className="text-danger">{errors.designation.message}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
