import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
    name: "",
    url:"",
    characterName:"",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(undefined);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [cast, setCast] = useState([]);
  

  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setSearchedMovieList([]);

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`, {
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found matching your search");
        } else {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      })
      .catch(() => {
        setError("Unable to search movies at this time. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

 // Fetch Photos
const fetchPhotos = (movieId) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?language=en-US`, {
    headers: {
      Accept: "application/json",
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',
    },
  })
  .then(response => {
    if (response.data && response.data.backdrops) {
      setPhotos(response.data.backdrops);
    } else {
      setError("No photos available.");
    }
  })
  .catch(() => {
    setError("Unable to load photos. Please try again later.");
  });
};

// Modify handleSelectMovie to include fetching photos
const handleSelectMovie = (movie,cast) => {
  setSelectedMovie(movie,cast);
  setFormData({
    title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
  });
  setError("");
  // Fetch Photos
  fetchPhotos(movie.id);
};

  // for searching movie
  useEffect(() => {
    if (selectedMovie) {
      // Fetch Cast
      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US`, {
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc', // Replace with your actual API key
        },
      })
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(() => {
        setError("Unable to load cast information. Please try again later.");
      });
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (selectedMovie) {
      // Fetch Images (Backdrops and Posters)
      axios
        .get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/images`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc", 
          },
        })
        .then((response) => {
          const { backdrops = [], posters = [] } = response.data; 
          const combinedPhotos = [...backdrops, ...posters]; 
          setPhotos(combinedPhotos);
  
          // Ensure only valid file paths are added
          const validBackdrops = backdrops.filter((img) => img.file_path);
          setPhotos(validBackdrops); 
        })
        .catch(() => {
          setError("Unable to load movie images. Please try again later.");
        });
    }
  }, [selectedMovie]); 
  
  useEffect(() => {
    if (selectedMovie) {
      // Fetch Videos
      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?language=en-US`, {
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc', 
        },
      })
      .then(response => {
        setVideos(response.data.results); 
      })
      .catch(() => {
        setError("Unable to load videos. Please try again later.");
      });
    }
  }, [selectedMovie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
      handleSearch();
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title) errors.push("Title is required");
    if (!formData.overview) errors.push("Overview is required");
    if (!formData.releaseDate) errors.push("Release date is required");
    if (!formData.popularity) errors.push("Popularity is required");
    if (!formData.voteAverage) errors.push("Vote average is required");
    if (!selectedMovie) errors.push("Please select a movie from search results");
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsLoading(true);
    setError("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You must be logged in to perform this action");
      setIsLoading(false);
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    try {

      const handleAddVideo = async (movieId2) => {
        console.log(movieId2);
        console.log(movieId);
    
        // If no videos are found, proceed with empty fields in videoData
    
        const accessToken = localStorage.getItem("accessToken");
        const videoData = {
          movieId: movieId ? movieId : movieId2, 
          url: selectedVideo?.key
            ? `https://www.youtube.com/embed/${selectedVideo.key}`
            : "https://www.youtube.com/embed/not_available", 
          name: selectedVideo?.name || "No video selected", 
          site: selectedVideo?.site || "YouTube", 
          videoKey: selectedVideo?.key || "not_available", 
          videoType: selectedVideo?.type || "placeholder", 
          official: selectedVideo?.official || false, 
        };
    
        console.log(videoData);
    
        try {
          const response = await axios({
            method: movieId ? "patch" : "post",
            url: movieId ? `/videos/${movieId}` : "/videos",
            data: videoData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("Video added successfully:", response.data);
          alert("Video added successfully!");
          return true; 
        } catch (error) {
          console.error("Error adding video:", error);
          alert("Failed to add video. Please try again.");
          return false; 
        }
      };
      
      const handleAddPhotos = async (movieId2) => {
        const accessToken = localStorage.getItem("accessToken");
      
        if (!selectedPhoto || !selectedPhoto.file_path) {
          alert("Please select a valid photo to add.");
          return false; // Exit early on invalid input
        }
      
        // Prepare data to be sent to the backend
        const photoData = {
          movieId: movieId || movieId2,
          url: selectedPhoto.file_path, 
          description: description || "No description provided", 
        };
      
        // Determine the URL endpoint and HTTP method
        const url = movieId ? `/photos/${movieId}` : "/photos";
        const method = movieId ? "patch" : "post";
      
        try {
          // Send the HTTP request to add or update a photo
          const response = await axios({
            method,
            url,
            data: photoData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      
          console.log("Photo added successfully:", response.data);
          alert("Photo added successfully!");
          return true; // Indicate success
        } catch (error) {
          console.error("Error adding photo:", error);
      
          // Handle errors with appropriate messages
          if (error.response) {
            alert(
              `Failed to add photo. Server responded with: ${
                error.response.data.message || error.response.status
              }`
            );
          } else if (error.request) {
            alert("Failed to add photo. No response from the server.");
          } else {
            alert(`An error occurred: ${error.message}`);
          }
          return false; // Indicate failure
        }
      };
      
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newMovieId = movieId || response.data.id; 
      
      console.log("Movie saved successfully:", response.data);
      alert("Movie saved successfully!");

      // Proceed to add the video
      const isVideoAdded = await handleAddVideo(newMovieId); 
      if (!isVideoAdded) {
        alert("Video could not be added. Please try again.");
        return;
      }
      const isPhotoAdded = await handleAddPhotos(newMovieId);
      if (!isPhotoAdded) {
        alert("Photo could not be added. Please try again.");
        return;
      }
      navigate("/main/movies");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unable to save the movie. Please try again later.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = handleSave;

  useEffect(() => {
    if (movieId) {
      setIsLoading(true);
      setError("");
  
      // Fetch Movie Details
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          const movieData = response.data;
          setSelectedMovie({
            id: movieData.tmdbId,
            original_title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            poster_path: movieData.posterPath.replace("https://image.tmdb.org/t/p/original/", ""),
            release_date: movieData.releaseDate,
            vote_average: movieData.voteAverage,
            backdrop_path: movieData.backdropPath.replace("https://image.tmdb.org/t/p/original/",""),
            cast: movieData.name,
          });
          setFormData({
            title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            releaseDate: movieData.releaseDate,
            voteAverage: movieData.voteAverage,
            cast: movieData.name,
          });

          // Fetch Videos
          return axios.get(`https://api.themoviedb.org/3/movie/${movieData.tmdbId}/videos?language=en-US`, {
            headers: {
              Accept: "application/json",
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc', // Replace with actual API key
            },
          });
        })
        .then(response => {
          setVideos(response.data.results);  // Set the videos data
        })
        .catch(() => {
          setError("Unable to load movie details or related information. Please try again later.");
        });

        
      // Fetch Cast Information for list in admin
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',  // Replace with actual API key
        },
      })
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(() => {
        setError("Unable to load cast information. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [movieId]);
  

  return (
    <>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>

      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter movie title..."
              disabled={isLoading}
            />
            <button className="search-button"
              type="button"
              onClick={() => {
                setCurrentPage(1);
                handleSearch();
              }}
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={selectedMovie?.id === movie.id ? "selected" : ""}
                >
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
             <div className="pagination">
             <button
               className="pagination-button"
               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
               disabled={currentPage === 1 || isLoading}
             >
               Previous
             </button>
             <span>
               Page {currentPage} of {totalPages}
             </span>
             <button
               className="pagination-button"
               onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
               disabled={currentPage === totalPages || isLoading}
             >
               Next
             </button>
           </div>

            )}
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
        {selectedMovie && (
        <div className="movie-details">
          <img
            className="poster-image"
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt={formData.title}
        />
    <div className="form-fields">
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          disabled={isLoading}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="overview">Overview:</label>
        <textarea
          className="overview"
          rows={10}
          name="overview"
          id="overview"
          value={formData.overview}
          onChange={handleInputChange}
          disabled={isLoading}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="popularity">Popularity:</label>
        <input
          type="number"
          name="popularity"
          id="popularity"
          value={formData.popularity}
          onChange={handleInputChange}
          disabled={isLoading}
          step="0.1"
        />
      </div>
      <div className="field">
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
          disabled={isLoading}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="voteAverage">Vote Average:</label>
        <input
          type="number"
          name="voteAverage"
          id="voteAverage"
          value={formData.voteAverage}
          onChange={handleInputChange}
          disabled={isLoading}
          step="0.1"
        />
      </div>
    </div>
  </div>
)}

          {selectedMovie && (
  <>

<h2>Videos</h2>

<div className="videosMainCont">
  {videos && videos.length > 0 ? (
    videos.map((video) => (
      <div className="videosCont" key={video.id}>
        <p>{video.name}</p>
        <div className="videolist">
          <div className="video-preview">
            {/* Assuming the video.key is the unique identifier for a YouTube video */}
            <iframe
              width="280"
              height="158"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button
            onClick={() => {
              setSelectedVideo(video);
              alert("Successfully selected a video!");
            }}
          >
            Select Video
          </button>
        </div>

        {/* <div>
          <button type="button" onClick={handleAddVideo}>
            Add Video
          </button>
        </div> */}
      </div>
    ))
  ) : (
    <p>No videos found</p>
  )}
</div>

          <h2>Cast</h2>
          <div className="cast">
        {cast.length > 0 ? (
        cast.map(member => (
          <div key={member.id} className="cast-item">
            <h3>{member.name}</h3>
            <p>Character: {member.character}</p>
            {member.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                alt={member.name}
              />
            )}
          </div>
        ))
      ) : (
        <p>No cast information available.</p>
      )}

            </div>
            <div className="movie-photos">
              <h3>Photos:</h3>
              <div className="photo-grid">
                {photos.length > 0 ? (
                  photos.map((photo) => (
                    <img
                      key={photo.file_path}
                      src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                      alt="Movie Photo"
                      className="movie-photo"
                    />
                  ))
                ) : (
                  <p>No photos available.</p>
                )}
              </div>
            </div>
              </>
            )}
          <div className="button-container">
            <button className="btn btn-save"
              type="button"
              onClick={movieId ? handleUpdate : handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="cancel"
              type="button"
              onClick={() => navigate("/main/movies")}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;