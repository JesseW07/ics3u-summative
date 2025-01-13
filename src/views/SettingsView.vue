<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import { useStore } from '../store';
import { ref } from 'vue';

const store = useStore();

const email = ref(store.user.email);
const fName = ref(store.user.displayName.split(" ")[0]);
const lName = ref(store.user.displayName.split(" ")[1]);
const password = ref(store.user.password);


function changeSettings() {
    store.user.displayName = `${fName.value} ${lName.value}`;
    store.user.password = password.value
}
</script>

<template>
    <Header />
    <form @submit.prevent="changeSettings()">
        <div class="form-container">
            <h2>Change Settings</h2>
            <input v-model="email" type="email" :placeholder=email class="input-field" readonly>
            <input v-model="fName" type="text" :placeholder=fName class="input-field" required>
            <input v-model="lName" type="text" :placeholder=lName class="input-field" required>
            <input v-model="password" type="text" :placeholder="password" class="input-field" required>
            <button class="submit" type="submit">Save</button>
        </div>
    </form>
    <Footer />
</template>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #1a1a1a;
    margin-bottom: 20vh;
}

h2 {
    text-align: center;
    color: #e50914;
    margin-bottom: 20px;
    font-size: 24px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #333;
    color: white;
}

.input-field:focus {
    border-color: #e50914;
    outline: none;
}

.submit {
    padding: 12px 20px;
    border: none;
    background-color: #e50914;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.submit:hover {
    background-color: #e50914;
}

.submit:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}
</style>