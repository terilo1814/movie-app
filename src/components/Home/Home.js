import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import './Home.scss'
import { useDispatch } from 'react-redux'
import { fetchAsyncMovies, fetchAsyncSeries } from '../../features/movies/movieSlice'

const Home = () => {

  const dispatch = useDispatch()

  const movieText = 'Harry'
  const seriesText = 'Friends'

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncSeries(seriesText))
  }, [dispatch])


  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  )

}
export default Home