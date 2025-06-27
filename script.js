const canvas = document.getElementById('efecto-canvas');
const ctx = canvas.getContext('2d');
    
let width, height;
function ajustarTamano() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
ajustarTamano();
    window.addEventListener('resize', ajustarTamano);

class Flor {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 10 + Math.random() * 10;
        this.speed = 1 + Math.random() * 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.angularSpeed = 0.01 + Math.random() * 0.02;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 1.5;
        this.angle += this.angularSpeed;

        if(this.y > height) {
          this.y = -this.size;
          this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        for(let i = 0; i < 5; i++) {
          ctx.lineTo(0, this.size);
          ctx.translate(0, this.size);
          ctx.rotate((Math.PI * 2) / 10);
          ctx.lineTo(0, -this.size);
          ctx.translate(0, -this.size);
          ctx.rotate(-(Math.PI * 6) / 10);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

const flores = [];
    for(let i = 0; i < 40; i++) {
      flores.push(new Flor());
}

function animar() {
    ctx.clearRect(0, 0, width, height);
    flores.forEach(flor => {
        flor.update();
        flor.draw();
    });
    requestAnimationFrame(animar);
}
animar();

const audio = document.getElementById('audio');
const btnPlay = document.getElementById('btnPlay');
const btnMute = document.getElementById('btnMute');
const barra = document.getElementById('barra');

btnPlay.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        btnPlay.textContent = '⏸ Pausar';
      } else {
        audio.pause();
        btnPlay.textContent = '▶ Reproducir';
      }
    });

    btnMute.addEventListener('click', () => {
      audio.muted = !audio.muted;
      btnMute.textContent = audio.muted ? '🔇 Silenciado' : '🔈 Silenciar';
    });

    audio.addEventListener('timeupdate', () => {
      if(!barra.dragging) {
        barra.value = (audio.currentTime / audio.duration) * 100 || 0;
      }
    });

    barra.addEventListener('mousedown', () => {
      barra.dragging = true;
    });

barra.addEventListener('mouseup', () => {
    barra.dragging = false;
    audio.currentTime = (barra.value / 100) * audio.duration;
});

barra.addEventListener('input', () => {
    audio.currentTime = (barra.value / 100) * audio.duration;
});