<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter();
const password = ref('');

const loginByEmail = async () => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};

</script>

<template>
  <Header />
  <form @submit.prevent="loginByEmail()">
    <div class="form-container">
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" class="input-field" required>
      <input v-model:="password" type="password" placeholder="Password" class="input-field" required />
      <button type="submit" class="button register">Login</button>
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
  padding-bottom: 40vh
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
}

.button.register:hover {
  background-color: #f40612;
}
</style>