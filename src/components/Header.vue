<script setup>
import { useStore } from '../store';

const store = useStore();

function resetPinia() {
    store.fName = null;
    store.lName = null;
    store.email = null;
    store.password = null;
}

</script>

<template>
    <div class="topbar">
        <h2>NETFLEX</h2>
        <ul>
            <div v-if=!store.email>
                <RouterLink to="/register"><button>Register</button></RouterLink>
                <RouterLink to="/login"><button>Login</button></RouterLink>
            </div>
            <div v-if=store.email>
                <RouterLink to="/movies"><button>{{ `Hello ${store.fName}!` }} (movies)</button></RouterLink>
                <RouterLink to="/cart"><button>Cart</button></RouterLink>
                <RouterLink to="/settings"><button>Settings</button></RouterLink>
                <RouterLink to="/"><button @click = "resetPinia()">Logout</button></RouterLink>
            </div>
        </ul>
    </div>
</template>

<style scoped>
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #070707;
    height: 5vh;
}

.topbar h2 {
    font-size: 28px;
    color: #e50914;
}

.topbar ul {
    display: flex;
}

.topbar button {
    padding: 8px 15px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
    margin-right: 10px;
}

button:hover {
    background-color: #c4000a;
}
</style>
