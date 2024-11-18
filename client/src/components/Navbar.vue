<template>
    <header class="menu-bar">
      <div class="menu-container">
        <nav class="menu"> 
            <ul> 
            <li><h1 class="logo">Method Study</h1></li>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/about">Acerca de </router-link></li>
            <li><a href="#contacto">Contacto</a></li> 
            <li><img src="./../../public/Study_Method.ico" alt="Method Study Logo" class="logo" /></li>
            <div class="auth-buttons"> 
                <ul>                
                    <li><button @click="handleLogin">Iniciar Sesión</button> </li>
                    <li><button @click="handleRegister">Registrarse</button></li> 
                </ul>
        </div>
        </ul>
        </nav>

      </div>
    </header>
  </template>
  <script lang="ts">

  export default {
    name: "NavBar",
    methods:{
        handleLogin() {
      // Aquí puedes redirigir al formulario de inicio de sesión
      this.$router.push("/login");
    },
    handleRegister() {
      // Aquí puedes redirigir al formulario de registro
      this.$router.push("/register");
    }
    }
  };
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
    height: 40px;
  }

  .menu ul li {
    margin-left: 100px;
  }
  
  .menu ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .menu ul li a:hover {
    color: #ff6600;
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

.auth-buttons button:hover {
  background-color: #e05500;
}

  </style>
  
  
  