<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import { ref, onMounted } from 'vue'; 
const show = ref(false); 
onMounted(() => 
{ 
  show.value = true; 
});
</script>


<template>
  <main>
    <Navbar/>
    <transition name="slide"> 
      <div v-if="show" class="container"> 
        <h1>Bienvenido</h1> 
        <p>Esta es tu página ideal para estudiar.</p> 
      </div> 
    </transition>
  </main>
</template>
