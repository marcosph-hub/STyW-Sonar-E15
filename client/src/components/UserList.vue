<template>
  <div>
    <!-- Botón para mostrar la lista de usuarios -->
    <button @click="mostrarLista">Obtener Usuarios</button>

    <!-- Mostrar la lista solo si `mostrarUsuarios` es verdadero -->
    <div v-if="mostrarUsuarios">
      <h2>Lista de Usuarios:</h2>
        <li v-for="user in userStore.user" :key="user.email">
          {{ user.user_name }} - {{ user.email }} - {{ user.role }}
        </li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUsersStore } from '@/stores/users_store';

export default defineComponent({
  setup() {
    const userStore = useUsersStore();
    const mostrarUsuarios = ref(false); // Controla si se muestra la lista

    // Función para mostrar la lista y obtener los usuarios
    async function mostrarLista() {
      mostrarUsuarios.value = true; // Cambiar a true para mostrar la lista
      await userStore.getUsers(); // Llamar a la acción del store para obtener usuarios
    }

    return { userStore, mostrarUsuarios, mostrarLista };
  },
});
</script>


