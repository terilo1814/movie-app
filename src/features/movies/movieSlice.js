import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/movieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
        const movieText = 'Harry'
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
        return response.data
    }
)

export const fetchAsyncSeries = createAsyncThunk(
    "movies/fetchAsyncSeries",
    async () => {
        const seriesText = 'Friends'
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
        return response.data
    }
)

export const fetchAsyncMovieorSeriesDetail = createAsyncThunk(
    "movies/fetchAsyncMovieorSeriesDetail",
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    }
)

const initialState = {
    movies: {},
    series: {},
    selectMovieorSeries: {},
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieorSeries= {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, () => {
                console.log('pending');
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                console.log('fulfilled');
                state.movies = payload;
            })
            .addCase(fetchAsyncMovies.rejected, () => {
                console.log('rejected');
            })


            .addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
                console.log('fulfilled')
                state.series = payload
            })


            .addCase(fetchAsyncMovieorSeriesDetail.fulfilled, (state, { payload }) => {
                console.log('fulfilled')
                state.selectMovieorSeries = payload
            })
    },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies; // name of the slice + array of movies
export const getAllSeries = (state) => state.movies.series;
export const getSelectedMovieorSeries = (state) => state.movies.selectMovieorSeries;
export default movieSlice.reducer;
