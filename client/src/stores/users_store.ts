import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { User,UsersInterfaces } from '@/models/users_model.js'
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const useUsersStorre = defineStore('User',()=>{
    const user = ref<UsersInterfaces[]>([]);

    async function getUsers() {
        let port:number | string= process.env.PORT || 5300; 
        const response = await fetch('http://localhost:'+ port)
        const data = await response.json();
        user.value= data.map((user:any)=> new User(user.user_name,user.email,user.password,user.role,user._id))
    }
    async function addUser(useradd:UsersInterfaces) {
        user.value.push(useradd)
    }
    async function deleteUser(id: Types.ObjectId) 
    { 
        const index = user.value.findIndex(usuario => usuario._id.equals(id)); 
        if (index !== -1) 
        { 
          user.value.splice(index, 1); 
        } 
        else 
        { 
           console.error("Usuario no encontrado"); 
        } 
    }
    function putUser(id: Types.ObjectId, datosActualizados: Partial<UsersInterfaces>) 
      { 
        const index = user.value.findIndex(usuario => usuario._id?.equals(id)); 
         if (index !== -1) 
         {  
            user.value[index] = { ...user.value[index], ...datosActualizados }; } 
         else 
         { 
           console.error("Usuario no encontrado"); 
         } 
    }
    return {user,addUser,getUsers,putUser,deleteUser}
})