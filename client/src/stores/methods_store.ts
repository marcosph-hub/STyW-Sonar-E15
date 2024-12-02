import { defineStore } from 'pinia';
import axios from 'axios';
import type { MethodStudyInterfaces } from '@/models/methodstudy_model';
import { MethodStudy } from '@/models/methodstudy_model';
import { ref, computed } from 'vue';
// import { Types } from 'mongoose';

export const useMethodsStore = defineStore('Methods',()=>{
    const methods = ref<MethodStudyInterfaces[]>([]);
    const error = ref<string | null>(null);
    const errorMessage = computed(() => {
        return error.value ? error.value : '';
    });

    async function getMethods(){
        try {
            const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300';
            const response = await axios.get<MethodStudyInterfaces[]>(`${apiUrl}/method`);
            methods.value = response.data.map( (method) => new MethodStudy(method.name, method.description, method.workDuration, method.breakDuration, method._id)) // method._id?.toString() || ''
            console.log("client");
            console.log(methods.value);
            error.value = null;
        }
        catch(err: unknown){
            if(err instanceof Error){
                console.error('Error:', err.message);
                error.value = 'Error getting the list of methods';
            }
        }
    }
    return { methods, errorMessage, getMethods }
});
// {
//     "name": "52/17",
//     "description": "Study method where you work without rest for 52 minutes and then rest for 17 minutes.",
//     "workDuration": 52,
//     "breakDuration": 17
// }