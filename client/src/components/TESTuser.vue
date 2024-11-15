<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="newUser.user_name" type="text" placeholder="Nombre" required />
      <input v-model="newUser.email" type="email" placeholder="Correo" required />
      <input v-model="newUser.password" type="password" placeholder="Contraseña" required />
      <input v-model="newUser.role" type="text" placeholder="Rol" required />
      <button type="submit">Registrar Usuario</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <ul>
      <li v-for="user in users" :key="user.email">
        {{ user.user_name }} ({{ user.role }})
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users_store';
import type { UsersInterfaces } from '@/models/users_model';

export default defineComponent({
  setup() {
    const usersStore = useUsersStore();

    const newUser = ref<UsersInterfaces>({
      user_name: '',
      email: '',
      password: '',
      role: '',
      _id: '', // Usamos un string vacío para inicializar
    });

    const handleSubmit = async () => {
      await usersStore.registerUser(newUser.value);
      newUser.value = { user_name: '', email: '', password: '', role: '', _id: '' }; // Limpiar formulario
    };

    onMounted(() => {
      usersStore.getUsers();
    });

    return {
      users: usersStore.user,
      error: usersStore.error,
      newUser,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
