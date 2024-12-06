<script setup lang="ts">
import Navbar  from "@/components/Navbar.vue"
</script>
<template>
    <main>
        <Navbar />
        <div>
            <TimerComponent />
        </div>
    </main>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimerComponent from '@/components/TimerComponent.vue'

export default defineComponent({
    name: 'TimerView',
    components: {
        TimerComponent
    }
})
</script>
