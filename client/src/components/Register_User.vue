<template>

  <main class="main-container">
    <div class="container mt-5">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form @submit.prevent="registerUser" class="card p-4 shadow">
        <!-- Name -->
        <div class="form-group mb-3">
          <label for="name" class="form-label">Name:</label>
          <input 
            id="name" 
            v-model="userForm.name" 
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errores.name }"
            placeholder="Enter your name" 
            />
          <div class="invalid-feedback">{{ errores.name }}</div>
        </div>
        <!-- Password -->
        <div class="form-group mb-3">
          <label for="password" class="form-label">Password:</label>
          <input 
            id="password"
            v-model="userForm.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errores.password }"
            placeholder="Enter a secure password"
          />
          <div class="invalid-feedback">{{ errores.password }}</div>
        </div>
        <!-- Email -->
        <div class="form-group mb-3">
          <label for="email" class="form-label">Email:</label>
          <input 
            id="email"
            v-model="userForm.email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errores.email }"
            placeholder="Enter your email" 
          />
          <div class="invalid-feedback">{{ errores.email }}</div>
        </div>

        <!-- Rol -->
        <div class="form-group mb-3">
          <label for="role" class="form-label">Rol</label>
          <select 
            id="role" 
            v-model="userForm.role" 
            class="form-select"
            :class="{ 'is-invalid': errores.role }"
          >
            <option disabled value="">Select your ocupation</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
            <option value="college">Universidad</option>
            <option value="master">Administrador</option>
          </select>
          <div class="invalid-feedback">{{ errores.role }}</div>
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          {{ loading ? "Registrando..." : "Registrar Usuario" }}
        </button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useUsersStore } from '@/stores/users_store'

export default defineComponent({
  setup() {
    const userStore = useUsersStore()
    const loading = ref(false);

    // Estado reactivo para el formulario
    const userForm = reactive({
      name: '', // antes user_name
      email: '',
      role: '',
      password: '',
    })

    // Estado para errores
    const errores = reactive({
      name: '',
      email: '',
      role: '',
      password: '',
    })

    // Validar formulario
    function validarFormulario() {
      let valido = true
      errores.name = ''
      errores.email = ''
      errores.role = ''

      if (!userForm.name) {
        errores.name = 'El nombre es obligatorio.'
        valido = false
      }
      if (!userForm.password) {
        errores.password = 'La contraseña es obligatorio.'
        valido = false
      }
      if (!userForm.email) {
        errores.email = 'El email es obligatorio.'
        valido = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
        errores.email = 'El email no es válido.'
        valido = false
      }
      if (!userForm.role) {
        errores.role = 'El rol es obligatorio.'
        valido = false
      }

      return valido
    }

    // Función para agregar usuario
    async function registerUser() {
      // if (validarFormulario()) {
      if (!validarFormulario()) return;

      loading.value = true;
      try {
        await userStore.registerUser(userForm);
        alert("Usuario registrado exitosamente.");
        Object.assign(userForm, { name: "", email: "", password: "", role: "" });
      } catch (err) {
        console.error("Error al registrar usuario:", err);
      } finally {
        loading.value = false;
      }
    }

    return { userForm, errores, registerUser, loading };
  },
})
</script>

<style scoped>

body {
  background-color: #344E41;
}

.card {
  width: 500px;
  border-radius: 40px;
  /* background-color: #344E41; */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px; /* Espacio entre el título y el formulario */
  text-align: center;
}

.form-container {
  background: #ffffff; /* Fondo blanco */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
  width: 100%;
  max-width: 400px; /* Ancho máximo */
  display: flex;
  flex-direction: column;
  gap: 100px;
}

form div {
  margin-bottom: 10px;
}


label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  font-size: 1em;
}

span.error {
  color: red;
  font-size: 0.875em;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  /* background-color: #768164; */
  color: #ffffff;
  font-size: 1em;
  cursor: pointer;
}

button:hover  {
  background-color: #3e4e25;
  cursor: not-allowed;
}
</style>
