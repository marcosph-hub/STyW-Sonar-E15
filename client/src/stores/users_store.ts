import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {UsersInterfaces } from '@/models/users_model'
import { User } from '@/models/users_model'
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const useUsersStorre = defineStore('User',()=>{
    const user = ref<UsersInterfaces[]>([]);

    async function getUsers() {
        const port:number | string= process.env.PORT || 5300; 
        const response = await fetch('http://localhost:'+ port)
        const data: UsersInterfaces[] = await response.json(); //se añade el tipo de datos que va a contener 
        user.value= data.map((user)=> new User(user.user_name,user.email,user.password,user.role,user._id))
    }
    async function addUser(useradd:UsersInterfaces) {
      const port:number | string= process.env.PORT || 5300;
      try{
      const response = await fetch('http://localhost/register:'+ port, 
       { method: 'POST', headers: 
       { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(useradd), 
       });
        const add_user=await response.json();
        user.value.push(add_user)
        }catch{
          console.error('Issue in add users')
        }
      }
    async function deleteUser(id: Types.ObjectId) 
    { 
        const port:number | string= process.env.PORT || 5300;
        const index = user.value.findIndex(usuario => {if(usuario._id)usuario._id.equals(id)}); 
        if (index !== -1) 
        {       
           /*const response = */await fetch('http://localhost/'+ id +':'+ port, 
           { method: 'DELETE', headers: 
           { 'Content-Type': 'application/json' }
           });
          user.value.splice(index, 1); 
        } 
        else 
        { 
           console.error("User no found"); 
        } 
    }
    async function putUser(id: Types.ObjectId, datosActualizados: Partial<UsersInterfaces>) 
      { 
        try{
        const port:number | string= process.env.PORT || 5300;
        const index = user.value.findIndex(usuario => usuario._id?.equals(id)); 
         if (index !== -1) 
         {  
          /*const response = */await fetch('http://localhost/'+ id +':'+ port, 
          { method: 'PUT', headers: 
          { 'Content-Type': 'application/json' }, 
             body: JSON.stringify(datosActualizados), 
          })
            user.value[index] = { ...user.value[index], ...datosActualizados }; } 
         else 
         { 
           console.error("User no found"); 
         } 
         } catch{
          console.error("User no found"); 
         }
    }
    return {user,addUser,getUsers,putUser,deleteUser}
})

/**
 *  a tomar en cuenta
 *  ref<UsersInterfaces[]>([]) -> state reactivo que se actuliza de manera dinamica segun hallan modificaciones
 * debido a las request que se hagan
 * 
 * se pueden simplificar y "modernizar" las request con el uso de axios
 * 
 */