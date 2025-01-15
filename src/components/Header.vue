<script setup>
import { useStore } from '../store';
import { signOut } from 'firebase/auth';

const store = useStore();


const logout = () => {
  store.user = null;
  signOut(auth);
  router.push(`/`);
}


</script>

<template>
    <div class="topbar">
        <h2>NETFLEX</h2>
        <ul>
            <div v-if=!store.user>
                <RouterLink to="/register"><button>Register</button></RouterLink>
                <RouterLink to="/login"><button>Login</button></RouterLink>
            </div>
            <div v-if=store.user>
                <RouterLink to="/movies"><button>{{ `Hello ${store.user.displayName}!` }} (Movies)</button></RouterLink>
                <RouterLink to="/cart"><button>Cart</button></RouterLink>
                <RouterLink to="/settings"><button>Settings</button></RouterLink>
                <RouterLink to="/"><button @click = "logout()">Logout</button></RouterLink>
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
