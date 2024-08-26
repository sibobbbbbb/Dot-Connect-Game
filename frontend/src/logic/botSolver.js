const solveDotConnect = (board, startRow, startCol, dotToWin) => {
  const directions = [
    [0, 1], // kanan
    [1, 0], // bawah
    [0, -1], // kiri
    [-1, 0] // atas
  ];
  
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  
  // Memeriksa apakah suatu langkah valid
  const isValid = (row, col) =>
    row >= 0 && col >= 0 && row < rows && col < cols && board[row][col] === 0 && !visited[row][col];

  // Fungsi backtracking untuk mencari jalur yang mengunjungi semua 0
  const backtrack = (row, col, path) => {
    if (path.length === dotToWin + 1) return true; // Termasuk titik awal

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      
      if (isValid(newRow, newCol)) {
        path.push([newRow, newCol]);
        visited[newRow][newCol] = true;
        
        if (backtrack(newRow, newCol, path)) return true;
        
        path.pop(); // Backtrack
        visited[newRow][newCol] = false;
      }
    }
    
    return false;
  };

  const path = [[startRow, startCol]];
  visited[startRow][startCol] = true;

  if (backtrack(startRow, startCol, path)) {
    return path;
  } else {
    return []; // Jika tidak ada solusi yang ditemukan
  }
};

export default solveDotConnect;