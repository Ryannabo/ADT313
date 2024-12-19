import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../context/MovieContext';
import axios from 'axios';
import './View.css';

const View = () => {
  const { movieId } = useParams();
  const { movieList } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const navigate = useNavigate();

  const Aut = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc';

  useEffect(() => {
    const selectedMovie = movieList.find((m) => m.id === parseInt(movieId, 10));
    setMovie(selectedMovie || null);

    if (selectedMovie) {
      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.tmdbId}/credits`, {
        headers: { Authorization: Aut },
      })
        .then((response) => {
          setCast(response.data.cast);
          setCrew(response.data.crew);
        })
        .catch((error) => console.error('Error fetching cast & crew:', error));

      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.tmdbId}/images`, {
        headers: { Authorization: Aut },
      })
        .then((response) => setPhotos(response.data.backdrops))
        .catch((error) => console.error('Error fetching photos:', error));

        axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.tmdbId}/backdrops`, {
          headers: { Authorization: Aut },
        })
          .then((response) => setPhotos(response.data.backdrops))
          .catch((error) => console.error('Error fetching poster:', error));

      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.tmdbId}/videos`, {
        headers: { Authorization: Aut },
      })
        .then((response) => setVideos(response.data.results))
        .catch((error) => console.error('Error fetching videos:', error));
    }
    console.log("Selected Movie:", selectedMovie);
  }, [movieId, movieList]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="movie-details-container">
      <h1 className="movie-title">{movie.title}</h1>
      <div className="movie-info">
          <div className="movie-poster">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img
                src="/path-to-default-placeholder.png" alt="Placeholder"
              />
            )}
        </div>
        <div className="movie-overview">
          <p>{movie.overview}</p>
        </div>
      </div>

      <div className="cast-section section">
        <h2 className="section-title">Cast</h2>
        <div className="cast-list">
          {cast.slice(0, showAllCast ? cast.length : 5).map((member) => (
            <div key={member.id} className="cast-member">
              {member.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                  alt={member.name}
                />
              )}
              <div className="member-details">
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.character || 'Unknown Role'}</p>
              </div>
            </div>
          ))}
        </div>
        {cast.length > 5 && (
          <button
            onClick={() => setShowAllCast(!showAllCast)}
            className="show-more-button"
          >
            {showAllCast ? 'Hide Cast' : 'View All Cast'}
          </button>
        )}
      </div>

      <div className="crew-section section">
        <h2 className="section-title">Crew</h2>
        <div className="crew-list">
          {crew.slice(0, showAllCrew ? crew.length : 5).map((member) => (
            <div key={member.id} className="crew-member">
              {member.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                  alt={member.name}
                />
              )}
              <div className="member-details">
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.job || 'Unknown Job'}</p>
              </div>
            </div>
          ))}
        </div>
        {crew.length > 5 && (
          <button
            onClick={() => setShowAllCrew(!showAllCrew)}
            className="show-more-button"
          >
            {showAllCrew ? 'Hide Crew' : 'View All Crew'}
          </button>
        )}
      </div>

      <div className="photos-section">
        <h2>Photos</h2>
        <div className="photos-list">
          {photos.length > 0 ? (
            photos.slice(0, 5).map((photo, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                alt={`Photo ${index + 1}`}
                className="movie-photo"
              />
            ))
          ) : (
            <p>No photos available.</p>
          )}
        </div>
      </div>

      <div className="videos-section">
        <h2>Videos</h2>
        <div className="videos-list">
          {videos.length > 0 ? (
            videos.slice(0, 3).map((video) => (
              <iframe
                key={video.id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
