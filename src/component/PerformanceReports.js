import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PerformanceReports.css';
const PerformanceReports = () => {
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [totalUser, setTotleuser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publishedResponse = await axios.get('http://localhost:3000/news-feeds/published');
        const draftResponse = await axios.get('http://localhost:3000/news-feeds/draft');
        const latestNewsResponse = await axios.get('http://localhost:3000/news-feeds/latest');
        const totleUser = await axios.get('http://localhost:3000/users');


        setPublishedCount(publishedResponse.data.length);
        setDraftCount(draftResponse.data.length);
        setTotleuser(totleUser.data.length);
        setUser(totleUser.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);
  
 


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div class="ag-format-container">
      <div class="ag-courses_box">
        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>

            <div class="ag-courses-item_title">
              {draftCount} Draft News
            </div>


          </a>
        </div>

        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>

            <div class="ag-courses-item_title">
              {publishedCount} Published News
            </div>


          </a>
        </div>

        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>

            <div class="ag-courses-item_title">
              {totalUser} Total Users
            </div>


          </a>
        </div>

        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>
            {user && (
              <div class="ag-courses-item_title">
                <span class="ag-status ag-status--active">Active Users: {user.filter(u => u.status === 'active').length}</span>
              </div>
            )}

          </a>
        </div>



        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>
            {user && (
              <div class="ag-courses-item_title">
                <span class="ag-status ag-status--active">InActive Users: {user.filter(u => u.status === 'inactive').length}</span>
              </div>
            )}

          </a>
        </div>

        <div class="ag-courses_item">
          <a href="#" class="ag-courses-item_link">
            <div class="ag-courses-item_bg"></div>
            {user && (
              <div class="ag-courses-item_title">
                <span class="ag-status ag-status--active">Pending Users: {user.filter(u => u.status === 'pending').length}</span>
              </div>
            )}

          </a>
        </div>

      </div>
      <h3>Performance Charts</h3>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='card'>
           
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
