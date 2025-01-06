<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

import Header from '../components/Header.vue'

const route = useRoute();
const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`);
console.log(response.data);
</script>

<template>
    <div class="movie-detail">
        <h1 class="movie-title">{{ response.data.original_title }}</h1>
        <p class="movie-overview">{{ response.data.overview }}</p>
        <p class="movie-release-date">Release Date: {{ response.data.release_date }}</p>
        <a class="movie-site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
            class="movie-poster" />

        <h2 class="trailers-title">Trailers</h2>
        <div class="trailers-container">
            <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
                <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
                    <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
                        class="trailer-thumbnail" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-detail {
    background-color: #141414;
    color: white;
    padding: 20px;
    margin: 0 auto;
}

.movie-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.movie-overview {
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 1.6;
    color: #ddd;
}

.movie-release-date {
    font-size: 14px;
    color: #bbb;
    margin-bottom: 20px;
}

.movie-site {
    color: #e50914;
    font-size: 14px;
    text-decoration: none;
    margin-bottom: 30px;
    display: inline-block;
}

.movie-site:hover {
    text-decoration: underline;
}

.movie-poster {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-bottom: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.trailers-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.trailers-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.trailer-tile {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}

.trailer-thumbnail {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    border-radius: 8px;
}

.trailer-tile:hover .trailer-thumbnail {
    transform: scale(1.05);
}
</style>