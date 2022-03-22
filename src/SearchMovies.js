import React, { useState } from "react";
import MovieCard from "./MovieCard";

function SearchMovies() {
  //states- input query, movies
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting...");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=27cee139bbd7e91d4cb9aac1371b17c5&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          MOVIE NAME
        </label>
        <input
          type="text"
          className="input"
          name="query"
          placeholder="i.e. The Birdcage"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
      {/* console.log(data.results[0])
      {adult: false, backdrop_path: "/2ByWxoMbfE3pxztCJn5qTJ5Ui2Y.jpg", genre_ids: [18, 35], id: 391713, original_language: "en", original_title: "Lady Bird", overview: "Lady Bird McPherson, a strong willed, deeply opinionated, artistic 17 year old comes of age in Sacramento. Her relationship with her mother and her upbringing are questioned and tested as she plans to head off to college.", popularity: 46.356, poster_path: "/iySFtKLrWvVzXzlFj7x1zalxi5G.jpg", release_date: "2017-09-08", title: "Lady Bird", video: false, vote_average: 7.3, vote_count: 6664} */}
    </>
  );
}

export default SearchMovies;
