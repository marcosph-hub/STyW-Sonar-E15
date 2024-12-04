import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { UserPreferencesInterface } from '@/models/userPreferencesModel';
import { UserPreferences } from '@/models/userPreferencesModel';
import { Types } from 'mongoose';

export const usePreferencesStore = defineStore('Preferences', () => {
    const userPreferences = ref<UserPreferencesInterface[]>([]);
    const error = ref<string | null>(null);
    const errorMessage = computed(() => {
        return error.value ? error.value : '';
    });

    async function getUserPreferences(userID: Types.ObjectId){
        try{
            
            const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300';
            const response = await axios.get<UserPreferencesInterface>(`${apiUrl}/method/preferences/${userID}`);
            userPreferences.value = [
                new UserPreferences(
                    response.data.userId,
                    response.data.methodId,
                    response.data.workDuration,
                    response.data.breakDuration,
                    response.data.createdAt,
                    response.data.updatedAt,
                    response.data._id
                ),
            ];
            console.log('userPreferences obtenidas: ', userPreferences.value);
            error.value = null;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error('Axios error:', err.response?.data || err.message);
                error.value = `Error del servidor: ${err.response?.data?.message || err.message}`;
            } else if (err instanceof Error) {
                console.error('Error:', err.message);
                error.value = 'Error en la solicitud';
            } else {
                console.error('Error desconocido:', err);
                error.value = 'Error desconocido';
            }
        }
    }

    async function addUserPreferences(userId: Types.ObjectId, methodId: Types.ObjectId) {
        try {
            const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300';
            await axios.post(`${apiUrl}/method/preferences`, {
                userId,
                methodId
            });

            error.value = null;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error('Axios error:', err.response?.data || err.message);
                error.value = `Error del servidor: ${err.response?.data?.message || err.message}`;
            } else if (err instanceof Error) {
                console.error('Error:', err.message);
                error.value = 'Error en la solicitud';
            } else {
                console.error('Error desconocido:', err);
                error.value = 'Error desconocido';
            }
        }
    }

    return { userPreferences, errorMessage, getUserPreferences, addUserPreferences }
})
