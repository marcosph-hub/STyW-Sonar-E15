<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" v-model="email" required />
        
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
        
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "Usuario-login",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        alert(`Iniciando sesión con: ${this.email}`);
        // Implementar lógica de autenticación aquí
      },
    },
  };
  </script>
  
  
  