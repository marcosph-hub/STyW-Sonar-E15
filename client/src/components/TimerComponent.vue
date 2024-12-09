<template>
    <div class="timer-component">
        <h1 class="timer-title">Timer</h1>
        <div class="timer-visual">
            

            <p class="timer-display">{{ timeDisplay }}</p>
        </div>
        <div class="button-collections">
            <button class="timer-button-start" @click="startTimer(workDuration, breakDuration)">START</button>
            <button class="timer-button-pause" @click="pauseTimer">PAUSE</button>
            <button class="timer-button-stop" @click="stopTimer">RESTART</button>
        </div>
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
        if (!userIDString) {
            throw new Error('No se ha encontrado el ID del usuario')
        }
        const userID = new Types.ObjectId(userIDString)
        const timeDisplay = computed(() => timerStore.timeDisplay)
        const workDuration = ref(0);
        const breakDuration = ref(0);
        const methodName = ref('');
        onMounted(async () => {
            try {
                //await preferencesStore.getUserPreferences(userID);
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

body {
    background-color: #151B23;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display:grid;
    place-items: center;
    overflow: hidden;
}

.timer-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.timer-component h1{
    margin-bottom: 50px;
    font-size: 4rem;
}

.timer-visual {
    display: flex;  
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 350px;
    border: 6px solid rgb(18, 102, 102);
    color: rgb(18, 102, 102);
    border-radius: 50%;
    font-family: monospace;
    font-size: 4rem;
}



.timer-title {
    font-family: 'Lobster', cursive;
    font-size: 2rem;
}

.button-collections {
    margin-top: 50px;
}
.timer-button {
    /* width: 100px;
    height: 40px; */
    margin: 0 20px;
    padding: 20px 60px;
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

