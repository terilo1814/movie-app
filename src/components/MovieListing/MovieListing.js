import React from 'react'
import './MovieListing.scss'
import { useSelector } from 'react-redux'
import { getAllMovies, getAllSeries } from '../../features/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import Slider from "react-slick";
import { Settings } from '../../common/settings'

const MovieListing = () => {

  const movies = useSelector(getAllMovies)
  const series = useSelector(getAllSeries)

  let renderMovies, renderSeries = ''

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderSeries =
    series.Response === 'True' ? (
      series.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    )


  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderMovies}</Slider></div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderSeries}</Slider></div>
      </div>
    </div>
  )
}

export default MovieListing