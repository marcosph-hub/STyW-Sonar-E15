import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {MethodStudyInterfaces } from '@/models/methodstudy_model'
import { MethodStudy } from '@/models/methodstudy_model'
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const useMethodStudyStorre = defineStore('MethodStudy',()=>{
    const methodstudies = ref<MethodStudyInterfaces []>([]);

    async function getMethodStudy() {
        let port:number | string= process.env.PORT || 5300; 
        const response = await fetch('http://localhost:'+ port)
        const data = await response.json();
        methodstudies.value= data.map((methodstudy:any)=> new MethodStudy(methodstudy.name,methodstudy.time_study,methodstudy.time_break,methodstudy.description,methodstudy._id))
    }
    async function addMethodStudy(methodstudyadd:MethodStudyInterfaces) {
        methodstudies.value.push(methodstudyadd)
    }
    async function deleteMethodStudy(id: Types.ObjectId) 
    { 
        const index = methodstudies.value.findIndex(methodstudy => {if(methodstudy._id)methodstudy._id.equals(id)}); 
        if (index !== -1) 
        { 
            methodstudies.value.splice(index, 1); 
        } 
        else 
        { 
           console.error("Method Study no found"); 
        } 
    }
    function putMethodStudy(id: Types.ObjectId, datosActualizados: Partial<MethodStudyInterfaces>) 
      { 
        const index = methodstudies.value.findIndex(methodstudy => methodstudy._id?.equals(id)); 
         if (index !== -1) 
         {  
            methodstudies.value[index] = { ...methodstudies.value[index], ...datosActualizados }; } 
         else 
         { 
           console.error("Method Study no found"); 
         } 
    }
    return {methodstudies,addMethodStudy,getMethodStudy,putMethodStudy,deleteMethodStudy}
})