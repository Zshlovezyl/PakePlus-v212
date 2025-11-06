<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>幸运大抽奖 - 小球抽取系统</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
  
  <!-- 配置Tailwind自定义颜色 -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#e61e25',
            secondary: '#ffc800',
          },
        }
      }
    }
  </script>
  
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .text-shadow {
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .shake {
        animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
      }
      @keyframes shake {
        10%, 90% { transform: translateX(-8px) rotate(-3deg); }
        20%, 80% { transform: translateX(8px) rotate(3deg); }
        30%, 50%, 70% { transform: translateX(-12px) rotate(-5deg); }
        40%, 60% { transform: translateX(12px) rotate(5deg); }
      }
      .pulse-btn {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(255, 200, 0, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0); }
      }
      .slide-in {
        animation: slideIn 0.3s ease-out forwards;
      }
      @keyframes slideIn {
        from { transform: translateX(-10px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    }
  </style>
</head>

<body class="bg-gray-50 min-h-screen font-sans">
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <!-- 标题区域 -->
    <header class="text-center mb-8">
      <h1 class="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-primary text-shadow mb-2">
        幸运大抽奖
      </h1>
      <p class="text-gray-600">小球随机抽取模拟系统</p>
    </header>
    
    <!-- 主要内容区域 -->
    <main class="flex flex-col lg:flex-row gap-6">
      <!-- 左侧：小球数量调整 -->
      <div class="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-5 order-2 lg:order-1">
        <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          <i class="fa fa-sliders mr-2 text-primary"></i>调整小球数量
        </h2>
        
        <!-- 红色小球 -->
        <div class="mb-5">
          <div class="flex justify-between items-center mb-2">
            <label class="text-gray-700">红色小球</label>
            <span id="red-count" class="bg-gray-100 px-3 py-1 rounded-full font-medium">5</span>
          </div>
          <div class="flex gap-2">
            <button id="red-minus" class="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors">
              <i class="fa fa-minus"></i>
            </button>
            <button id="red-plus" class="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded transition-colors">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
        
        <!-- 蓝色小球 -->
        <div class="mb-5">
          <div class="flex justify-between items-center mb-2">
            <label class="text-gray-700">蓝色小球</label>
            <span id="blue-count" class="bg-gray-100 px-3 py-1 rounded-full font-medium">3</span>
          </div>
          <div class="flex gap-2">
            <button id="blue-minus" class="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors">
              <i class="fa fa-minus"></i>
            </button>
            <button id="blue-plus" class="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded transition-colors">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
        
        <!-- 黄色小球 -->
        <div class="mb-5">
          <div class="flex justify-between items-center mb-2">
            <label class="text-gray-700">黄色小球</label>
            <span id="yellow-count" class="bg-gray-100 px-3 py-1 rounded-full font-medium">2</span>
          </div>
          <div class="flex gap-2">
            <button id="yellow-minus" class="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors">
              <i class="fa fa-minus"></i>
            </button>
            <button id="yellow-plus" class="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded transition-colors">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
        
        <!-- 抽取按钮 -->
        <button id="draw-btn" class="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-lg pulse-btn transition-all">
          <i class="fa fa-random mr-2"></i> 抽取小球
        </button>
      </div>
      
      <!-- 中间：抽奖箱 -->
      <div class="w-full lg:w-2/4 flex flex-col items-center order-1 lg:order-2">
        <div id="lottery-box" class="relative w-full max-w-md aspect-square mb-6 transform transition-all duration-300 hover:shadow-xl">
          <img src="https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/b8738c89e7b24c5881f17e0e310b45e0.png~tplv-a9rns2rl98-24-95-exif:960:960.png?rcl=20251105104524CC142EC3B18947A61173&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1762915524&x-signature=W82OJrIOKP7Qc13sRoPSAE3ZMtM%3D" 
               alt="幸运大抽奖箱" 
               class="w-full h-full object-cover rounded-lg shadow-lg">
        </div>
        
        <!-- 抽取结果显示 -->
        <div id="result-display" class="hidden bg-white px-6 py-3 rounded-lg shadow-md text-center slide-in">
          <p class="text-gray-600 mb-1">本次抽取结果</p>
          <p id="current-result" class="text-xl font-bold text-primary"></p>
        </div>
      </div>
      
      <!-- 右侧：抽取记录 -->
      <div class="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-5 order-3">
        <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          <i class="fa fa-history mr-2 text-primary"></i>抽取记录
        </h2>
        
        <div id="history-container" class="max-h-[400px] overflow-y-auto pr-2 space-y-2">
          <div class="text-gray-400 text-center py-10">
            <i class="fa fa-file-text-o text-3xl mb-2 opacity-30"></i>
            <p>暂无抽取记录</p>
          </div>
        </div>
      </div>
    </main>
    
    <footer class="mt-12 text-center text-gray-500 text-sm">
      <p>© 2023 幸运大抽奖系统 | 点击按钮或按空格键进行抽取</p>
    </footer>
  </div>

  <script>
    // 小球数量管理（用户不可见具体颜色对应关系）
    const ballCounts = {
      red: 5,
      blue: 3,
      yellow: 2
    };
    
    // 抽取历史记录
    let drawHistory = [];
    
    // DOM元素
    const elements = {
      // 数量显示和控制
      redCount: document.getElementById('red-count'),
      blueCount: document.getElementById('blue-count'),
      yellowCount: document.getElementById('yellow-count'),
      redMinus: document.getElementById('red-minus'),
      redPlus: document.getElementById('red-plus'),
      blueMinus: document.getElementById('blue-minus'),
      bluePlus: document.getElementById('blue-plus'),
      yellowMinus: document.getElementById('yellow-minus'),
      yellowPlus: document.getElementById('yellow-plus'),
      
      // 抽奖相关
      lotteryBox: document.getElementById('lottery-box'),
      drawBtn: document.getElementById('draw-btn'),
      resultDisplay: document.getElementById('result-display'),
      currentResult: document.getElementById('current-result'),
      historyContainer: document.getElementById('history-container')
    };
    
    // 更新小球数量显示
    function updateBallDisplays() {
      elements.redCount.textContent = ballCounts.red;
      elements.blueCount.textContent = ballCounts.blue;
      elements.yellowCount.textContent = ballCounts.yellow;
    }
    
    // 创建所有小球的数组（用于随机抽取）
    function getAllBalls() {
      let balls = [];
      for (let i = 0; i < ballCounts.red; i++) balls.push('red');
      for (let i = 0; i < ballCounts.blue; i++) balls.push('blue');
      for (let i = 0; i < ballCounts.yellow; i++) balls.push('yellow');
      return balls;
    }
    
    // 随机抽取小球
    function drawBall() {
      const allBalls = getAllBalls();
      if (allBalls.length === 0) {
        alert('请先添加小球');
        return null;
      }
      
      const randomIndex = Math.floor(Math.random() * allBalls.length);
      return allBalls[randomIndex];
    }
    
    // 记录并显示抽取结果
    function recordResult(color) {
      if (!color) return;
      
      // 颜色文本映射
      const colorMap = {
        red: '红色',
        blue: '蓝色',
        yellow: '黄色'
      };
      
      // 更新当前结果显示
      elements.resultDisplay.classList.remove('hidden');
      elements.currentResult.textContent = `${colorMap[color]}小球`;
      
      // 添加到历史记录
      const timestamp = new Date().toLocaleTimeString();
      drawHistory.unshift({ color, timestamp });
      
      // 更新历史记录显示
      updateHistoryDisplay();
    }
    
    // 更新历史记录显示
    function updateHistoryDisplay() {
      // 清空容器
      elements.historyContainer.innerHTML = '';
      
      // 如果没有记录
      if (drawHistory.length === 0) {
        elements.historyContainer.innerHTML = `
          <div class="text-gray-400 text-center py-10">
            <i class="fa fa-file-text-o text-3xl mb-2 opacity-30"></i>
            <p>暂无抽取记录</p>
          </div>
        `;
        return;
      }
      
      // 添加记录
      drawHistory.forEach((record, index) => {
        const colorMap = {
          red: 'text-red-600 bg-red-50',
          blue: 'text-blue-600 bg-blue-50',
          yellow: 'text-yellow-600 bg-yellow-50'
        };
        
        const item = document.createElement('div');
        item.className = `p-2 rounded-lg ${colorMap[record.color]} flex justify-between items-center slide-in`;
        item.style.animationDelay = `${index * 50}ms`;
        item.innerHTML = `
          <span>第${drawHistory.length - index}次: ${colorMap[record.color].includes('red') ? '红色' : colorMap[record.color].includes('blue') ? '蓝色' : '黄色'}小球</span>
          <span class="text-xs text-gray-500">${record.timestamp}</span>
        `;
        
        elements.historyContainer.appendChild(item);
      });
    }
    
    // 绑定事件
    function bindEvents() {
      // 红色小球数量调整
      elements.redMinus.addEventListener('click', () => {
        if (ballCounts.red > 0) {
          ballCounts.red--;
          updateBallDisplays();
        }
      });
      
      elements.redPlus.addEventListener('click', () => {
        ballCounts.red++;
        updateBallDisplays();
      });
      
      // 蓝色小球数量调整
      elements.blueMinus.addEventListener('click', () => {
        if (ballCounts.blue > 0) {
          ballCounts.blue--;
          updateBallDisplays();
        }
      });
      
      elements.bluePlus.addEventListener('click', () => {
        ballCounts.blue++;
        updateBallDisplays();
      });
      
      // 黄色小球数量调整
      elements.yellowMinus.addEventListener('click', () => {
        if (ballCounts.yellow > 0) {
          ballCounts.yellow--;
          updateBallDisplays();
        }
      });
      
      elements.yellowPlus.addEventListener('click', () => {
        ballCounts.yellow++;
        updateBallDisplays();
      });
      
      // 抽取按钮
      elements.drawBtn.addEventListener('click', performDraw);
      
      // 键盘支持（空格键）
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !elements.drawBtn.disabled) {
          e.preventDefault();
          performDraw();
        }
      });
    }
    
    // 执行抽奖过程
    function performDraw() {
      // 禁用按钮防止重复点击
      elements.drawBtn.disabled = true;
      elements.drawBtn.classList.remove('pulse-btn');
      elements.drawBtn.classList.add('opacity-70', 'cursor-not-allowed');
      
      // 纸箱抖动（1秒）
      elements.lotteryBox.classList.add('shake');
      
      // 1秒后显示结果
      setTimeout(() => {
        elements.lotteryBox.classList.remove('shake');
        
        // 抽取并记录结果
        const result = drawBall();
        recordResult(result);
        
        // 重新启用按钮
        elements.drawBtn.disabled = false;
        elements.drawBtn.classList.add('pulse-btn');
        elements.drawBtn.classList.remove('opacity-70', 'cursor-not-allowed');
      }, 1000); // 抖动1秒
    }
    
    // 初始化
    function init() {
      updateBallDisplays();
      bindEvents();
    }
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
