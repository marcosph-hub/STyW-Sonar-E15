import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Array<{ name: string; email: string; role: string }>, // para almacenar los usuarios
    user: null as null | { name: string; email: string; role: string }, // para un solo usuario
    error: null as null | string,
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5300/user');
        this.users = response.data;
      } catch (error: unknown) {
        // this.error = 'Error al obtener usuarios:' + error;
        if (error instanceof Error) {
          console.error('Error:', error.message);
          this.error = 'Error getting the list of users';
        }
      }
    },

    async registerUser(userData: { name: string; email: string; password: string; role: string }) {
      try {
        const response = await axios.post('http://localhost:5300/user/register', userData);
        this.users.push(response.data); // Agrega el nuevo usuario a la lista
      } catch (error: unknown) {
        // this.error = 'Error al registrar el usuario';
        if (error instanceof Error) {
          console.error('Error:', error.message);
          this.error = 'Error registering the user';
        }
      }
    },

    async loginUser(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5300/user/login', { email, password });
        this.user = response.data;
      } catch (error: unknown) {
        // this.error = 'Error al iniciar sesión';
        if (error instanceof Error) {
          console.error('Error:', error.message);
          this.error = 'Error logging in';
        }
      }
    },

    async updateUser(id: string, userData: { name?: string; email?: string; role?: string }) {
      try {
        await axios.put(`http://localhost:5300/user/${id}`, userData);
        await this.fetchUsers(); // Refresca la lista de usuarios
      } catch (error:unknown) {
        // this.error = 'Error al actualizar el usuario';
        if (error instanceof Error) {
          console.error('Error:', error.message);
          this.error = 'Error updating the user';
        }
      }
    },

    async deleteUser(email: string) {
      try {
        await axios.delete(`http://localhost:5300/user/${email}`);
        this.users = this.users.filter(user => user.email !== email); // Elimina el usuario localmente
      } catch (error:unknown) {
        // this.error = 'Error al eliminar el usuario';
        if (error instanceof Error) {
          console.error('Error:', error.message);
          this.error = 'Error deleting the user';
        }
      }
    }
  }
});
