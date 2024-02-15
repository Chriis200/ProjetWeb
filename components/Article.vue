<template>
    <div>
      <h1>{{ titre }}</h1>
      <div>{{ contenu }}</div>
    </div>
</template>

<script>
    export default{
        name: "Article",
        props:["titre","contenu"]
    }
</script>

<style scoped>
    
</style>