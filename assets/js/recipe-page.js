/**
 * PAPA FLY Recipe Page JavaScript
 * - Mode tab switching
 * - Timer functionality
 * - Share functionality
 */

// ==================== Mode Tabs ====================
document.querySelectorAll('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.mode;

    // Update active tab
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update active content
    document.querySelectorAll('.mode-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`mode-${mode}`)?.classList.add('active');
  });
});

// ==================== Timer ====================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

const timerModal = document.getElementById('timer-modal');
const timerDisplay = document.getElementById('timer-display');
const timerStart = document.getElementById('timer-start');
const timerReset = document.getElementById('timer-reset');
const timerClose = document.getElementById('timer-close');

// Open timer modal
document.querySelectorAll('.timer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const minutes = parseInt(btn.dataset.minutes, 10) || 1;
    timerSeconds = minutes * 60;
    updateTimerDisplay();
    timerModal?.classList.remove('hidden');
    timerRunning = false;
    if (timerStart) timerStart.textContent = '▶️ Iniciar';
  });
});

// Start/Pause timer
timerStart?.addEventListener('click', () => {
  if (timerRunning) {
    // Pause
    clearInterval(timerInterval);
    timerRunning = false;
    timerStart.textContent = '▶️ Iniciar';
  } else {
    // Start
    timerRunning = true;
    timerStart.textContent = '⏸️ Pausar';
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        // Timer complete
        clearInterval(timerInterval);
        timerRunning = false;
        timerStart.textContent = '▶️ Iniciar';
        playAlarm();
      }
    }, 1000);
  }
});

// Reset timer
timerReset?.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 0;
  updateTimerDisplay();
  if (timerStart) timerStart.textContent = '▶️ Iniciar';
});

// Close modal
timerClose?.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timerModal?.classList.add('hidden');
});

// Close on background click
timerModal?.addEventListener('click', (e) => {
  if (e.target === timerModal) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerModal.classList.add('hidden');
  }
});

function updateTimerDisplay() {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  if (timerDisplay) {
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

function playAlarm() {
  // Visual feedback
  if (timerDisplay) {
    timerDisplay.style.color = '#81C784';
    timerDisplay.textContent = '✓ ¡Listo!';
  }

  // Try to play sound (may be blocked by browser)
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 500);
  } catch (e) {
    // Audio not supported, visual feedback is enough
  }

  // Vibration if supported
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  // Reset display after 2 seconds
  setTimeout(() => {
    if (timerDisplay) {
      timerDisplay.style.color = '';
    }
  }, 2000);
}

// ==================== Share ====================
window.shareRecipe = function() {
  const title = document.querySelector('.recipe-hero h1')?.textContent || 'PAPA FLY Recipe';
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: '80% sabor en casa - PAPA FLY',
      url: url
    }).catch(() => {
      // User cancelled or error
      fallbackShare(url);
    });
  } else {
    fallbackShare(url);
  }
};

function fallbackShare(url) {
  // Copy to clipboard
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado! / 링크 복사됨!');
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link copiado! / 링크 복사됨!');
  });
}

// PWA Service Worker 비활성화 - 브라우저 메뉴(번역/읽어주기) 사용을 위해 바로가기 모드로 전환
