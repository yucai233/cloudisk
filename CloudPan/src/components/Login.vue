<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const name = ref('')
const password = ref('')
const namePattern = /^[a-zA-Z0-9_-]{4,16}$/
const pwdPattern = /^.*(?=.{6,})(?=.*\d)(?=.*\w).*$/

let isLogin = false
onBeforeRouteLeave((to, from) => {
    console.log(1);
    if(!isLogin && to.name !== 'login')
        return { name: 'login' }
})

const isNameMatch = ref(true)
const isPwdMatch = ref(true)

function login() {
    axios.post('http://localhost:80/loginUp', {
        "name": name.value,
        "password": password.value
    }).then((res) => {
        console.log(res);
        if(res.data === 1) {
            isLogin = true
            router.push('/home')
            // TODO 根据返回数组显示文件夹
        }else if(res.data === 0) {
            alert('请检查用户名或密码是否正确')
        }
    }).catch((err) => {
        console.log(err);
    })
}

function nameCheck() {
    if(!namePattern.test(name.value)) {
        isNameMatch.value = false
    }else {
        isNameMatch.value = true
    }
}

function pwdCheck() {
    if(!pwdPattern.test(password.value)) {
        isPwdMatch.value = false
    }else {
        isPwdMatch.value = true
    }
}

</script>


<template>
    <div class="transition-all w-3/12 h-1/3 p-6 shadow-lg contain mx-auto mt-40">
        <input type="text" v-model="name" @blur="nameCheck" 
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isNameMatch" class="text-xs text-red-500">* 用户名必须在4~16位，且只包含数字，字母，横线</div>
        <input type="password" v-model="password" @blur="pwdCheck" 
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isPwdMatch" class="text-xs text-red-500">* 密码必须不少于六位，且必须包含一个字母，一个数字</div>
        <div class="flex items-center justify-center h-8">
            <RouterLink :to="{path: '/regist'}">
                <span class="text-blue-500 text-xs cursor-pointer" >注册</span>
            </RouterLink>
        </div>
        <button class="w-full h-8 m-3 mt-0 bg-blue-500 mx-auto text-white rounded-sm" @click="login">登录</button>
    </div>
</template>

<style scope>
input {
    outline: none;
}
</style>