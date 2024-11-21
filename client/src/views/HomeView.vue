<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import { ref, onMounted } from 'vue'; 
const show = ref(false); 
// Inicialmente está oculto 
onMounted(() => 
{ 
  show.value = true; 
});
</script>

<template>
<header>
  <Navbar/>
</header>
  <main>

    <div id="Mostrar tituo"></div>
    <transition name="slide"> 
      <div v-if="show" class="container"> 
        <h1>Bienvenido</h1> 
        <p>Esta es tu página ideal para estudiar</p> 
      </div> 
    </transition>
  </main>
</template>


<style>
/* Transition */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%); 
  opacity: 0; 
}

.slide-enter-to {
  transform: translateX(0); 
  opacity: 1; 
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
