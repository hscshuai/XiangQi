<template>
  <div class="chessboard" @mouseleave="gridPosition = null">
    <div class="across" v-for="(across, i) in board" :key="i">
      <div class="point" :x="j" :y="i" v-for="(point, j) in across" :key="j"
        @click="checkChessPieces({x:j,y:i}, $event)"
        @mouseenter="checkGrid({x:j,y:i})"
      >
        <component
        v-if="point.chess" 
        :pieces="point" 
        :is="getComponent(point.chess.componentName)" >
        </component>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineAsyncComponent } from "vue";
import ChessRules from "@/utils/ChessRules.js";

defineProps({
  msg: String,
});

// 象棋棋盘
const board = ref(APPCONFIG.position);

// 获取组件
const getComponent = (componentName) => {
  return defineAsyncComponent(() =>
    import(`@/components/ChessPieces/${componentName}/index.vue`)
  );
}

// 鼠标所在格子
const cPosition = ref(null)
const checkGrid = (position) => {
  // console.log("🚀 ~ checkGrid ~ position:", position)
  cPosition.value = position;
}
// 当前应该行动的阵营
let side = -1;
// 选中棋子的格子
const oPosition = ref(null)
// 选中的棋子的dom元素
const chessPieces = ref(null)

const checkChessPieces = (position,e) => {
  if(chessPieces.value === null && e.target.className.includes("point")){
    e.preventDefault();
    return;
  }
  if(chessPieces.value === null){
    if(board.value[position.y][position.x].chess.side !== side)return;
    chessPieces.value = e.target;
    oPosition.value = position;
    changeCheckPiecesStyle(true)
    // 添加事件监听器
    document.addEventListener('mousemove', piecesMouseMove);
  }else{
    moveAPiece(cPosition.value, oPosition.value)
    side = -side;
    changeCheckPiecesStyle(false)
    chessPieces.value = null
    // 移除事件监听器
    document.removeEventListener('mousemove', piecesMouseMove);
  }
}

/**
 * 移动棋子到新位置
 * @param c 当前鼠标所在的格子位置 {x: number, y: number}
 * @param o 棋子原来所在的格子位置 {x: number, y: number}
 */
const moveAPiece = (c,o) => {
  const oPiece = JSON.parse(JSON.stringify(board.value[o.y][o.x]));
  const cPiece = JSON.parse(JSON.stringify(board.value[c.y][c.x]));
  if(pieceMovementRules(cPiece,oPiece,c,o)){
    board.value[c.y][c.x].chess = oPiece.chess
    delete board.value[o.y][o.x].chess
  }
}

// TODO 移动棋子的规则 未完成
const pieceMovementRules = (cPiece,oPiece, c, o) => {
  // 移动的格子位置不能和原来的格子位置相同
  let flag = (c !== null && (c.x !== o.x || c.y !== o.y));
  if(!flag) return flag;
  // 不能吃同阵营的棋子
  if(cPiece.hasOwnProperty("chess") && oPiece.hasOwnProperty("chess")){
    flag = (cPiece.chess.side !== oPiece.chess.side)
    if(!flag) return flag;
  }
  // 判断棋子的移动是否符合规则
  flag = ChessRules[oPiece.chess.componentName + "Rule"](c, o, board.value);
  if(flag && cPiece.hasOwnProperty("chess") && cPiece.chess.componentName === "Shuai"){
    // TODO 胜利
  } 
  return flag;
}


const piecesMouseMove = (event) => {
  chessPieces.value.style.top = event.clientY - 50 + "px";
  chessPieces.value.style.left = event.clientX - 45 + "px";
}

const changeCheckPiecesStyle = (flag) => {
  if(flag){
    chessPieces.value.style.position =  "fixed"
    chessPieces.value.style.pointerEvents = "none";
  }else{
    chessPieces.value.style.position = "static"
    chessPieces.value.style.top = "auto";
    chessPieces.value.style.left = "auto";
    chessPieces.value.style.pointerEvents = "auto";
  }
}


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
  position: relative;
  height: 90px;
  width: 100px;
}
</style>
