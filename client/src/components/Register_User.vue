<template>
    <div>
      <h2>Agregar Usuario</h2>
      <form @submit.prevent="agregarUsuario">
        <!-- Campo Nombre -->
        <div>
          <label for="name">Nombre:</label>
          <input
            id="name"
            v-model="userForm.user_name"
            type="text"
            placeholder="Ingrese el nombre"
          />
          <span v-if="errores.name">{{ errores.name }}</span>
        </div>
        <!-- Campo Nombre -->
        <div>
          <label for="password">Contraseña:</label>
          <input
            id="password"
            v-model="userForm.password"
            type="text"
            placeholder="Ingrese la contraseña"
          />
          <span v-if="errores.name">{{ errores.name }}</span>
        </div>  
        <!-- Campo Email -->
        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="userForm.email"
            type="email"
            placeholder="Ingrese el email"
          />
          <span v-if="errores.email">{{ errores.email }}</span>
        </div>
  
        <!-- Campo Rol -->
        <div>
          <label for="role">Rol:</label>
          <input
            id="role"
            v-model="userForm.role"
            type="text"
            placeholder="Ingrese el rol"
          />
          <span v-if="errores.role">{{ errores.role }}</span>
        </div>
  
        <!-- Botón para enviar -->
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useUsersStore } from '@/stores/users_store';
  
  export default defineComponent({
    setup() {
      const userStore = useUsersStore();
  
      // Estado reactivo para el formulario
      const userForm = reactive({
        user_name: '',
        email: '',
        role: '',
        password: ''
      });
  
      // Estado para errores
      const errores = reactive({
        name: '',
        email: '',
        role: '',
        password: ''
      });
  
      // Validar formulario
      function validarFormulario() {
        let valido = true;
        errores.name = '';
        errores.email = '';
        errores.role = '';
  
        if (!userForm.user_name) {
          errores.name = 'El nombre es obligatorio.';
          valido = false;
        }
        if (!userForm.password) {
          errores.password = 'La contraseña es obligatorio.';
          valido = false;
        }
        if (!userForm.email) {
          errores.email = 'El email es obligatorio.';
          valido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
          errores.email = 'El email no es válido.';
          valido = false;
        }
        if (!userForm.role) {
          errores.role = 'El rol es obligatorio.';
          valido = false;
        }
  
        return valido;
      }
  
      // Función para agregar usuario
      async function agregarUsuario() {
        if (validarFormulario()) {
          try {
            await userStore.registerUser(userForm);
            alert('Usuario agregado exitosamente.');
            // Limpiar formulario
            userForm.user_name = '';
            userForm.email = '';
            userForm.role = '';
          } catch (error) {
            console.error('Error al agregar usuario:', error);
          }
        }
      }
  
      return { userForm, errores, agregarUsuario };
    },
  });
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 8px;
    font-size: 1em;
    margin-top: 5px;
  }
  
  span {
    color: red;
    font-size: 0.9em;
  }
  
  button {
    margin-top: 15px;
    padding: 8px 12px;
    font-size: 1em;
  }
  </style>
  
  
  