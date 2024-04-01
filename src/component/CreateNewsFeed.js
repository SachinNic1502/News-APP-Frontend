import React, { useState } from 'react';
import axios from 'axios';

const CreateNewsFeed = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/news-feeds', { title, content, category, imageUrl, videoUrl });
      
      alert('News feed created successfully');
    } catch (error) {
      console.error('Error creating news feed:', error.message);
    }
  };
  
  

  return (
    <div className="container">
      <h2>Create News Feed</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL:</label>
          <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="videoUrl" className="form-label">Video URL:</label>
          <input type="text" className="form-control" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default CreateNewsFeed;
