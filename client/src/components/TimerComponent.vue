<template>
    <div class="timer-component">
        <h1 class="timer-title">Timer</h1>
        <p class="timer-display">{{ timeDisplay }}</p>
        <button class="timer-button" @click="startTimer(workDuration, breakDuration)">Start</button>
        <button class="timer-button" @click="pauseTimer">Pause</button>
        <button class="timer-button" @click="stopTimer">Restart</button>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authstore'
import { useTimerStore } from '@/stores/timer_store'
import { defineComponent, onMounted, computed, ref } from 'vue'
import { usePreferencesStore } from '@/stores/userPreferences_store'


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
        const workDuration = ref(0);
        const breakDuration = ref(0);
        const methodName = ref('');
        onMounted(async () => {
            try {
                await preferencesStore.getUserPreferences(userID);
                if (preferencesStore.userPreferences.length > 0) {
                    const preferences = preferencesStore.userPreferences[0];
                    workDuration.value = preferences.workDuration;
                    breakDuration.value = preferences.breakDuration;
                }

            } catch (error) {
                console.error('Error al obtener las preferencias del usuario:', error);
            }
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
            stopTimer,
            methodName
        }
    } 
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.timer-title {
    font-family: 'Lobster', cursive;
    font-size: 2rem;
}

.timer-button {
    width: 50px;
    font-size: 0.9rem;
    background-color: #4c7761; 
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.6s;
    border-radius: 50px;
    margin-right: 10px;
}

button:hover  {
    background-color: #344E41;
    cursor: not-allowed;
    border-color: #83af82;
    box-shadow: 0px 0px 4px #79ac92;
}

</style>

