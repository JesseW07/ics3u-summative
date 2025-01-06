<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();
const response = ref(null);

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

onMounted(async () => {
    response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`);

    shuffle(response.value.data.results)
})

</script>

<template>
    <div class=featured-container v-if="response">
        <div class="movie-section">
            <h1>Now Playing</h1>
            <div class="movie-list">
                <div v-for="movie in response.data.results.slice(0, 3)" :key="movie.id" class="movie-card">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster"
                        class="movie-poster" />
                    <p class="movie-title">{{ movie.title }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.movie-section {
    text-align: center;
    color: #ffffff;
    background-color: #070707;
    padding-bottom: 80px;
    padding-top: 50px;
}

.movie-list {
    display: flex;
    gap: 50px;
    justify-content: center;
}

.movie-card {
    cursor: pointer;
    text-align: center;
}

.movie-poster {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    transition: transform 0.3 ease;
}

.movie-poster:hover {
    transform: scale(1.05);
    opacity: 0.85;
}

.movie-title {
    font-size: 1rem;
    margin-top: 30px;
}
</style>
