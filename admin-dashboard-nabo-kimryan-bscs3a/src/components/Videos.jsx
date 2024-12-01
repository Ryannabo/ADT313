import React, { useState } from 'react';

const Videos = () => {
    const [videos, setVideos] = useState([
      { id: 1, title: 'Trailer 1', url: 'https://example.com/trailer1' },
      { id: 2, title: 'Trailer 2', url: 'https://example.com/trailer2' },
    ]);
    const [newVideo, setNewVideo] = useState({ title: '', url: '' });
  
    const addVideo = () => {
      if (!newVideo.title || !newVideo.url) {
        alert('Both title and URL are required!');
        return;
      }
      setVideos([...videos, { id: Date.now(), ...newVideo }]);
      setNewVideo({ title: '', url: '' });
    };
  
    const updateVideo = (id, updatedVideo) => {
      setVideos(videos.map((video) => (video.id === id ? { ...video, ...updatedVideo } : video)));
    };
  
    const deleteVideo = (id) => {
      setVideos(videos.filter((video) => video.id !== id));
    };
  
    return (
      <div>
        <h2>Videos</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <strong>{video.title}</strong> - <a href={video.url}>{video.url}</a>
              <button onClick={() => updateVideo(video.id, { title: 'Updated Title' })}>Edit</button>
              <button onClick={() => deleteVideo(video.id)}>Delete</button>
            </li>
          ))}
        </ul>
  
        <h3>Add Video</h3>
        <input
          type="text"
          placeholder="Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newVideo.url}
          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
        />
        <button onClick={addVideo}>Add</button>
      </div>
    );
  };
  
  export default Videos;
  