<template>
    <div class="subject-creator">
        <h2>Crear Asignatura</h2>
        <label for="subject-name">Nombre de la Asignatura:</label>
        <input type="text" id="subject-name" v-model="subjectName" placeholder="Introduce el nombre de la asignatura" />

        <label for="subject-description">Descripción de la Asignatura:</label>
        <input type="text" id="subject-description" v-model="subjectDescription" placeholder="Introduce la descripción de la asignatura" />

        <button @click="saveSubject">Guardar Asignatura</button>
    </div>
</template>

<script lang="ts">
import { Types } from 'mongoose';
import { defineComponent, /*onMounted,*/ ref } from 'vue';
import { useSubjectStore } from '@/stores/subjects_store';
import { usePreferencesStore } from '@/stores/userPreferences_store';

export default defineComponent({
    name: 'SubjectCreator',
    setup() {
        const subjectName = ref('');
        const subjectDescription = ref('');
        const { addSubject } = useSubjectStore();
        const preferencesStore = usePreferencesStore();

        async function saveSubject() {
            if (subjectName.value && subjectDescription.value) {
                const newSubject = {
                    name: subjectName.value,
                    description: subjectDescription.value,
                    type_education: 'default'
                };
                addSubject(newSubject);
                subjectName.value = '';
                subjectDescription.value = '';
            } else {
                alert('Please fill in all fields');
            }
            
            const userID = sessionStorage.getItem('userID');
            const methodID = sessionStorage.getItem('methodID');
            console.log('userID', userID)
            console.log('methodID', methodID)
            if (userID && methodID) {
                const userIDObject = new Types.ObjectId(userID);
                const methodIDObject = new Types.ObjectId(methodID);
                await preferencesStore.addUserPreferences(userIDObject, methodIDObject)
            }
        }
        return { subjectName, subjectDescription, saveSubject }
    }
})
</script>

<style scoped>

</style>