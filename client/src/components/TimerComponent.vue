<template>
    <div>
        <h1>Timer</h1>
        <p>{{ timeDisplay }}</p>
        <button @click="startTimer(workDuration, breakDuration)">Iniciar</button>
        <button @click="pauseTimer">Pausar</button>
        <button @click="stopTimer">Detener</button>
    </div>
</template>

<script lang="ts">
import { useTimerStore } from '@/stores/timer_store'
import { defineComponent, onMounted, computed } from 'vue'
// import { useMethodsStore } from '@/stores/methods_store'
import { usePreferencesStore } from '@/stores/userPreferences_store'
import { useAuthStore } from '@/stores/authstore'
import { Types } from 'mongoose'
export default defineComponent({
    name: 'TimerComponent',
    setup() {
        const timerStore = useTimerStore();
        const authStore = useAuthStore();
        const preferencesStore = usePreferencesStore();
        
        
        const userIDString = authStore.loggedUserId
        const userID = new Types.ObjectId(userIDString)
        const timeDisplay = computed(() => timerStore.timeDisplay)
        onMounted(async () => {
            await preferencesStore.getUserPreferences(userID)
        });
        const workDuration = computed(() => {
            return preferencesStore.userPreferences.length > 0 ? preferencesStore.userPreferences[0].workDuration : 0;
        });

        const breakDuration = computed(() => {
            return preferencesStore.userPreferences.length > 0 ? preferencesStore.userPreferences[0].breakDuration : 0;
        });
        const startTimer = (workDuration: number, breakDuration: number) => {
            timerStore.startTimer(workDuration, breakDuration)
        }
        const pauseTimer = () => {
            timerStore.pauseTimer()
        }

        const stopTimer = () => {
            timerStore.stopTimer()
        }

        return {
            timeDisplay,
            startTimer,
            workDuration,
            breakDuration,
            pauseTimer,
            stopTimer
        }
    } 
})
</script>
