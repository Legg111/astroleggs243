

<script>
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorSound = new Audio('assets/audio/static.mp3');
    const accessSound = new Audio('assets/audio/access.mp3');
    const introWrapper = document.getElementById('intro-wrapper');
    const introVideo = document.getElementById('intro-video');
    const terminalWidget = document.getElementById('terminal-widget');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const pupil = document.getElementById('pupil');

    loginBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const eye = document.querySelector('.eye');
        const eyeRect = eye.getBoundingClientRect();

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);

        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 15);
        const offsetX = distance * Math.cos(angle);
        const offsetY = distance * Math.sin(angle);

        if (pupil) {
            pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });

    const commandConstructor = {
        commands: {},
        addCommand: function(commandName, commandAction) {
            this.commands[commandName] = commandAction;
        },
        processCommand: function(command) {
            command = command.toLowerCase().trim();
            if (this.commands[command]) {
                this.commands[command]();
            }
        }
    };

    function checkPassword() {
        const password = passwordInput.value.trim();
        const hashed = CryptoJS.SHA256(password).toString();
        loginBtn.style.transform = 'scale(0.95)';
        setTimeout(() => loginBtn.style.transform = 'scale(1)', 100);

        const accessMap = {
            'b30b4c5ae3b152d5c0ac4c226baf35ae9ce3103f04d2e8f79d2be38308932c6e': 'protocols.html', // 243delta
            'b4d6f26e7d84a4e20cc582b28c62789747b598e51e3fe5859f1e019f2060db59': 'voice9.html',     // Голос9
            '8e9c42e810b52ce594fdce9e0e9e22fd9cc38e631580d5189bb805b5f4c65f40': 'morvan.html',      // ХетрМорван
            '96f84287880187f68a60b04c4aa7d5d89b017cf01ce55cdb02851c9487b84a25': 'secret.html'       // антенныподкожей
        };

        const specialActions = {
            '0a742d8787e68e54fbc251061cfb538df0a328dc90c6f2fd58c1c35437072f03': showTerminal, // терминал
            'fb979c4691ac9787a2b34bb5412c0eea2a0fd515d3a931e26a75b08cf199ae89': startCountdown, // 7секунд
            'd88bbf08b6813cf6172ac3ebbe5ff0d0e4e6f59306d308e61b33d16723c7fa77': showQuote        // клеткапуста
        };

        if (accessMap[hashed]) {
            grantAccess(accessMap[hashed]);
        } else if (specialActions[hashed]) {
            specialActions[hashed]();
        } else {
            showError();
        }
    }

    function showTerminal() {
        terminalWidget.style.display = 'block';
        terminalInput.focus();
        addTerminalOutput('> Терминал Фонда Астролегги активирован');
        addTerminalOutput('> Введите "help" для списка команд');
        playSound(accessSound);
    }

    function addTerminalOutput(text) {
        const line = document.createElement('div');
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        let i = 0;
        function typeChar() {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 50);
            }
        }
        typeChar();
    }

    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            addTerminalOutput(`> ${command}`);
            commandConstructor.processCommand(command);
            this.value = '';
        }
    });

    function grantAccess(page) {
        playSound(accessSound);
        setTimeout(() => window.location.href = page, 1000);
    }

    function showError() {
        playSound(errorSound);
        const terminal = document.querySelector('.terminal');
        const errorMsg = document.createElement('p');
        errorMsg.textContent = '>_ ОШИБКА ДОСТУПА. СООБЩЕНИЕ ЗАПИСАНО.';
        errorMsg.style.color = '#f00';
        terminal.appendChild(errorMsg);

        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
            errorMsg.remove();
        }, 3000);
    }

    function startCountdown() {
        document.body.innerHTML = `
            <div class="terminal">
                <h1 class="blink" id="countdown">ОСТАЛОСЬ: 7 СЕКУНД</h1>
            </div>
        `;
        let count = 7;
        const countdownElem = document.getElementById('countdown');

        const timer = setInterval(() => {
            count--;
            countdownElem.textContent = `ОСТАЛОСЬ: ${count} СЕКУНД`;
            if (count <= 0) {
                clearInterval(timer);
                document.body.style.backgroundColor = '#000';
                document.body.innerHTML = '<p class="terminal">СУБЪЕКТ САНАЦИРОВАН.</p>';
            }
        }, 1000);
    }

    function showQuote() {
        document.body.innerHTML = `
            <div class="terminal">
                <p class="glitch" data-text="Мы вскрыли небо и нашли под ним не бога, а клетку. Но клетка пуста. Или была?..">
                    Мы вскрыли небо и нашли под ним не бога, а клетку. Но клетка пуста. Или была?..</p>
            </div>
        `;
    }

    function playSound(sound) {
        if (!sound.paused) {
            sound.currentTime = 0;
        }
        sound.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }

    setInterval(() => {
        const texts = document.querySelectorAll('p, h1, h2, h3');
        texts.forEach(text => {
            if (Math.random() > 0.95) {
                text.classList.add('glitch');
                setTimeout(() => text.classList.remove('glitch'), 200);
            }
        });
    }, 3000);

    createStars();
});

function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: #0f0;
            border-radius: 50%;
            top: ${Math.random() * 100}% ;
            left: ${Math.random() * 100}% ;
            opacity: ${Math.random()} ;
            animation: twinkle ${2 + Math.random() * 3}s infinite alternate;
        `;
        starsContainer.appendChild(star);
    }
}
</script>
