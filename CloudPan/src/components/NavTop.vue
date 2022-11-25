<script setup>
import axios from 'axios';
import { ref } from 'vue';
import bus from 'vue3-eventbus'
const isSelected = ref(false)
const inputFile = ref(null)

bus.on('selected', () => {
  isSelected.value = true
})

bus.on('unselected', () => {
  isSelected.value = false
})



function choose() {
  const input = inputFile.value
  input.click()
  console.log(JSON.parse(localStorage.getItem('user_info')).name + JSON.parse(sessionStorage.getItem('path')));
}

function upLoad() {
  bus.emit('upload')
  const input = inputFile.value
  const file = new FormData()

  if(input.files[0] !== undefined) {
    file.append('avatar', input.files[0])
    
    axios.post("http://localhost:80/uploudFile", file, {
      headers: { "Content-Type": "multipart/form-data" },
      params: { path: JSON.parse(localStorage.getItem('user_info')).name + JSON.parse(sessionStorage.getItem('path'))}
    })
    .then(res => {
      console.log(res);
    })
  }
}

function deleted() {

}

</script>


<template>
  <div class="p-6 h-20 w-screen bg-white flex items-center justify-between border-b border-solid border-gray-200 shadow">
    <i class="iconfont text-5xl text-blue-400">&#xe603;</i>
    <div class="flex text-gray-700">
      <i @click="deleted" v-if="isSelected"
        class="iconfont text-3xl hover:bg-gray-300 rounded-full cursor-pointer p-1">
        &#xe68c;</i>
      <i v-if="isSelected"
        class="iconfont text-3xl hover:bg-gray-300 rounded-full cursor-pointer p-1">
      </i>
      <i @click="choose"
        class="iconfont text-3xl hover:bg-gray-300 rounded-full cursor-pointer p-1">
        &#xeb2c;</i>
      <input type="file" ref="inputFile" @change="upLoad" class="scope">
    </div>
    
  </div>
</template>

<style scope>
.scope {
  display: none;
}
</style>