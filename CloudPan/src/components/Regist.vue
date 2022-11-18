<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const name = ref('')
const password = ref('')
const mail = ref('')
const namePattern = /^[a-zA-Z0-9_-]{4,16}$/
const pwdPattern = /^.*(?=.{6,})(?=.*\d)(?=.*\w).*$/
const mailPattern = /^[1-9][0-9]{4,10}@qq.com$/

const isNameMatch = ref(true)
const isPwdMatch = ref(true)
const isMailMatch = ref(true)

function regist() {
    axios.post('http://10.131.189.233:80/regist', {
        "name": name.value,
        "password": password.value,
        "mail": mail.value
    }).then((res) => {
        console.log(res);
        if(res.data === 1) {
            alert('注册成功')
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

function mailCheck() {
    if(!mailPattern.test(mail.value)) {
        isMailMatch.value = false
    }else {
        isMailMatch.value = true
    }
}

</script>


<template>
    <div class="transition-all w-3/12 h-1/3 p-6 shadow-lg contain mx-auto mt-40">
        <input type="text" v-model="name" @blur="nameCheck" 
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isNameMatch" class="text-xs text-red-500">* 用户名必须在4~16位，且只包含数字，字母，横线</div>
        <input type="text" v-model="password" @blur="pwdCheck" 
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isPwdMatch" class="text-xs text-red-500">* 密码必须不少于六位，且必须包含一个字母，一个数字</div>
        <input type="text" v-model="mail" @blur="mailCheck" 
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isMailMatch" class="text-xs text-red-500">* 请输入正确的手机号格式</div>

        <button class="w-full h-8 m-3 bg-blue-500 mx-auto text-white rounded-sm" @click="regist">注册</button>
    </div>
</template>