<template>
  <div>
    <h2>Lista de Usuarios:</h2>
    <div v-if="userStore.error">{{ userStore.error }}</div>
    <ul>
      <li v-for="user in userStore.users" :key="user.email">
        {{ user.name }} - {{ user.email }} - {{ user.role }}
      </li>
    </ul>
    <button @click="fetchUsers">Obtener Usuarios</button>
    <input type="
    ">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  setup() {
    const userStore = useUserStore()

    function fetchUsers() {
      userStore.fetchUsers()
    }

    onMounted(() => {
      fetchUsers() // Obtener usuarios al montar el componente
    })

    return { userStore, fetchUsers }
  },
})
</script>
