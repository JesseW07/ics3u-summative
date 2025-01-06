<script setup>
import Genres from "../components/Genres.vue"
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue'
import { useStore } from '../store';

const store = useStore()
const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 35,
    genreName: "Comedy"
  },
  {
    id: 878,
    genreName: "Sci-Fi"
  },
  {
    id: 53,
    genreName: "Thriller"
  },
  {
    id: 16,
    genreName: "Animation"
  },
]

</script>

<template>
  <Header />
  <Genres :genres="genresList" />
  <Footer />

</template>

<style scoped></style>