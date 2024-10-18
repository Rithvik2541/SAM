import React from 'react';
import { useForm } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { toast } from 'sonner';

function Leave() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.approval = "pending";
    try {
      const res = await axios.post('https://studentattendancemanagement.onrender.com/student-app/leave', data);
      if (res.data.message === 'leave posted') {
        toast.success("Leave request submitted successfully");
      } else {
        toast.error("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("An error occurred while submitting the request");
    }
    reset();
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '60vh',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '750px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    fontSize: '1.5rem',
    margin: 0,
  };

  const formStyle = {
    padding: '20px',
  };

  const inputGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '500',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const dateContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  };

  const dateGroupStyle = {
    flex: 1,
    minWidth: 0, // This ensures the flex items can shrink below their minimum content size
  };

  const dateInputStyle = {
    ...inputStyle,
    width: '100%',
    minWidth: 0, // Allows the date input to shrink if needed
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={headerStyle}>Leave Request Form</h3>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="userId" style={labelStyle}>
              <PersonIcon style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Student ID
            </label>
            <input 
              type="text" 
              id="userId" 
              style={inputStyle}
              {...register('userId', { required: 'Student ID is required' })} 
            />
            {errors.userId && <span style={errorStyle}>{errors.userId.message}</span>}
          </div>

          <div style={dateContainerStyle}>
            <div style={dateGroupStyle}>
              <label htmlFor="fromDate" style={labelStyle}>From Date</label>
              <input 
                type="date" 
                id="fromDate" 
                style={dateInputStyle}
                {...register('fromDate', { required: 'Start date is required' })} 
              />
              {errors.fromDate && <span style={errorStyle}>{errors.fromDate.message}</span>}
            </div>
            <div style={dateGroupStyle}>
              <label htmlFor="toDate" style={labelStyle}>To Date</label>
              <input 
                type="date" 
                id="toDate" 
                style={dateInputStyle}
                {...register('toDate', { required: 'End date is required' })} 
              />
              {errors.toDate && <span style={errorStyle}>{errors.toDate.message}</span>}
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="subject" style={labelStyle}>Subject</label>
            <input
              type="text" 
              id="subject" 
              style={inputStyle}
              {...register('subject', { required: 'Subject is required' })} 
            />
            {errors.subject && <span style={errorStyle}>{errors.subject.message}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="description" style={labelStyle}>Description</label>
            <textarea 
              id="description" 
              rows="5" 
              style={{...inputStyle, resize: 'vertical', minHeight: '100px'}}
              {...register('description', { required: 'Description is required' })} 
            ></textarea>
            {errors.description && <span style={errorStyle}>{errors.description.message}</span>}
          </div>

          <button type="submit" style={buttonStyle}>Submit Leave Request</button>
        </form>
      </div>
    </div>
  );
}

export default Leave;