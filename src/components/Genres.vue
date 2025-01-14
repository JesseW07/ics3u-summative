<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';

const store = useStore();
const props = defineProps(["genres"]);
const router = useRouter();
const selectedGenre = ref(28);
const response = ref(null);

const addToCart = (movie) => {
  store.cart.set(movie.id, { title: movie.title, url: movie.poster_path });
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}

async function getMovieByGenre() {
    response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
    router.push(`/movies/${id}`)
}

onMounted(() => {
    getMovieByGenre();
})
</script>

<template>
    <div class="movie-gallery">
        <select v-model="selectedGenre" @change="getMovieByGenre()">
            <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
        </select>
        <div v-if="response" class="movie-list">
            <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster"
                    class="movie-poster" @click="getMovieDetails(movie.id)"/>
                <p class="movie-title" @click="getMovieDetails">{{ movie.title }}</p>
                <button class = "movie-site-added" v-if="store.cart.has(movie.id)">added</button>
                <button v-if="!store.cart.has(movie.id)"@click="addToCart(movie)"
                class="movie-site">buy</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-gallery {
    background-color: #141414;
    color: white;
    padding: 20px;
    min-height: 100vh;
}

.genre-select {
    padding: 10px;
    background-color: #333;
    color: white;
    border: 1px solid #555;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 20px;
    width: 100%;
}

select {
    padding: 10px;
    border: 2px;
    margin: 10px, 0;
    margin-bottom: 20px;
    border-radius: 5px;
    width: 100%;
}


.movie-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}

.movie-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    padding: 15px;
}

.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
}

.movie-poster {
    width: 100%;
    height: auto;
}

.movie-title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    color: #fff;
}
.movie-site {
    padding: 8px 15px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    padding-left:80px;
    padding-right:80px;
}

.movie-site:hover {
    background-color: #c4000a;
    transform: scale(1.05);
}

.movie-site:active {
    transform: scale(0.95);
}
.movie-site-added {
    padding: 8px 15px;
    background-color: #972b31;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    padding-left:80px;
    padding-right:80px;
}

</style>