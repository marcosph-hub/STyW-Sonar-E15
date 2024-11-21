<template>
    <header class="menu-bar">
      <div class="menu-container">
        <nav class="menu"> 
            <ul> 
                <li><img src="./../../Study_Method.ico" alt="Method Study Logo" class="logo" /></li>
            <li><h1 class="logo">Method Study</h1></li>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/about">Acerca de </router-link></li>
            <li><a href="#contacto">Contacto</a></li> 
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
  
  
  