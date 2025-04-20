
let activeAudio = null;

// Список протоколов
const protocols = [
    {
        name: "PROTOCOL_243-D.pdf",
        date: "5016-11-07",
        content: `
            <h2>ПРОТОКОЛ 243-Δ</h2>
            <p>1. ПРЕДУПРЕЖДЕНИЕ:<br>
            "Забудь — это врата, а не светила.<br>
            Пытаясь смотреть сквозь них, мы ПРИГЛАШАЕМ ВЗГЛЯД."</p>
            <p>2. ТЕХНИЧЕСКИЙ СТАТУС:<br>
            - Реакции: Неконсистентные, нелинейные<br>
            - Состояние наблюдателя: Детрадация речи</p>
            <p class="blink">■■■ ДАЛЬНЕЙШИЕ ДАННЫЕ ЗАСЕКРЕЧЕНЫ ■■■</p>
        `
    },
    {
        name: "OBSERVATION_112.log",
        date: "5016-10-29",
        content: `
            <h2>НАБЛЮДЕНИЕ №112</h2>
            <p>Дата: 29.10.5016 03:47</p>
            <p>Объект: СС-243</p>
            <p>Описание:<br>
            В течение 243 секунд наблюдались фазовые скачки.<br>
            Температура в помещении упала до -12°C без видимой причины.<br>
            Персонал сообщил о "шепоте из углов".</p>
            <p>Примечание:<br>
            "Он не вовне. Он — внутри."</p>
        `
    },
    {
        name: "VOICE_9.wav",
        date: "5016-10-15",
        content: `
            <h2>АУДИОЗАПИСЬ №9</h2>
            <div class="custom-audio-player" data-src="assets/audio/voice9.mp3">
                <button class="play-btn">▶</button>
                <span class="progress-bar"><span class="progress"></span></span>
                <span class="time">0:00</span>
            </div>
            <p>Транскрипция:<br>
            "...клетка... пуста...<br>
            ...антенны... под кожей..."</p>
        `
    }
];


document.addEventListener('DOMContentLoaded', function () {
    const filesContainer = document.getElementById('files');

    protocols.forEach(protocol => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-icon"></div>
            <div class="file-details">
                <div class="file-name">${protocol.name}</div>
                <div class="file-date">${protocol.date}</div>
            </div>
        `;
        fileItem.addEventListener('click', () => openFile(protocol));
        filesContainer.appendChild(fileItem);
    });
});


function openFile(file) {
    const viewer = document.getElementById('file-viewer');
    const content = document.getElementById('viewer-content');

    content.innerHTML = `
        <h2>${file.name}</h2>
        ${file.content}
    `;
    viewer.style.display = 'block';

    if (file.name === 'VOICE_9.wav') {
        initCustomAudioPlayer(content);
    }
}


function closeViewer() {
    const viewer = document.getElementById('file-viewer');
    viewer.style.display = 'none';

    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }

    document.getElementById('viewer-content').innerHTML = '';
}

// Кастомный плеер
function initCustomAudioPlayer(container) {
    const player = container.querySelector('.custom-audio-player');
    if (!player) return;

    const playBtn = player.querySelector('.play-btn');
    const progressBar = player.querySelector('.progress');
    const timeDisplay = player.querySelector('.time');
    const audio = new Audio(player.dataset.src);


    if (activeAudio && !activeAudio.paused) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
    }
    activeAudio = audio;

    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    });

    audio.addEventListener('play', () => {
        isPlaying = true;
        playBtn.textContent = '⏸';
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.textContent = '▶';
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        timeDisplay.textContent = formatTime(audio.currentTime);
    });
    document.addEventListener("DOMContentLoaded", () => {

      document.body.classList.add("fade-in");

      const folders = document.querySelectorAll('.folder');
      const filesContainer = document.getElementById('files');
      const viewer = document.getElementById("file-viewer");
      const viewerContent = document.getElementById("viewer-content");

      const filesByFolder = {
        protocols: [
          { name: "Протокол Θ-17", date: "243.02.01", content: "Содержимое протокола Θ-17..." },
          { name: "Протокол KX-11", date: "243.01.28", content: "Содержимое протокола KX-11..." }
        ],
        audios: [],
        dossier: [],
        sector: []
      };

      folders.forEach(folder => {
        folder.addEventListener('click', () => {
          const folderName = folder.getAttribute('data-folder');
          const files = filesByFolder[folderName] || [];
          filesContainer.innerHTML = '';
          files.forEach(file => {
            const el = document.createElement('div');
            el.className = 'file-item';
            el.innerHTML = `
              <div class="file-icon"></div>
              <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-date">${file.date}</div>
              </div>
            `;
            el.addEventListener('click', () => openViewer(file.content));
            filesContainer.appendChild(el);
          });
        });
      });

      window.openViewer = (content) => {
        viewerContent.innerText = content;
        viewer.classList.add("show");
        viewer.classList.add("fade-in");  // Плавное открытие
      };

      window.closeViewer = () => {
        viewer.classList.remove("show");
        viewer.classList.remove("fade-in");  // Плавное закрытие
        setTimeout(() => {
          viewerContent.innerHTML = '';
        }, 400); // Задержка, соответствующая времени анимации
      };


      const pupil = document.getElementById("pupil");
      document.addEventListener("mousemove", e => {
        const eye = document.querySelector(".eye");
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const radius = 10;
        pupil.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;
      });

      window.blinkEye = () => {
        const eye = document.querySelector(".eye");
        eye.classList.add("blink");
        setTimeout(() => eye.classList.remove("blink"), 300);
      };
    });


    function formatTime(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
}


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeViewer();
});
