import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CampaignIcon from '@mui/icons-material/Campaign';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SpeedIcon from '@mui/icons-material/Speed';
import axios from 'axios';
import { CounterContext } from '../ContextAPI/CounterContext';

function StudentProfile() {
  const [showMore, setShowMore] = useState(false);
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const [id, setId] = useContext(CounterContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    axios.get('/api/courses')
      .then(response => {
        setCourses(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  const isCourseDetailsVisible = !(
    location.pathname.includes('request-leave') || 
    location.pathname.includes('attendance') || 
    location.pathname.includes('announcements') || 
    location.pathname.includes('holidays')
  );

  const sidebarStyle = {
    backgroundImage: "linear-gradient(to top left, rgb(221, 161, 94), rgb(202, 103, 2))",
    minHeight: "100vh",
    width: showMore ? '200px' : '60px',
    transition: 'width 0.3s ease',
    position: windowWidth <= 768 ? 'fixed' : 'relative',
    zIndex: 1000,
  };

  const contentStyle = {
    marginLeft: windowWidth <= 768 ? '60px' : showMore ? '200px' : '60px',
    transition: 'margin-left 0.3s ease',
    width: '100%',
    padding: '20px',
  };

  const navItemStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', padding: '10px' }}>
          <ExpandMoreIcon 
            style={{ fontSize: '32px', marginRight: '10px', cursor: 'pointer' }} 
            onClick={toggleMore} 
          />
          {showMore && <span>More</span>}
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['attendance', 'announcements', 'holidays', 'request-leave'].map((item, index) => {
            const icons = [SpeedIcon, CampaignIcon, EventNoteIcon, HistoryEduIcon];
            const Icon = icons[index];
            return (
              <li key={item} style={navItemStyle}>
                <NavLink 
                  to={item}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    color: 'black',
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'rgba(0,0,0,0.1)' : 'transparent',
                  })}
                >
                  <Icon style={{ fontSize: '24px', marginRight: '10px' }} />
                  {showMore && <span style={{ textTransform: 'capitalize' }}>{item.replace('-', ' ')}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div style={contentStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }} className='mb-5'>Welcome {id}-Student</h2>
        
        {isCourseDetailsVisible && windowWidth > 768 && (
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: "rgb(202, 103, 2)",
              padding: '15px',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ margin: 0 }}>Course Details</h2>
            </div>
            <div style={{ 
              backgroundColor: "aliceblue",
              padding: '20px'
            }}>
              {['Operating System-2209811PC', 'Software Engineering-2209831PE', 
                'Computer Organization-2208411PC', 'Data Analytics-2209811CS'].map((course, index) => (
                <h4 key={index} style={{ 
                  margin: '10px 0',
                  fontSize: windowWidth <= 1024 ? '16px' : '18px'
                }}>{course}</h4>
              ))}
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;