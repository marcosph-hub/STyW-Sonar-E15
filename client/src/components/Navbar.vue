<template>
    <header class="menu-bar">
      <div class="menu-container">
        <nav class="menu"> 
            <ul> 
                <li><img src="./../../public/Study_Method.ico" alt="Method Study Logo" class="logo" /></li>
            <li><h1 class="logo">Method Study</h1></li>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/about">Acerca de </router-link></li>
            <li><a href="#contacto">Contacto</a></li> 
            <div class="auth-buttons">
            <ul>
              <!-- Si el usuario está autenticado -->
              <li v-if="auth.isAuthenticated">
                <h2>Bienvenido, {{ auth.name }}</h2>
              </li>
              <li v-else>
                <button @click="handleLogin">Iniciar Sesión</button>
              </li>
              <li v-if="auth.isAuthenticated">
                <button @click="handleLogout">Cerrar Sesión</button>
              </li>
              <!-- Si el usuario no está autenticado -->
              <li v-else>
                <button @click="handleRegister">Registrarse</button>
              </li>
            </ul>
          </div>
        </ul>
        </nav>

      </div>
    </header>
  </template>
 <script lang="ts">
 import { defineComponent } from "vue";
 import { useAuthStore } from "@/stores/authstore"; // Tu store de autenticación
 import { useRouter } from "vue-router";
 
 export default defineComponent({
   name: "Navbar",
   setup() {
     const auth = useAuthStore(); // Accede al store de autenticación
     const router = useRouter(); // Router para navegar entre vistas
 
 
     const handleLogin = () => {
       router.push("/login"); // Redirige a la página de inicio de sesión
     };
 
 
     const handleRegister = () => {
       router.push("/register"); // Redirige a la página de registro
     };
 
 
     const handleLogout = async () => {
       await auth.logout(); // Cierra sesión a través del store
       router.push("/"); // Redirige al inicio después de cerrar sesión
     };
 
 
     return {
       auth, // Acceso al estado reactivo del store
       handleLogin,
       handleRegister,
       handleLogout,
     };
   },
 });
 </script>
 
  
  <style scoped>
  .menu-bar {
    background-color: #150799;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  
  .menu-container {
    display: sticky;
    justify-content: space-between;
    align-items: center;
  }
  
  .menu ul {
    list-style: none;
    margin: 0;
    padding: 10;
    display: flex;
  }
  
  .logo{
    height: 30px;
    margin-top: 0px;
  }

  .menu ul li h1{
    margin-top: -6px;
  }
  .menu ul li {
    margin-left: 50px;
    margin-top: 5px;
  }  
  .menu ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .menu ul li a:hover {
    color: #ff6600;
    margin-top: 5px;
  }

  .auth-buttons button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.auth-buttons{
    margin-left: 100px;
}

.auth-buttons button:hover {
  background-color: #e05500;
}

  </style>
  
  
  