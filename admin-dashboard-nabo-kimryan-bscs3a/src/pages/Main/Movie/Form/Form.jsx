import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (page = 1) => {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`,
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
        },
      })
        .then((response) => {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
          setCurrentPage(page);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    },
    [query]
  );

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (selectedMovie === undefined) {
      alert('Please search and select a movie.');
    } else {
      const data = {
        tmdbId: selectedMovie.id,
        title: selectedMovie.title || selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      const method = movieId ? 'patch' : 'post';
      const url = movieId ? `/movies/${movieId}` : '/movies';

      const request= axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert('Success');
          navigate('/main/movies');
        })
        .catch((error) => {
          console.log(error)
          alert(error)
        });
    }
  };

  const handleInputChange = (e, field) => {
    setSelectedMovie({
      ...selectedMovie,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
        console.log(response.data);

      });
    }
  }, [movieId]);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1);
    }
  };

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{' '}
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => handleSearch(1)}>
              Search
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>

            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form>
          {selectedMovie && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt="Movie Poster"
            />
          )}
          <div className="field">
            Title:
            <input
              type="text"
              value={selectedMovie ? selectedMovie.original_title : ''}
              onChange={(e) => handleInputChange(e, 'original_title')}
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
              onChange={(e) => handleInputChange(e, 'overview')}
            />
          </div>
          <div className="field">
            Popularity:
            <input
              type="text"
              value={selectedMovie ? selectedMovie.popularity : ''}
              onChange={(e) => handleInputChange(e, 'popularity')}
            />
          </div>
          <div className="field">
            Release Date:
            <input
              type="text"
              value={selectedMovie ? selectedMovie.release_date : ''}
              onChange={(e) => handleInputChange(e, 'release_date')}
            />
          </div>
          <div className="field">
            Vote Average:
            <input
              type="text"
              value={selectedMovie ? selectedMovie.vote_average : ''}
              onChange={(e) => handleInputChange(e, 'vote_average')}
            />
          </div>

          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;


