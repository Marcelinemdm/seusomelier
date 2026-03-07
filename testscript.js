const input    = document.getElementById('command-input');
const output   = document.getElementById('output');
const birthDate = new Date("2003-08-28T00:00:00");

let isPlayingGame    = false;
let isPacmanInstalled = false;

const fileSystem = {
    "img": {
        type: "dir",
        content: [
            "472684011_18494965459009287_7220539255364855977_n (Edit).png",
            "ce603a0499b07f0b52fd9d72261256eb.jpg",
            "diva.jpg",
            "lisa-bose-5k-3840x2160-22486.jpg",
            "nada-para-ver-aqui.jpg",
            "taylor.jpg"
        ]
    },
    "404.html":      { type: "file" },
    "CNAME":         { type: "file" },
    "index.html":    { type: "file" },
    "style.css":     { type: "file" },
    "testscript.js": { type: "file" }
};

function getUptimeString() {
    const now = new Date();
    let years  = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth()    - birthDate.getMonth();
    let days   = now.getDate()     - birthDate.getDate();
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }
    return `${years}Y ${months}M ${days}D`;
}

function getDateTimeString() {
    const now = new Date();
    return `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
}

setInterval(() => {
    document.querySelectorAll('.live-clock').forEach(el => el.innerText = getDateTimeString());
    document.querySelectorAll('.live-uptime').forEach(el => el.innerText = getUptimeString());
}, 1000);

const getNeofetchHTML = () => `
<div class="neofetch-container">
    <div class="image-col">
        <img src="img/diva.jpg" alt="Avatar" class="avatar">
    </div>
    <div class="info-col">
        <div class="info-line"><span class="key">seusomelier@archlinux</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">OS:</span>       <span class="val">Arch Linux x86_64</span></div>
        <div class="info-line"><span class="key">Kernel:</span>   <span class="val">Linux 6.12.75-1-lts</span></div>
        <div class="info-line"><span class="key">Shell:</span>    <span class="val">fish 4.5.0</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">WM:</span>       <span class="val">Hyprland 0.54.1 (Wayland)</span></div>
        <div class="info-line"><span class="key">Terminal:</span> <span class="val">kitty 0.45.0</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">UpTime:</span>   <span class="val live-uptime">${getUptimeString()}</span></div>
        <div class="info-line"><span class="key">DateTime:</span> <span class="val live-clock">${getDateTimeString()}</span></div>
    </div>
</div>`;

const getHelpHTML = () => `
<div class="help-container">
    <div class="help-header">Seu Sommelier</div>
    <div style="margin-bottom:10px">Usage: command [FLAGS]</div>
    <div style="margin-bottom:10px">Commands:</div>
    <div class="help-grid">
        <div class="cmd-name">neofetch</div>              <div class="cmd-desc">Exibir informações do sistema</div>
        <div class="cmd-name">ls</div>                    <div class="cmd-desc">Listar arquivos</div>
        <div class="cmd-name">cat [arquivo]</div>         <div class="cmd-desc">Exibir conteúdo de um arquivo</div>
        <div class="cmd-name">speedtest</div>             <div class="cmd-desc">Testar conexão (apenas visual)</div>
        <div class="cmd-name">bio</div>                   <div class="cmd-desc">Sobre mim</div>
        <div class="cmd-name">social</div>                <div class="cmd-desc">Redes sociais</div>
        <div class="cmd-name">sudo</div>                  <div class="cmd-desc">Executar comandos root</div>
        <div class="cmd-name">pacman</div>                <div class="cmd-desc">Jogar Pacman (requer instalação)</div>
        <div class="cmd-name">sudo pacman -S pacman</div> <div class="cmd-desc">Instalar o jogo Pacman</div>
        <div class="cmd-name">clear</div>                 <div class="cmd-desc">Limpar terminal</div>
    </div>
</div>`;

const runLs = () => {
    let html = '<div class="ls-container">';
    for (const [key, value] of Object.entries(fileSystem)) {
        if (value.type === 'dir') {
            html += `<div><span class="ls-perm">drwxr-xr-x</span> <span class="ls-dir">${key}/</span></div>`;
            value.content.forEach(file => {
                html += `<div><span class="ls-perm" style="margin-left:20px">-rw-r--r--</span> <span class="ls-file">└── ${file}</span></div>`;
            });
        }
    }
    for (const [key, value] of Object.entries(fileSystem)) {
        if (value.type === 'file') {
            html += `<div><span class="ls-perm">-rw-r--r--</span> <span class="ls-file">${key}</span></div>`;
        }
    }
    return html + '</div>';
};

const runCat = (args) => {
    if (!args || args.length === 0)
        return `<p class="error">cat: faltando operando. Uso: cat [arquivo]</p>`;

    const file = args.join(' ');

    if (file === 'img/nada-para-ver-aqui.jpg' || file === 'nada-para-ver-aqui.jpg') {
        return `
        <div class="response" style="line-height:2">
            <span style="color:var(--comment)"># nada para ver aqui mesmo... ou tem?</span><br>
            <span style="color:var(--purple)">reader</span>.<span style="color:var(--cyan)">seusomelier.com.br</span>
            &nbsp;<a href="https://reader.seusomelier.com.br" target="_blank" style="color:var(--comment);font-size:12px">[abrir]</a><br>
            <span style="color:var(--purple)">watch</span>.<span style="color:var(--cyan)">seusomelier.com.br</span>
            &nbsp;<a href="https://watch.seusomelier.com.br" target="_blank" style="color:var(--comment);font-size:12px">[abrir]</a>
        </div>`;
    }

    if (file === 'CNAME')
        return `<p class="response">seusomelier.com.br</p>`;

    const knownFiles = [
        '404.html', 'index.html', 'style.css', 'testscript.js',
        'img/diva.jpg', 'img/taylor.jpg',
        'img/ce603a0499b07f0b52fd9d72261256eb.jpg',
        'img/lisa-bose-5k-3840x2160-22486.jpg',
        'img/472684011_18494965459009287_7220539255364855977_n (Edit).png'
    ];

    if (knownFiles.includes(file))
        return `<p class="error">cat: ${file}: arquivo binário ou sem prévia disponível</p>`;

    return `<p class="error">cat: ${file}: Arquivo não encontrado</p>`;
};

const runSpeedtest = (wrapper) => {
    let ping = 0, down = 0, up = 0;
    const maxDown = 850.5, maxUp = 420.2;

    wrapper.innerHTML = `
        <div class="speedtest-container">
            <div style="margin-bottom:10px">Retrieving speedtest.net configuration...</div>
            <div style="margin-bottom:10px">Testing from Starlink IO (Sao Paulo)...</div>
            <div class="st-line"><span class="st-label">Ping:</span>     <span class="st-val" id="st-ping">0 ms</span></div>
            <div class="st-line"><span class="st-label">Download:</span> <span class="st-val" id="st-down">0.00 Mbit/s</span></div>
            <div class="st-line"><span class="st-label">Upload:</span>   <span class="st-val" id="st-up">0.00 Mbit/s</span></div>
        </div>`;

    let step = 0;
    const interval = setInterval(() => {
        const pingEl = wrapper.querySelector('#st-ping');
        const downEl = wrapper.querySelector('#st-down');
        const upEl   = wrapper.querySelector('#st-up');

        if (step < 20) {
            ping = Math.floor(Math.random() * 20) + 10;
            if (pingEl) pingEl.innerText = `${ping} ms`;
        } else if (step < 60) {
            down = Math.min(down + Math.random() * 30, maxDown);
            if (downEl) downEl.innerText = `${down.toFixed(2)} Mbit/s`;
        } else if (step < 100) {
            up = Math.min(up + Math.random() * 20, maxUp);
            if (upEl) upEl.innerText = `${up.toFixed(2)} Mbit/s`;
        } else {
            clearInterval(interval);
            wrapper.innerHTML += `<div style="color:var(--cyan);margin-top:5px">Speedtest Concluído.</div>`;
            window.scrollTo(0, document.body.scrollHeight);
        }
        step++;
    }, 50);
};

const installPacman = (wrapper) => {
    const steps = [
        "resolving dependencies...",
        "looking for conflicting packages...",
        "Packages (1) pacman-1.0-1",
        "Total Download Size:  0.05 MiB",
        "Total Installed Size: 0.15 MiB",
        ":: Proceed with installation? [Y/n] Y",
        "(1/1) checking keys in keyring                   [######################] 100%",
        "(1/1) checking package integrity                 [######################] 100%",
        "(1/1) loading package files                      [######################] 100%",
        "(1/1) checking for file conflicts                [######################] 100%",
        "(1/1) checking available disk space              [######################] 100%",
        ":: Processing package changes...",
        "(1/1) installing pacman                          [######################] 100%",
        ":: Running post-transaction hooks...",
        "Pacman installed successfully!",
        "<span style='color:var(--cyan)'>Digite 'pacman' para jogar!</span>"
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            const p = document.createElement('div');
            p.innerHTML = steps[i];
            p.style.marginBottom = "2px";
            wrapper.appendChild(p);
            window.scrollTo(0, document.body.scrollHeight);
            i++;
        } else {
            clearInterval(interval);
            isPacmanInstalled = true;
        }
    }, 200);
};

const startPacmanGame = (wrapper) => {
    isPlayingGame = true;
    input.blur();

    const canvas = document.createElement('canvas');
    canvas.id = 'pacman-canvas';
    canvas.width = 300;
    canvas.height = 300;
    wrapper.appendChild(canvas);

    const hint = document.createElement('div');
    hint.className = 'game-controls-hint';
    hint.innerText = "Use as Setas para mover. Pressione 'ESC' para sair.";
    wrapper.appendChild(hint);

    const ctx  = canvas.getContext('2d');
    const cols = 15, rows = 15, size = 20;

    let map = [];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push((r === 0 || r === rows-1 || c === 0 || c === cols-1 || (r%2===0 && c%2===0)) ? 1 : 0);
        }
        map.push(row);
    }

    let pacman    = { x: 1, y: 1, dx: 0, dy: 0 };
    let score     = 0;
    let totalDots = map.flat().filter(v => v === 0).length;
    let gameEnded = false;

    const stopGame = (message = "Game Over / Quit", color = "var(--pink)") => {
        if (gameEnded) return;
        gameEnded = true;
        clearInterval(gameLoop);
        document.removeEventListener('keydown', handleGameInput);
        isPlayingGame = false;
        input.focus();
        const msg = document.createElement('div');
        msg.style.color     = color;
        msg.style.marginTop = '10px';
        msg.textContent     = message;
        wrapper.appendChild(msg);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const draw = () => {
        ctx.fillStyle = '#0d0d0d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (map[r][c] === 1) {
                    ctx.fillStyle = '#565f89';
                    ctx.fillRect(c*size, r*size, size-2, size-2);
                } else if (map[r][c] === 0) {
                    ctx.fillStyle = '#ff7eb6';
                    ctx.beginPath();
                    ctx.arc(c*size + size/2, r*size + size/2, 3, 0, Math.PI*2);
                    ctx.fill();
                }
            }
        }

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(pacman.x*size + size/2, pacman.y*size + size/2, size/2 - 2, 0.2*Math.PI, 1.8*Math.PI);
        ctx.lineTo(pacman.x*size + size/2, pacman.y*size + size/2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '14px monospace';
        ctx.fillText(`Score: ${score}`, 10, 290);

        if (score === totalDots) {
            ctx.fillStyle = '#5de4c7';
            ctx.font      = '20px monospace';
            ctx.fillText("YOU WIN!", 90, 150);
            stopGame("🎉 Você Venceu!", "var(--cyan)");
        }
    };

    const update = () => {
        if (!isPlayingGame) return;
        const nextX = pacman.x + pacman.dx;
        const nextY = pacman.y + pacman.dy;
        if (map[nextY][nextX] !== 1) {
            pacman.x = nextX;
            pacman.y = nextY;
            if (map[pacman.y][pacman.x] === 0) {
                map[pacman.y][pacman.x] = 2;
                score++;
            }
        }
    };

    const gameLoop = setInterval(() => { update(); draw(); }, 150);

    const handleGameInput = (e) => {
        const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'];
        if (gameKeys.includes(e.key)) e.preventDefault();
        if (e.key === 'ArrowUp')    { pacman.dx = 0;  pacman.dy = -1; }
        if (e.key === 'ArrowDown')  { pacman.dx = 0;  pacman.dy =  1; }
        if (e.key === 'ArrowLeft')  { pacman.dx = -1; pacman.dy =  0; }
        if (e.key === 'ArrowRight') { pacman.dx =  1; pacman.dy =  0; }
        if (e.key === 'Escape')     { stopGame(); }
    };

    document.addEventListener('keydown', handleGameInput);
};

const commands = {
    neofetch:  getNeofetchHTML,
    help:      getHelpHTML,
    ls:        runLs,
    cat:       runCat,
    bio:       () => `<p class="response">Segredo.<br>Idade: ${getUptimeString()}</p>`,
    social:    () => `
        <div class="response">
            <a href="https://www.instagram.com/seusomelier/" target="_blank">Instagram</a> &nbsp;·&nbsp;
            <a href="https://github.com/Marcelinemdm" target="_blank">GitHub</a> &nbsp;·&nbsp;
            <a href="https://discord.com/users/287366389147238400" target="_blank">Discord</a> &nbsp;·&nbsp;
            <a href="https://open.spotify.com/playlist/26emuwehR5u21LbeL5uBR5?si=afeead2a2f3c42a0" target="_blank">Spotify</a> &nbsp;·&nbsp;
            <a href="mailto:contato@seusomelier.com.br">Email</a>
        </div>`,
    instagram: () => `<p class="response">Abrindo Instagram...</p>`,
    github:    () => `<p class="response">Abrindo GitHub...</p>`,
    discord:   () => `<p class="response">Abrindo Discord...</p>`,
    spotify:   () => `<p class="response">Abrindo Spotify...</p>`,
    email:     () => `<p class="response">Abrindo Email...</p>`,
};

window.onload = () => {
    output.innerHTML += getNeofetchHTML();
    output.innerHTML += `<p style="color:#666;margin-top:0">Bem-vindo! Digite 'help' para começar.</p>`;
};

input.addEventListener('keydown', (e) => {
    if (isPlayingGame) return;
    if (e.key !== 'Enter') return;

    const fullCommand = input.value.trim();
    const parts       = fullCommand.split(' ');
    const cmd         = parts[0].toLowerCase();
    const args        = parts.slice(1);

    const cmdLine = document.createElement('div');
    cmdLine.className = 'user-command-line';
    const promptSpan = document.createElement('span');
    promptSpan.className   = 'prompt';
    promptSpan.textContent = 'seusomelier@archlinux ~> ';
    cmdLine.appendChild(promptSpan);
    cmdLine.appendChild(document.createTextNode(fullCommand));
    output.appendChild(cmdLine);

    if (fullCommand === '') {
        // nada

    } else if (cmd === 'clear') {
        output.innerHTML = '';

    } else if (cmd === 'speedtest') {
        const wrapper = document.createElement('div');
        output.appendChild(wrapper);
        runSpeedtest(wrapper);

    } else if (cmd === 'pacman') {
        const wrapper = document.createElement('div');
        output.appendChild(wrapper);
        if (isPacmanInstalled) {
            startPacmanGame(wrapper);
        } else {
            wrapper.innerHTML = `<p class="error">Pacman não instalado. Tente: 'sudo pacman -S pacman'</p>`;
        }

    } else if (cmd === 'sudo') {
        if (fullCommand === 'sudo pacman -S pacman') {
            const wrapper = document.createElement('div');
            output.appendChild(wrapper);
            installPacman(wrapper);
        } else if (fullCommand === 'sudo rm -rf /') {
            const err = document.createElement('p');
            err.className   = 'error';
            err.textContent = "rm: não é possível remover o sistema de arquivos raiz. (nice try 😄)";
            output.appendChild(err);
        } else {
            const err = document.createElement('p');
            err.className   = 'error';
            err.textContent = "sudo: comando desconhecido ou permissão negada. Tente: 'sudo pacman -S pacman'";
            output.appendChild(err);
        }

    } else if (commands[cmd]) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = commands[cmd](args);
        output.appendChild(wrapper);
        handleRedirection(cmd);

    } else {
        const err = document.createElement('p');
        err.className   = 'error';
        err.textContent = `Comando não encontrado: ${cmd}. Digite 'help'.`;
        output.appendChild(err);
    }

    input.value = '';
    window.scrollTo(0, document.body.scrollHeight);
});

function handleRedirection(cmd) {
    const urls = {
        instagram: "https://www.instagram.com/seusomelier/",
        github:    "https://github.com/Marcelinemdm",
        discord:   "https://discord.com/users/287366389147238400",
        spotify:   "https://open.spotify.com/playlist/26emuwehR5u21LbeL5uBR5?si=afeead2a2f3c42a0",
        email:     "mailto:contato@seusomelier.com.br",
    };
    if (urls[cmd]) setTimeout(() => window.open(urls[cmd], '_blank'), 1000);
}
