document.addEventListener('DOMContentLoaded', function () {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalWidget = document.getElementById('terminal-widget');
    const soundEffect = new Audio('assets/audio/keypress.mp3');

    function typeText(text) {
        const newLine = document.createElement('p');
        terminalOutput.appendChild(newLine);

        let i = 0;
        function addChar() {
            if (i < text.length) {
                newLine.textContent += text[i];
                playSound();
                i++;
                setTimeout(addChar, 30);
            }
        }

        addChar();
    }
    function playSound() {    soundEffect.currentTime = 0;     soundEffect.play().catch(e => console.log("Звук не воспроизведён")); }

    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            terminalInput.value = '';
            switch (command) {
                case 'help':
                    typeText("Команды:\nhelp - помощь \nexit - выход");
                    break;
                case 'доброе утро':
                    typeText("https://imgur.com/a/aU7zqZZ");
                    break;
                case 'members':
                    typeText('Гамет, Легг, Пакет, Оранж, Нубас');
                    break;
                case '243':
                    typeText('Частота 243 Гц: сигнал активен');
                    break;
                case 'мопс':
                    typeText("Команда 'Мопс' принята. Запускаем протокол 'Добрый мальчик\nОбнаружен аномальный объект: 'Мопс-247'. Характеристики: милота 200%, опасность 0%.\nВнимание! Мопсы переносят СС-243 в своём ДНК!");
                    break;
                case 'ангар':
                    window.location.href = "map.html"
                   break;
                case 'нубас':
                    const soundEffect = new Audio('assets/audio/nicemusic.mp3')
                    soundEffect.play();
                    break;
                    
                case 'exit':
                    terminalOutput.innerHTML += "<p>Выход из системы...</p>";
                    setTimeout(() => {
                        terminalWidget.style.display = 'none';
                    }, 2000);
                    break;
                default:
                    typeText("Неизвестная команда. Попробуйте 'help' для списка доступных команд.");
            }
        }
    });
});
