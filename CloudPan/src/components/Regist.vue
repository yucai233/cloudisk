<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const time= ref(60)
const name = ref('')
const password = ref('')
const mail = ref('')
const verify = ref('')
const namePattern = /^[a-zA-Z0-9_-]{4,16}$/
const pwdPattern = /^.*(?=.{6,})(?=.*\d)(?=.*\w).*$/
const mailPattern = /^[1-9][0-9]{4,10}@qq.com$/

const isNameMatch = ref(true)
const isPwdMatch = ref(true)
const isMailMatch = ref(true)

function regist() {
    if(!namePattern.test(name.value) ||
       !pwdPattern.test(password.value) ||
       !mailPattern.test(mail.value)) 
       {
            alert('请检查输入格式')
            return
       }
    axios.post('http://10.131.189.233:80/regist', {
        "name": name.value,
        "password": password.value,
        "verify": verify.value
    }).then((res) => {
        console.log(res);
        if(res.data === 1) {
            alert('注册成功')
            router.push('/')
        }else if(res.data === 0) {
            alert('请检查用户名，密码或验证码是否正确')
        }
    }).catch((err) => {
        console.log(err);
    })
}

function sendMail(e) {
    const btn = e.currentTarget
    btn.disabled = true
    btn.classList.add('bg-gray-400')
    btn.innerText = time.value

    axios.post('http://10.131.189.233:80/sendMail', {
        "mail": mail.value
    }).then((res) => {
        console.log(res);
        if(res.data === 1) {
            alert('发送成功')
        }else {
            alert('未知错误')
        }
    })
    
    const clock = setInterval(() => {
        time.value--
        if(time.value > 0) btn.innerText = time.value
        else {
            time.value = 60
            clearInterval(clock)
            btn.classList.remove('bg-gray-400')
            btn.innerText = '发送'
            btn.disabled = false
        }
    }, 1000)
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
                placeholder="请输入用户名"
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isNameMatch" class="text-xs text-red-500">* 用户名必须在4~16位，且只包含数字，字母，横线</div>
        
        <input type="password" v-model="password" @blur="pwdCheck" 
                placeholder="请输入密码"
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <div v-if="!isPwdMatch" class="text-xs text-red-500">* 密码必须不少于六位，且必须包含一个字母，一个数字</div>
        <input type="text" v-model="mail" @blur="mailCheck" 
                placeholder="请输入QQ邮箱"
                class="transition w-9/12 h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        <button class="w-1/5 h-8 ml-2 bg-blue-500 rounded-sm text-white" @click="sendMail($event)">发送</button>
        <div v-if="!isMailMatch" class="text-xs text-red-500">* 请输入正确的邮箱格式</div>
        
        <input type="text" v-model="verify" 
                placeholder="请输入验证码"
                class="transition w-full h-8 m-3 mx-auto rounded-sm border border-gray-200 border-dashed focus:ring focus:ring-blue-200 focus:border-0">
        
        <button class="w-full h-8 m-3 bg-blue-500 mx-auto text-white rounded-sm" @click="regist">注册</button>
    </div>
</template>