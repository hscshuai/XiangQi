<template>
  <div class="pieces" :style="{color: color}">
    {{ pieces.name }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  pieces: Object,
})

let color = ref("red")
if( props.pieces.side === 0){
  color = ref("black")
}

</script>