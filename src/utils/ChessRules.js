class ChessRules {
  // 将/帅的移动规则
  static ShuaiRule(toPos, fromPos, board) {
    // 只能在九宫格内移动
    if (toPos.x < 3 || toPos.x > 5) return false;
    if (fromPos.y <= 4 && toPos.y > 4) return false;
    if (fromPos.y > 4 && toPos.y <= 4) return false;
    
    // 每次只能移动一格
    return Math.abs(fromPos.x - toPos.x) + Math.abs(fromPos.y - toPos.y) === 1;
  }

  // 士/仕的移动规则
  static ShiRule(toPos, fromPos, board) {
    // 只能在九宫格内移动
    if (toPos.x < 3 || toPos.x > 5) return false;
    if (fromPos.y <= 4 && toPos.y > 4) return false;
    if (fromPos.y > 4 && toPos.y <= 4) return false;
    
    // 只能斜着走
    return Math.abs(fromPos.x - toPos.x) === 1 && Math.abs(fromPos.y - toPos.y) === 1;
  }

  // 象/相的移动规则
  static XiangRule(toPos, fromPos, board) {
    // 不能过河
    if (fromPos.y <= 4 && toPos.y > 4) return false;
    if (fromPos.y > 4 && toPos.y <= 4) return false;
    
    // 只能走田字
    if (Math.abs(fromPos.x - toPos.x) !== 2 || Math.abs(fromPos.y - toPos.y) !== 2) return false;
    
    // 象眼不能被堵
    const eyeX = (fromPos.x + toPos.x) / 2;
    const eyeY = (fromPos.y + toPos.y) / 2;
    return !board[eyeY][eyeX].hasOwnProperty("chess");
  }

  // 马的移动规则
  static MaRule(toPos, fromPos, board) {
    const deltaX = Math.abs(fromPos.x - toPos.x);
    const deltaY = Math.abs(fromPos.y - toPos.y);
    // 走日字
    if (!((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1))) return false;
    // 检查马腿
    if (deltaX === 2) {
      const legX = fromPos.x > toPos.x ? fromPos.x - 1 : fromPos.x + 1;
      return !board[fromPos.y][legX].hasOwnProperty("chess");
    } else {
      const legY = fromPos.y > toPos.y ? fromPos.y - 1 : fromPos.y + 1;
      return !board[legY][fromPos.x].hasOwnProperty("chess");
    }
  }

  // 车的移动规则
  static JuRule(toPos, fromPos, board) {
    if (fromPos.x !== toPos.x && fromPos.y !== toPos.y) return false;
    // 检查路径上是否有其他棋子
    if (fromPos.x === toPos.x) {
      const minY = Math.min(fromPos.y, toPos.y);
      const maxY = Math.max(fromPos.y, toPos.y);
      for (let y = minY + 1; y < maxY; y++) {
        if (board[y][fromPos.x].hasOwnProperty("chess")) return false;
      }
    } else {
      const minX = Math.min(fromPos.x, toPos.x);
      const maxX = Math.max(fromPos.x, toPos.x);
      for (let x = minX + 1; x < maxX; x++) {
        if (board[fromPos.y][x].hasOwnProperty("chess")) return false;
      }
    }
    return true;
  }

  // 炮的移动规则
  static PaoRule(toPos, fromPos, board) {
    if (fromPos.x !== toPos.x && fromPos.y !== toPos.y) return false;
    let count = 0;
    // 检查路径上的棋子数量
    if (fromPos.x === toPos.x) {
      const minY = Math.min(fromPos.y, toPos.y);
      const maxY = Math.max(fromPos.y, toPos.y);
      for (let y = minY + 1; y < maxY; y++) {
        if (board[y][fromPos.x].hasOwnProperty("chess")) count++;
      }
    } else {
      const minX = Math.min(fromPos.x, toPos.x);
      const maxX = Math.max(fromPos.x, toPos.x);
      for (let x = minX + 1; x < maxX; x++) {
        if (board[fromPos.y][x].hasOwnProperty("chess")) count++;
      }
    }
    // 移动时不能有棋子，吃子时必须翻过一个棋子
    return board[toPos.y][toPos.x].hasOwnProperty("chess") ? count === 1 : count === 0;
  }

  // 兵/卒的移动规则
  static BingRule(toPos, fromPos, board) {
    // 未过河
    if(board[fromPos.y][fromPos.x].side === board[fromPos.y][fromPos.x].chess.side){
      // 过河前棋子不能左右走
      if(toPos.x !== fromPos.x ){
        return false;
      }
      // 棋子只能向前走
      if(toPos.y - fromPos.y !== board[fromPos.y][fromPos.x].chess.side){
        return false;
      }
    // 已过河
    }else {
      // 过河后棋子可以向左或向右走一步
      if(Math.abs(toPos.x - fromPos.x) !== 1 && Math.abs(toPos.x - fromPos.x) !== 0 ){
        return false;
      }
      // 棋子不能后退
      if(((toPos.y - fromPos.y) !== board[fromPos.y][fromPos.x].chess.side) && ((toPos.y - fromPos.y) !== 0) ){
        return false;
      }
    }
    return true;
  }

}

export default ChessRules;
