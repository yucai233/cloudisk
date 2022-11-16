<script setup lang="js">

check = () => {
    if(e.currentTarget.classList.includes('bg-blue-400')) {
        e.currentTarget.classList.splice(e.currentTarget.classList.findIndex(ele => ele === 'bg-blue-400'), 1)
    }else {
        e.currentTarget.classList.add('bg-blue-400')
    }
}


</script>


<template>
    <div class="w-full h-16 bg-white border border-gray-200 border-solid p-3 flex items-center cursor-pointer" @click="check($event)">
        <div class="flex items-center flex-auto">
            <i class="iconfont text-4xl mr-3">&#xe85e;</i>
            <span>清华社</span>
        </div>
        <span class="flex-1">234 KB</span>
        <span class="flex-1">2022/11/7</span>
    </div>
</template>

