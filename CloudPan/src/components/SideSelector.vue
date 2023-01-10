<script setup>
import SelectorVue from './SIdeComponents/Selector.vue';
import { useRouter } from 'vue-router';
import bus from 'vue3-eventbus'
import axios from 'axios';

const router = useRouter()

async function loginDown() {
  if(confirm('确定要退出吗?')) {
    await axios.get('http://localhost:80/reset')
    localStorage.removeItem('user_info')
    console.log(localStorage.getItem('user_info'));
    router.push('/')
  }
}

function newFolder() {
  const folderName = prompt("请输入文件夹名称")
  // axios.get('http://localhost:80/createFolder?folderName=' + folderName, 
  // res => {
  //   if(res.data === 1) {
  //     alert('创建成功')
  //   }else {
  //     alert('创建失败')
  //   }
  // })
  bus.emit('newfolder', folderName)
}


</script>

<template>
  <div class="flex flex-col flex-shrink-0 w-2/12 h-full text-gray-600 font-thin">
    
    <RouterLink :to="{path: '/home'}">
      <SelectorVue title="我的文件"><i class="iconfont text-3xl ml-3 font-thin">&#xe85f;</i></SelectorVue>
    </RouterLink>
    <SelectorVue title="新建文件夹" @click="newFolder"><i class="iconfont text-3xl ml-3 font-thin">&#xe85e;</i></SelectorVue>
    <SelectorVue title="个人中心"><i class="iconfont text-3xl ml-3 font-thin">&#xe670;</i></SelectorVue>
    <SelectorVue title="登出" @click="loginDown"><i class="iconfont text-3xl ml-3 font-thin">&#xe89d;</i></SelectorVue>
  </div>
</template>