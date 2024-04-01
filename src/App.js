import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import CreateNewsFeed from './component/CreateNewsFeed';
import ManageNewsFeeds from './component/ManageNewsFeeds';
import PerformanceReports from './component/PerformanceReports';
import Navbar from './component/Navbar';

const App = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-light sticky-top">
            <Navbar />
          </div>
          <div className="col-sm p-3 min-vh-100">
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-news-feed" element={<CreateNewsFeed />} />
                <Route path="/manage-news-feeds" element={<ManageNewsFeeds />} />
                <Route path="/performance-reports" element={<PerformanceReports />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
