<template>
  <div>
    <h2>Registrar Usuario</h2>
    <form @submit.prevent="registerUser">
      <input v-model="name" placeholder="Nombre" required />
      <input v-model="email" placeholder="Correo" required type="email" />
      <input v-model="password" placeholder="Contraseña" required type="password" />
      <select v-model="role">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="master">Master</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  setup() {
    const userStore = useUserStore()

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('student')

    function registerUser() {
      userStore.registerUser({
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
      })
    }

    return { name, email, password, role, registerUser }
  },
})
</script>
