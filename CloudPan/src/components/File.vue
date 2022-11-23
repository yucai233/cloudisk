<script setup>
import { ref, defineEmits, defineProps, onBeforeMount, onMounted } from 'vue'
import bus from 'vue3-eventbus'
const emit = defineEmits(['enter'])
const props = defineProps(['fileName'])
const icon = ref(null)

const isEnter = ref(false)

async function clock() {
    isEnter.value = true
    setTimeout(() => isEnter.value = false, 500)
}


function check(e) {
    if(e.currentTarget.classList.contains('bg-blue-500')) {
        if(isEnter.value) {
            const p = e.currentTarget.parentNode.children
            console.log(p);
            for(let n of p)  {
                if(n.classList.contains('file')) {
                    n.classList.add('bg-white')
                    n.classList.remove('bg-blue-500')
                    n.classList.remove('selected')
                }
            }
            // p.forEach(n => {
            //     n.classList.add('bg-white')
            //     n.classList.remove('bg-blue-500')
            //     n.classList.remove('selected')
            // })
            e.currentTarget.classList.add('bg-white')
            e.currentTarget.classList.remove('bg-blue-500')
            e.currentTarget.classList.remove('selected')
            emit('enter', props.fileName)
            
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

onMounted(() => {
    const type = props.fileName.split('.')[1]
    console.log(type);
    if(type === "txt") {
        icon.value.classList.add('icon-wenjian')
    } else if (type === "jpg") {
        icon.value.classList.add('icon-fl-tupian')
    } else {
        icon.value.classList.add('icon-folder-fill')
    }
})


</script>


<template>
    <div class="w-full h-16 bg-white border border-gray-200 border-solid p-3 flex items-center cursor-pointer file" @click="check($event)">
        <div class="flex items-center flex-1">
            <i class="iconfont text-4xl mr-3" ref="icon"></i>
            <span>{{fileName}}</span>
        </div>
        <span class="flex-1">234 KB</span>
        <span class="flex-1">2022/11/7</span>
    </div>
</template>

<style scope>
.selected {
    color: white;
}
.file {
    user-select: none;
}
</style>

