import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieGenres = ({ movieId }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerToken = "your_bearer_token";

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzI0NGJiNGQ0YzE3N2E5ZmJlZTVjMzllMmRmMjk1OCIsIm5iZiI6MTczMzI5NzU5Mi40MDksInN1YiI6IjY3NTAwNWI4MzU1ZGJjMGIxNWQ3YTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7tYsdAfG9aER__syoCcKyJlPd7O5yMRyv4GOVfajKLc",
      },
    })
      .then((response) => {
        setGenres(response.data.genres);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data from TMDb API");
        setLoading(false);
      });
  }, [movieId, bearerToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Join genres with commas, and use the `join()` method to handle commas
  const genreList = genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <h3>Genres:</h3>
      <p>{genreList}</p>
    </div>
  );
};

export default MovieGenres;
