<script setup>
import { useStore } from '../store';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const store = useStore();

function checkOut() {
    if (store.cart.size > 0) {
        store.cart.clear();
        localStorage.removeItem(`cart_${store.user.email}`);
        alert("Thank you for your purchase!");
    } else {
        alert("Nothing to buy :c");
    }
}


const removeFromCart = (key) => {
    store.cart.delete(key);
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}

</script>

<template>
    <Header />
    <div class="cart">
        <h1>Shopping Cart</h1>
        <button class="buttons" @click="checkOut()">checkout</button>
        <div class="item" v-for="([key, value]) in store.cart">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <h1>{{ value.title }}</h1>
            <button @click="removeFromCart(key)">Remove</button>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
.cart {
    padding: 20px;
    background-color: #141414;
    color: white;
    min-height: 100vh;
    font-family: Arial, sans-serif;
}

.cart h1 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #e50914;
    text-align: center;
    text-transform: uppercase;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #222;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.item img {
    height: 40vh;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 20px;
}

.item h1 {
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #fff;
}

.item button {
    padding: 8px 15px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

}

.buttons {
    padding: 20px 150px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    justify-self: center;
    margin-bottom: 30px;
}

.buttons:hover {
    background-color: #c4000a;
    transform: scale(1.1);
}

.buttons:active {
    transform: scale(0.95);
}

.item button:hover {
    background-color: #c4000a;
    transform: scale(1.1);
}

.item button:active {
    transform: scale(0.95);
}
</style>