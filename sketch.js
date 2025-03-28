let seaweeds = []; // 儲存水草的陣列
let colors = ['#00BB00', '#006000', '#00CACA', '#00EC00', '#01814A']; // 水草顏色選項

function setup() {  //初始值設定
  // 創建畫布
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '1'); // 將畫布置於 iframe 上層
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件

  // 新增 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('border', 'none');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('z-index', '0'); // 將 iframe 放在畫布下層

  // 初始化 130 條水草
  for (let i = 0; i < 100; i++) {
    seaweeds.push({
      x: random(width), // 隨機水平位置
      height: random(80, 250), // 隨機高度
      swaySpeed: random(0.02, 0.08), // 隨機搖晃速度
      color: color(random(colors)), // 從指定顏色中隨機選擇
      thickness: random(10, 20) // 隨機粗細
    });
  }
}

function draw() {  //畫圖
  clear(); // 清除畫布，讓背景透明
  fill(220, 150); // 設定背景顏色為透明灰色 (alpha = 150)
  noStroke();
  rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8); // 畫出透明背景區域
  
  blendMode(BLEND); // 啟用混合模式
  
  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];
    let segments = 10; // 將水草分成 10 段
    let segmentHeight = seaweed.height / segments; // 每段的高度
    let baseX = seaweed.x; // 水草的基礎水平位置
    
    beginShape(); // 開始繪製水草的形狀
    noFill(); // 不填充內部顏色
    stroke(seaweed.color); // 設定水草的顏色
    strokeWeight(seaweed.thickness); // 設定水草的粗細
    
    for (let j = 0; j <= segments; j++) {
      let sway = sin(frameCount * seaweed.swaySpeed + j * 0.5) * (seaweed.height / 20); // 每段的搖晃幅度和相位
      let x = baseX + sway; // 當前段的水平位置
      let y = height - j * segmentHeight; // 當前段的垂直位置
      vertex(x, y); // 添加頂點
    }
    endShape(); // 結束繪製水草的形狀
  }
}

function windowResized() {  //視窗大小改變
  resizeCanvas(windowWidth, windowHeight); //畫布大小
  
  // 重新計算每根水草的水平位置
  for (let i = 0; i < seaweeds.length; i++) {
    seaweeds[i].x = random(width); // 根據新的畫布寬度重新隨機水平位置
  }
}
