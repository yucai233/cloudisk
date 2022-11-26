<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus'
import FileVue from './File.vue';
import TagVue from './Tag.vue';

bus.on('newfolder', (p) => {
    axios.get('http://localhost:80/createFolder', {
        params: {
            folderName: p,
            path: pathList.value[pathList.value.length-1].path
        }
    }).then(res => {
        fileList.value = res.data
    })
})

// bus.on('upload', () => {
//     bus.emit('getpath', pathList.value.slice(-1)[0].path)
// })

const fileList = ref([])
const dirList = ref([])
const pathList = ref([])
const domList = ref([])

watch(
    pathList,
    (val, preVal) => {
        sessionStorage.setItem('path', JSON.stringify(pathList.value.slice(-1)[0]? pathList.value.slice(-1)[0].path : ''))
        bus.emit('unselected')
    },
    { deep: true }
)

onBeforeMount(() => {
    axios.get('http://localhost:80/openFile')
        .then((res) => {
            console.log(res.data);
            fileList.value = res.data
        })
    sessionStorage.setItem('path', JSON.stringify(''))
})

async function enter(p) {
    dirList.value.push(p)
    await axios.get('http://localhost:80/openFile?folderName=' + '/' + p)
        .then(res => {
            console.log(res.data);
            fileList.value = res.data
        })
    pathList.value = dirList.value.map((item, idx) => {
        let path = ''
        for(let i = 0; i <= idx; ++ i)
            path = path + '/' + dirList.value[i]
        return {
            dir: item, 
            path: path
        }
    })
    
    bus.emit('uncheck')
}

function checkout(p) {
    axios.get('http://localhost:80/openFile?folderName=' + p.path)
        .then(res => {
            fileList.value = res.data
        })
    dirList.value = dirList.value.splice(0, p.idx + 1)
    pathList.value = pathList.value.splice(0, p.idx + 1)

}

function back() {
    axios.get('http://localhost:80/openFile')
        .then(res => {
            fileList.value = res.data
        })
    dirList.value = []
    pathList.value = []
}

const fileshare = (p) => {
    bus.emit('filetoshare', {
        path: pathList.value.slice(-1)[0]? pathList.value.slice(-1)[0].path : '',
        fileName: p
    })
}
</script>


<template>
    <div class="w-10/12 text-gray-500 font-normal pl-5 mr-8">
        <div class="w-full h-9 border-b border-gray-300 border-solid flex-shrink-0 mb-5 flex items-center">
            <i class="iconfont text-2xl hover:bg-gray-200 cursor-pointer" @click="back">&#xe64b;</i>
            <TagVue v-for="(item, idx) in pathList" :dir="item.dir" :path="item.path" :idx="idx" @checkout="checkout"></TagVue>
        </div>
        <div class="flex flex-col pl-5 mb-3">
            <div class="flex">
                <span class="flex-auto">名称</span>
                <span class="flex-1">大小</span>
                <span class="flex-1">最后修改</span>
            </div>
        </div>
        <FileVue @enter="enter" @fileshare="fileshare" v-for="item in fileList" :file-name="item" ref="domList">{{item}}</FileVue>
        
    </div>
</template>
