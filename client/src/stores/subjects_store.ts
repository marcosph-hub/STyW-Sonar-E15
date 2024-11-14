import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {SubjectInterfaces } from '@/models/subject_model'
import { Subject } from '@/models/subject_model'
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const useSubjectStorre = defineStore('Subject',()=>{
    const subjects = ref<SubjectInterfaces []>([]);

    async function getSubject() {
        let port:number | string= process.env.PORT || 5300; 
        const response = await fetch('http://localhost:'+ port)
        const data = await response.json();
        subjects.value= data.map((subject:any)=> new Subject(subject.name,subject.type_education,subject.description,subject._id))
    }
    async function addSubject(subjectadd:SubjectInterfaces ) {
        subjects.value.push(subjectadd)
    }
    async function deleteSubject(id: Types.ObjectId) 
    { 
        const index = subjects.value.findIndex(subject => {if(subject._id)subject._id.equals(id)}); 
        if (index !== -1) 
        { 
            subjects.value.splice(index, 1); 
        } 
        else 
        { 
           console.error("Subject no found"); 
        } 
    }
    function putSubject(id: Types.ObjectId, datosActualizados: Partial<SubjectInterfaces >) 
      { 
        const index = subjects.value.findIndex(usuario => usuario._id?.equals(id)); 
         if (index !== -1) 
         {  
            subjects.value[index] = { ...subjects.value[index], ...datosActualizados }; } 
         else 
         { 
           console.error("Subject no found"); 
         } 
    }
    return {subjects,addSubject,getSubject,putSubject,deleteSubject}
})