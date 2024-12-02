<template>
    <div class="method-selection">
    <h2>Selecciona tu método de estudio</h2>
        <div class="methods">
            <div v-for="method in methods" :key="method.name" class="method-card">
                <h3>{{ method.name }}</h3>
                <p>{{ method.description }}</p>
                <p>Tiempo de estudio: {{ method.time_study }} minutos</p>
                <p>Tiempo de descanso: {{ method.time_break }} minutos</p>
                <button @click="selectMethod(method)">Seleccionar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MethodStudy } from '@/models/methodstudy_model';

export default defineComponent({
    name: 'MethodSelection',
    setup() {
        const methods = ref<MethodStudy[]>([
            new MethodStudy('Pomodoro', 25, 5, 'Método de estudio con intervalos de 25 minutos de trabajo y 5 minutos de descanso.'),
            new MethodStudy('Técnica de 50/10', 50, 10, 'Método de estudio con intervalos de 50 minutos de trabajo y 10 minutos de descanso.'),
            new MethodStudy('Estudio Continuo', 90, 20, 'Método de estudio con intervalos de 90 minutos de trabajo y 20 minutos de descanso.')
        ]);

        const selectMethod = (method: MethodStudy) => {
            alert(`Has seleccionado el método: ${method.name}`);
        };

        return {
            methods,
            selectMethod
        };
    }
});
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
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.method-card h3 {
    margin-top: 0;
    color: #344E41;
}

.method-card p {
    color: #588157;
}

.method-card button {
    background-color: #344E41;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.4s;
}

.method-card button:hover {
    background-color: #23352c;
}
</style>
