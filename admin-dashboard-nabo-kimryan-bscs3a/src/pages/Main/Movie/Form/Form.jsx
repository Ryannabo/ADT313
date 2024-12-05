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
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cast, setCast] = useState({
    
  });
  const [newCastMember, setNewCastMember] = useState({ name: "", character: "", profile_path: "" });
  const [editingCastMember, setEditingCastMember] = useState(null);

  const { movieId } = useParams();
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

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
    setError("");

      // Fetch photos (backdrops)
      axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}/images`, {
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',
        },
      })
      .then((response) => {
        setPhotos(response.data.photos)
      })
      .catch(() => {
        setError("Unable to load photos. Please try again later.");
      });


    // Fetch Videos
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
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

    // Fetch Cast
    axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US`, {
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',
      },
    })
    .then(response => {
      if (response.data && response.data.cast) {
        setCast(response.data.cast);
      } else {
        setError("No cast information available.");
      }
    })
    .catch(() => {
      setError("Unable to load cast information. Please try again later.");
    });
  };

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
      await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/main/movies");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unable to save the movie. Please try again later.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCastMember = async (newMember) => {
    try {
      const response = await axios.post(`/movies/${selectedMovie.id}/cast`, newMember, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc`,
        },
      });
      setCast((prevCast) => [...prevCast, response.data]);
    } catch (error) {
      setError("Unable to add cast member. Please try again later.");
    }
  };

  const handleUpdateCastMember = async () => {
    if (editingCastMember) {
      const updatedMember = {
        id: editingCastMember.id,
        name: newCastMember.name,
        character: newCastMember.character,
        profile_path: newCastMember.profile_path,
      };
      // Proceed with the update logic
    }
  };

  const handleDeleteCastMember = async (memberId) => {
    if (!selectedMovie || !memberId) {
      setError("Invalid movie or cast member ID.");
      return;
    }
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You must be logged in to perform this action.");
        return;
      }
  
      // Attempt to delete the cast member
      await axios.delete(`/movies/${selectedMovie.id}/cast/${memberId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc`,
        },
      });
  
      // Update the cast state to remove the deleted member
      setCast((prevCast) => prevCast.filter(member => member.id !== memberId));
    } catch (error) {
      // Log the full error response for debugging
      console.error("Error deleting cast member:", error.response ? error.response.data : error);
      
      // Set a user-friendly error message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Unable to delete cast member. Please try again later.");
      }
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
          });
          setFormData({
            title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            releaseDate: movieData.releaseDate,
            voteAverage: movieData.voteAverage,
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
  
      // Fetch Cast Information
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc',  // Replace with actual API key
        },
      })
      .then(response => {
        setCast(response.data.cast);  // Set the cast data
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
    <div className="videos">
      {videos.length > 0 ? (
        videos.map(video => (
          <div key={video.id} className="video-item">
            <h3>{video.name}</h3>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </div>

    <h2>Cast</h2>
    <div className="cast">
  <h2>Cast</h2>
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
      <button onClick={() => {
        setEditingCastMember(member);
        setNewCastMember({ name: member.name, character: member.character, profile_path: member.profile_path });
      }}>Edit</button>
      <button onClick={() => handleDeleteCastMember(member.id)}>Delete</button> {/* Pass member.id here */}
    </div>
  ))
) : (
  <p>No cast information available.</p>
)}

  <h3>{editingCastMember ? "Edit Cast Member" : "Add Cast Member"}</h3>
  <form onSubmit={(e) => {
    e.preventDefault();
    if (editingCastMember) {
      handleUpdateCastMember({ ...editingCastMember, ...newCastMember });
      setEditingCastMember(null);
    } else {
      handleAddCastMember(newCastMember);
    }
    setNewCastMember({ name: "", character: "", profile_path: "" });
  }}>
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={newCastMember.name}
        onChange={(e) => setNewCastMember({ ...newCastMember, name: e.target.value })}
        required
      />
    </div>
    <div>
      <label>Character:</label>
      <input
        type="text"
        value={newCastMember.character}
        onChange={(e) => setNewCastMember({ ...newCastMember, character: e.target.value })}
        required
      />
    </div>
    <div>
      <label>Profile Path:</label>
      <input
        type="text"
        value={newCastMember.profile_path}
        onChange={(e) => setNewCastMember({ ...newCastMember, profile_path: e.target.value })}
      />
    </div>
    <button type="submit">{editingCastMember ? "Update" : "Add"}</button>
  </form>
</div>
    <div className="movie-photos">
                <h3>Photos:</h3>
                <div className="photo-grid">
                {photos?.length > 0 ? (
                  photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original/${photo.backdrop_path}`}
                      alt={photo.title}
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