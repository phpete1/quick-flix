<template>
    <div>
        <router-link v-if="$route.name !== 'home'" to="/" class="absolute right-4 top-4 text-slate-500 dark:text-slate-50"><i class="fa-solid fa-xmark text-lg"></i></router-link>
        <div class="cursor-pointer text-4xl w-fit mx-auto">
            <span class="font-light text-black dark:text-white">quick</span>
            <span class="font-black text-rose-600">flix</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>