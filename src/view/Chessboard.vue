<template>
  <div class="chessboard">
    <div class="point" v-for="point,index in points" :key="index"></div>
  </div>  
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const points = ref(new Array(90))
</script>

<style scoped>
.chessboard {
  position: relative;
  top: calc(50% - 450px);
  height: 900px;
  width: 900px;
  margin: auto;
  background: url(./../assets/img/chessboard.jpg) center/100% 100%;
}
.point {
  height: 90px;
  width: 100px;
}
</style>
