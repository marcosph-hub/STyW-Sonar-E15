import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type {UsersInterfaces } from '@/models/users_model';
import { User } from '@/models/users_model'
import { Types } from 'mongoose';


export const useUsersStore = defineStore('User',()=>{
  const user = ref<UsersInterfaces[]>([]);
  const error = ref<string | null>(null);
  const errorMessage = computed(() => {
    return error.value ? error.value : '';
  });

  async function getUsers() {
    try {
      const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300'; 
      const response = await axios.get<UsersInterfaces[]>(`${apiUrl}/user`);
  
      user.value = response.data.map(
        (user) => new User(user.name, user.email, user.password, user.role, user._id?.toString() || '')
      );
      error.value = null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message);
        error.value = 'Error getting the list of users';
      }
    }
  }

  async function registerUser(useradd: UsersInterfaces) {
    console.log('Datos enviados:', useradd);
    try {
      const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300';
      console.log(apiUrl); // Verifica la URL que se está utilizando

      const response = await axios.post<UsersInterfaces>(`${apiUrl}/user/register`, useradd, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const addedUser = response.data;
      console.log("addedUser:",addedUser);
      user.value.push(addedUser);
      console.log('User added succesfully:', addedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registrando usuario:', error.message);
      } else {
        console.error('Error desconocido registrando usuario');
      }
    }
  }
  async function deleteUserByID(email: string): Promise<void> {
    try {
      const port: number | string = process.env.PORT || 5300;
  
      // Buscar el índice del usuario en el estado local
      const index = user.value.findIndex((usuario) => usuario.email === email);
      if (index === -1) {
        error.value = 'User not found in local state';
        return;
      }
  
      // Realizar la solicitud al backend para eliminar al usuario por correo electrónico
      await axios.delete(`http://localhost:${port}/user`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email }, // Enviar el email en el cuerpo de la solicitud
      });
  
      // Actualizar el estado local eliminando al usuario
      user.value.splice(index, 1);
      error.value = null;
      console.log('User successfully deleted');
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = `Error while deleting user: ${err.message}`;
      } else {
        error.value = 'An unknown error occurred';
      }
      console.error(error.value);
    }
  }

  async function putUser(id: Types.ObjectId, datosActualizados: Partial<UsersInterfaces>): Promise<void> {
    try {
      const port: number | string = process.env.PORT || 5300;
  
      // Verificar si el usuario existe en el estado antes de realizar la solicitud
      const index = user.value.findIndex((usuario) => {
        // Si usuario._id es un string
        if (typeof usuario._id === 'string' && typeof id === 'string') {
          return usuario._id === id;
        }
        
        // Si usuario._id es un ObjectId y id es un ObjectId
        if (usuario._id instanceof Types.ObjectId && id instanceof Types.ObjectId) {
          return usuario._id.equals(id);
        }
      
        // Si los tipos no coinciden, devolver false (no encontrado)
        return false;
      });
  
      // Realizar la petición PUT usando Axios
      const response = await axios.put(`http://localhost:${port}/user/${id}`, datosActualizados, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Si la solicitud fue exitosa, actualizar los datos del usuario en el estado reactivo
      user.value[index] = { ...user.value[index], ...response.data };
      error.value = null; // Limpiar cualquier error anterior
      console.log('User successfully updated');
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = `Error while updating user: ${err.message}`; // Actualizar el estado de error
      } else {
        error.value = 'An unknown error occurred'; // Fallback en caso de un error inesperado
      }
      console.error(error.value); // Registrar el error en la consola para depuración
    }
  }
  return {user, error, errorMessage ,registerUser, getUsers, putUser, deleteUserByID}
})