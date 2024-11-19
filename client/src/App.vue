<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <header>
    <!-- <nav>
      <RouterLink class="link-success link-underline-opacity-0" to="/">Home</RouterLink>
      <RouterLink class="link-success link-underline-opacity-0" to="/about">About</RouterLink>
      <RouterLink class="link-success link-underline-opacity-0" to="/register">Register</RouterLink>
      <RouterLink class="link-success link-underline-opacity-0" to="/users">Users</RouterLink>
    </nav> -->
  </header>
   <main>
    <div id="Mostrar titulo"></div>
    <RouterView />

    
   </main>
   
</template>
<style scoped>

body {
  background-color: #344E41;
}


header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

/* Clases de transición */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%); /* Posición inicial: Fuera de la pantalla a la izquierda */
  opacity: 0; /* Invisible inicialmente */
}

.slide-enter-to {
  transform: translateX(0); /* Posición final: En su lugar */
  opacity: 1; /* Completamente visible */
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


.container {
  text-align: left;
  font-family: Arial, sans-serif;
  margin-right: 500px;
  font-size: 3rem;
  width: 900px;
}




</style>