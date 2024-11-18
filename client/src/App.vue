<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="90" height="90" />

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink class="link-success link-underline-opacity-0" to="/">Home</RouterLink>
        <RouterLink class="link-success link-underline-opacity-0" to="/about">About</RouterLink>
        <RouterLink class="link-success link-underline-opacity-0" to="/register">Register</RouterLink>
        <!-- <RouterLink class="link-success link-underline-opacity-0" to="/users">Users</RouterLink> -->
      </nav>
    </div>
  </header>
<main>
  <RouterView />
</main>
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column; /* Apila header y main verticalmente */
  min-height: 100vh; /* La página ocupa toda la altura del viewport */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 50px;
  height: auto;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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

nav a:hover {
  text-decoration: underline;
}

nav a:first-of-type {
  border: 0;
}

main {
  flex-grow: 1; /* Ocupa el espacio restante */
  padding: 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    background-color: #344E41;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    justify-content: space-between; /* Separa el logo y el nav */
    align-items: center; /* Centra verticalmente los elementos */
    width: 100%;
    position: sticky;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
