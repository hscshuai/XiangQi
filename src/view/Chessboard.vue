<template>
  <div class="chessboard">
    <div class="across" v-for="(across, i) in points" :key="i">
      <div class="point" :x="j" :y="i" v-for="(point, j) in across" :key="j">
        <component v-if="point.componentName" :side="point" :is="getComponent(point.componentName)" ></component>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineAsyncComponent  } from "vue";

defineProps({
  msg: String,
});

const getComponent = (componentName) => {
  return defineAsyncComponent(() =>
    import(`@/components/ChessPieces/${componentName}/index.vue`)
  );
}

// 象棋棋盘  0为黑  1为红
const points = ref(APPCONFIG.position);

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
.across {
  display: flex;
  justify-content: space-around;
}
.point {
  height: 90px;
  width: 100px;
}
</style>
