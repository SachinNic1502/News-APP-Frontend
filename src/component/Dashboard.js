import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
  const [userOnlyStatus, setUserOnlyStatus] = useState([]);
  const [topPerformedNews, setTopPerformedNews] = useState([]);
  const [topSharedNews, setTopSharedNews] = useState([]);
  const [topCommentedNews, setTopCommentedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [draftNews, setDraftNews] = useState([]);
  const [publishedNews, setPublishedNews] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userOnlyStatusResponse = await axios.get('http://localhost:3000/users');
        setUserOnlyStatus(userOnlyStatusResponse.data);

        const topPerformedNewsResponse = await axios.get('http://localhost:3000/news-feeds');
        setTopPerformedNews(topPerformedNewsResponse.data);

        const topSharedNewsResponse = await axios.get('http://localhost:3000/news-feeds/top/shared');
        setTopSharedNews(topSharedNewsResponse.data);

        const topCommentedNewsResponse = await axios.get('http://localhost:3000/news-feeds/top/commented');
        setTopCommentedNews(topCommentedNewsResponse.data);
        
        const latestNewsResponse = await axios.get('http://localhost:3000/news-feeds/latest');
        setLatestNews(latestNewsResponse.data);

        const draftNewsResponse = await axios.get('http://localhost:3000/news-feeds/draft');
        setDraftNews(draftNewsResponse.data);

        const publishedNewsResponse = await axios.get('http://localhost:3000/news-feeds/published');
        setPublishedNews(publishedNewsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusClassName = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green';
      case 'inactive':
        return 'bg-red';
      case 'pending':
        return 'bg-yellow';
      default:
        return '';
    }
  };

  const renderLatestNews = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Latest News</h5>
        <ul className="list-group list-group-flush">
          {latestNews.map(news => (
            <li key={news.id} className="list-group-item">
              <h6>{news.title}</h6>
              <p>{news.content}</p>
              <img src={news.imageUrl} width='200px' alt="News Thumbnail" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderDraftNews = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Draft News</h5>
        <ul className="list-group list-group-flush">
          {draftNews.map(news => (
            <li key={news.id} className="list-group-item">
              <h6>{news.title}</h6>
              <p>{news.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderPublishedNews = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Published News</h5>
        <ul className="list-group list-group-flush">
          {publishedNews.map(news => (
            <li key={news.id} className="list-group-item">
              <h6>{news.title}</h6>
              <p>{news.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderUserActivity = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">User Activity</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {userOnlyStatus.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.email}</td>
                <td>
                  <p className={getStatusClassName(user.status)}>{user.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTopNews = (title, news) => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <ul className="list-group list-group-flush">
          {news.map(item => (
            <li key={item.id} className="list-group-item">
              <h6>{item.title}</h6>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderTopCommentedNews = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Top Commented News</h5>
        <ul className="list-group list-group-flush">
          {topCommentedNews.map(news => (
            <li key={news.id} className="list-group-item">
              <h6>{news.title}</h6>
              <p>{news.content}</p>
              <img src={news.imageUrl} width='200px' alt="News Thumbnail" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {renderUserActivity()}
        </div>
        <div className="col-md-6">
          {renderLatestNews()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {renderDraftNews()}
        </div>
        <div className="col-md-6">
          {renderPublishedNews()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {renderTopNews("Top Shared News", topSharedNews)}
        </div>
        <div className="col-md-6">
          {renderTopCommentedNews()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
