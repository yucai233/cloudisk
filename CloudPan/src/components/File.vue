<script setup>
import { ref, defineEmits } from 'vue'
import bus from 'vue3-eventbus'
const emit = defineEmits(['selected', 'unselected'])

const isEnter = ref(false)

async function clock() {
    isEnter.value = true
    setTimeout(() => isEnter.value = false, 500)
}


function check(e) {
    if(e.currentTarget.classList.contains('bg-blue-500')) {
        if(isEnter.value) {

        }else {
            e.currentTarget.classList.add('bg-white')
            e.currentTarget.classList.remove('bg-blue-500')
            e.currentTarget.classList.remove('selected')
            bus.emit('unselected')  
            
        }
        

    }else {
        e.currentTarget.classList.remove('bg-white')
        e.currentTarget.classList.add('bg-blue-500')
        e.currentTarget.classList.add('selected')
        bus.emit('selected')
        clock()
    }
}


</script>


<template>
    <div class="w-full h-16 bg-white border border-gray-200 border-solid p-3 flex items-center cursor-pointer" @click="check($event)">
        <div class="flex items-center flex-auto">
            <i class="iconfont text-4xl mr-3">&#xe85e;</i>
            <span><slot></slot></span>
        </div>
        <span class="flex-1">234 KB</span>
        <span class="flex-1">2022/11/7</span>
    </div>
</template>

<style scope>
.selected {
    color: white;
}
</style>

