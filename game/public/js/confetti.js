// Código obtenido de un video tutorial de "Coding Fire" en la plataforma Youtube.
// Recuperado el 9 de junio del 2021 de https://www.youtube.com/watch?v=quSR_ZrVz6Y

export const confetti = {
  maxCount: 150, // set max confetti count
  speed: 2, // set the particle animation speed
  frameInterval: 15, // the confetti animation frame interval in milliseconds
  alpha: 1.0, // the alpha opacity of the confetti (between 0 and 1, where 1=opaque and 0=invisible)
  gradient: false, // whether to use gradients for the confetti particles
  start: null, // call to startanimation with optional timeout (mseg) or min/max random count
  stop: null, // call to stop adding confetti
  toggle: null, // call to start or stop the confetti animation depending on it's already running
  pause: null, // call to freeze confetti animation
  resume: null, // call to unfreeze confetti animation
  togglePause: null, // call to toggle whether the confetti animation is paused
  remove: null, // call to stop the confetti animation and remove all confetti immediately
  isPaused: null, // call and returns true or false depending if the confetti animation is paused
  isRunning: null, // call and returns true or false depending if the animation is running
};

(function () {
  const colors = ['rgba(30,144,255,', 'rgba(107,142,35,', 'rgba(255,215,0,', 'rgba(255,192,203,', 'rgba(106,90,205,', 'rgba(173,216,230,', 'rgba(238,130,238,', 'rgba(152,251,152,', 'rgba(70,130,180,', 'rgba(244,164,96,', 'rgba(210,105,30,', 'rgba(220,20,60,'];
  let streamingConfetti = false;
  let pause = false;
  let lastFrameTime = Date.now();
  let particles = [];
  let waveAngle = 0;
  let context = null;
  const supportsAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

  function resetParticle(particle, width, height) {
    particle.color = `${colors[(Math.floor(Math.random() * (colors.length - 0)) + 0)]}${confetti.alpha})`;
    particle.color2 = `${colors[(Math.floor(Math.random() * (colors.length - 0)) + 0)]}${confetti.alpha})`;
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
  }

  function updateParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let particle;
    waveAngle += 0.01;
    for (let i = 0; i < particles.length; i += 1) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15) { particle.y = height + 100; } else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle) - 0.5;
        particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= confetti.maxCount) {
          resetParticle(particle, width, height);
        } else {
          particles.splice(i, 1);
          i -= 1;
        }
      }
    }
  }

  function drawParticles() {
    let particle;
    let x; let x2; let y2;
    for (let i = 0; i < particles.length; i += 1) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      x2 = particle.x + particle.tilt;
      x = x2 + particle.diameter / 2;
      y2 = particle.y + particle.tilt + particle.diameter / 2;
      if (confetti.gradient) {
        const gradient = context.createLinearGradient(x, particle.y, x2, y2);
        gradient.addColorStop('0', particle.color);
        gradient.addColorStop('1.0', particle.color2);
        context.strokeStyle = gradient;
      } else { context.strokeStyle = particle.color; }
      context.moveTo(x, particle.y);
      context.lineTo(x2, y2);
      context.stroke();
    }
  }

  function runAnimation() {
    if (!pause && particles.length === 0) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
      const now = Date.now();
      const delta = now - lastFrameTime;
      if (!supportsAnimationFrame || delta > confetti.frameInterval) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        updateParticles();
        drawParticles();
        lastFrameTime = now - (delta % confetti.frameInterval);
      }
      requestAnimationFrame(runAnimation);
    }
  }

  function resumeConfetti() {
    pause = false;
    runAnimation();
  }

  function pauseConfetti() {
    pause = true;
  }

  function toggleConfettiPause() {
    if (pause) { resumeConfetti(); } else { pauseConfetti(); }
  }

  function isConfettiPaused() {
    return pause;
  }

  function stopConfetti() {
    streamingConfetti = false;
  }

  function startConfetti(timeout, minParam, maxParam) {
    let min = minParam;
    let max = maxParam;
    const width = window.innerWidth;
    const height = window.innerHeight;
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
          return window.setTimeout(callback, confetti.frameInterval);
        };
    }());
    let canvas = document.getElementById('confetti-canvas');
    if (canvas === null) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'confetti-canvas');
      canvas.setAttribute('style', 'display:block;z-index:999999;pointer-events:none;position:fixed;top:0');
      document.body.prepend(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, true);
      context = canvas.getContext('2d');
    } else if (context === null) { context = canvas.getContext('2d'); }
    let count = confetti.maxCount;
    if (min) {
      if (max) {
        if (min === max) { count = particles.length + max; } else {
          if (min > max) {
            const temp = min;
            min = max;
            max = temp;
          }
          count = particles.length + ((Math.random() * (max - min) + min) || 0);
        }
      } else { count = particles.length + min; }
    } else if (max) { count = particles.length + max; }
    while (particles.length < count) { particles.push(resetParticle({}, width, height)); }
    streamingConfetti = true;
    pause = false;
    runAnimation();
    if (timeout) {
      window.setTimeout(stopConfetti, timeout);
    }
  }

  function removeConfetti() {
    stopConfetti();
    pause = false;
    particles = [];
  }

  function toggleConfetti() {
    if (streamingConfetti) { stopConfetti(); } else { startConfetti(); }
  }

  function isConfettiRunning() {
    return streamingConfetti;
  }

  confetti.start = startConfetti;
  confetti.stop = stopConfetti;
  confetti.toggle = toggleConfetti;
  confetti.pause = pauseConfetti;
  confetti.resume = resumeConfetti;
  confetti.togglePause = toggleConfettiPause;
  confetti.isPaused = isConfettiPaused;
  confetti.remove = removeConfetti;
  confetti.isRunning = isConfettiRunning;
}());
