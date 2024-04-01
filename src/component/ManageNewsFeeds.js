import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageNewsFeeds = () => {
  const [newsFeeds, setNewsFeeds] = useState([]);

  useEffect(() => {
    // Fetch news feeds from mock API
    const fetchNewsFeeds = async () => {
      try {
        const response = await axios.get('http://localhost:3000/news-feeds');
        setNewsFeeds(response.data);
      } catch (error) {
        console.error('Error fetching news feeds:', error);
      }
    };

    fetchNewsFeeds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/news-feeds/${id}`);
      setNewsFeeds(newsFeeds.filter(feed => feed.id !== id));
      alert('News feed deleted successfully');
    } catch (error) {
      console.error('Error deleting news feed:', error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.put(`http://localhost:3000/news-feeds/publish/${id}`);
      alert(`News feed with ID ${id} published successfully`);
    } catch (error) {
      console.error('Error publishing news feed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage News Feeds</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newsFeeds.map(feed => (
            <tr key={feed.id}>
              {/* <td>{feed._id}</td> */}
              <td>{feed.title}</td>
              <td>{feed.category}</td>
              <td>
                <button className="btn btn-danger mr-2" onClick={() => handleDelete(feed._id)}>Delete</button>
                <button className="btn btn-success" onClick={() => handlePublish(feed._id)}>Publish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNewsFeeds;
