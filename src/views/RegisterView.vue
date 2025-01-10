<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();

const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const fName = ref("");
const lName = ref("");

async function registerByEmail() {
    if (password.value === confirmPassword.value) {
        try {
            const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
            await updateProfile(user, { displayName: `${fName.value} ${lName.value}` });
            store.user = user;
            router.push("/movies");

        } catch (error) {
            alert("There was an error creating a user with email!");
        }
    } else {
        alert("Passwords do not match");
    }
}
async function registerByGoogle() {
    try {
        const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
        store.user = user;
        router.push("/movies");
    } catch (error) {
        alert("There was an error creating a user with Google!");
    }
}

</script>

<template>
    <Header />
    <form @submit.prevent="registerByEmail()">
        <div class="form-container">
        <h2>Create an Account</h2>
        <input v-model="fName" type="text" placeholder="First Name" class="input-field" required>
        <input v-model="lName" type="text" placeholder="Last Name" class="input-field" required>
        <input v-model="email" type="email" placeholder="Email" class="input-field" required>
        <input v-model="password" type="password" placeholder="Password (At least 8 characters)" class="input-field"
            required>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="input-field" required>
        <button type="submit" class="button register">Register</button>
        <button @click="registerByGoogle()" class="button register">Register by Google</button>
        </div>
    </form>

    <Footer />

</template>

<style scoped>
* {
    background-color: #141414;
    color: white;
    font-family: 'Helvetica', sans-serif;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    background-color: #333;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    padding-bottom: 20vh;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #fff;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    background-color: #444;
    border: 1px solid #555;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
}

.input-field::placeholder {
    color: #888;
}

.input-field:focus {
    outline: none;
    border-color: #e50914;
}

.button.register {
    width: 100%;
    padding: 12px;
    background-color: #e50914;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.button.register:hover {
    background-color: #f40612;
}
</style>