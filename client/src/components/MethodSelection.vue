<template>
  <body> 
    <div class="method-selection">
    <h2>Selecciona tu método de estudio</h2>
    <div class="methods">
      <div v-for="method in methods" :key="method.name" class="method-card"> 
        <h3>{{ method.name }}</h3>
        <p>{{ method.description }}</p>
        <p style="font-weight: bold">
          Tiempo de estudio: <span class="work-duration">{{ method.workDuration }}</span> minutos
        </p> 
        <p style="font-weight: bold">
          Tiempo de descanso: <span class="break-duration">{{ method.breakDuration }}</span> minutos
        </p>
        <button @click="selectMethod(method)">Seleccionar</button>
      </div>
      </div>
    </div>
  </body>
  
</template>

<script lang="ts">
import { Types } from 'mongoose'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authstore'
import { useUsersStore } from '@/stores/users_store'
import { MethodStudy } from '@/models/methodstudy_model'
import { useMethodsStore } from '@/stores/methods_store' 
import { usePreferencesStore } from '@/stores/userPreferences_store'

export default defineComponent({
  name: 'MethodSelection',
  setup() {
    const router = useRouter() 
    const authStore = useAuthStore()
    const userStore = useUsersStore() 
    const methodsStore = useMethodsStore()
    const userIDString = authStore.loggedUserId 
    const preferencesStore = usePreferencesStore()
    onMounted(async () => { 
      await userStore.getUsers() 
      await methodsStore.getMethods()
    })
    const selectMethod = async (method: MethodStudy) => { 
        try { 
            const userID = new Types.ObjectId(userIDString)
            await preferencesStore.addUserPreferences(userID, method._id)
            router.push('/timer')
        } catch (error) {
            console.error('Error al seleccionar el método', error)
        }
    }
    return {
        methods: methodsStore.methods,
        selectMethod
    }
  }
})
</script>

<style scoped>
.method-selection {
  text-align: center;
  font-family: Arial, sans-serif;
}

.methods {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.method-card {
  border: 1px solid #0a4f58;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.method-card h3 {
  margin-top: 0;
  color: #2b7288;
  font-weight: bold;
}

.method-card p {
  color: #588157;
}

.method-card button {
  background-color: #344e41;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.4s;
}

.method-card button:hover {
  background-color: #3d9669;
}

.work-duration {
  color: #3d9669;
  font-weight: bold;
  font-size: 1.2em;
}

.break-duration {
  color: #2788a5;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
