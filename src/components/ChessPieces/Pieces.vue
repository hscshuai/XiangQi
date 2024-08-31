<template>
  <div class="pieces" :style="{color: color}">
    {{ side.name }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  side: Object,
})

let color = ref("red")
if( props.side.type === 0){
  color = ref("black")
}

</script>