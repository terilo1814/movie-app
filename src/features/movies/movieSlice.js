import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/movieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (term) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
        return response.data
    }
)

export const fetchAsyncSeries = createAsyncThunk(
    "movies/fetchAsyncSeries",
    async (term) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
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
    isLoading: false,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieorSeries = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.movies = payload;
            })
            .addCase(fetchAsyncMovies.rejected, (state) => {
                state.isLoading = false;
            })


            .addCase(fetchAsyncSeries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.series = payload;
            })
            .addCase(fetchAsyncSeries.rejected, (state) => {
                state.isLoading = false;
            })


            .addCase(fetchAsyncMovieorSeriesDetail.fulfilled, (state, { payload }) => {
                state.selectMovieorSeries = payload;
            });
    },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies; // name of the slice + array of movies
export const getAllSeries = (state) => state.movies.series;
export const getSelectedMovieorSeries = (state) => state.movies.selectMovieorSeries;
export default movieSlice.reducer;
