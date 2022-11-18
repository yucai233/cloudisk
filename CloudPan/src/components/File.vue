<script setup>

function check(e) {
    if(e.currentTarget.classList.contains('bg-blue-200')) {
        e.currentTarget.classList.remove('bg-blue-200')
        e.currentTarget.classList.remove('selected')
    }else {
        e.currentTarget.classList.add('bg-blue-200')
        e.currentTarget.classList.add('selected')
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

<style scope>
.selected {
    color: white;
}
</style>

