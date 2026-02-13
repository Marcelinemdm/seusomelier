const input = document.getElementById('command-input');
const output = document.getElementById('output');
const birthDate = new Date("2003-08-28T00:00:00");

function getUptimeString() {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }
    return `${years}Y ${months}M ${days}D`;
}


function getDateTimeString() {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0];
    const timePart = now.toTimeString().split(' ')[0];
    return `${datePart} ${timePart}`;
}

setInterval(() => {
    document.querySelectorAll('.live-clock').forEach(el => {
        el.innerText = getDateTimeString();
    });
    document.querySelectorAll('.live-uptime').forEach(el => {
        el.innerText = getUptimeString();
    });
}, 1000);

const getNeofetchHTML = () => `
<div class="neofetch-container">
    <div class="image-col">
        <img src="https://y2k.seusomelier.com.br/img/472684011_18494965459009287_7220539255364855977_n (Edit).png" alt="Avatar" class="avatar">
    </div>
    <div class="info-col">
        <div class="info-line"><span class="key">seusomelier@archlinux</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">OS:</span> <span class="val">Arch Linux x86_64</span></div>
        <div class="info-line"><span class="key">Kernel:</span> <span class="val">Linux 6.12.69-1-lts</span></div>
        <div class="info-line"><span class="key">Shell:</span> <span class="val">fish 4.4.0</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">WM:</span> <span class="val">Hyprland 0.53.3 (Wayland)</span></div>
        <div class="info-line"><span class="key">Terminal:</span> <span class="val">kitty 0.45.0</span></div>
        <div class="info-line">---------------------</div>
        <div class="info-line"><span class="key">UpTime:</span> <span class="val live-uptime">${getUptimeString()}</span></div>
        <div class="info-line"><span class="key">DateTime:</span> <span class="val live-clock">${getDateTimeString()}</span></div>
    </div>
</div>`;

const getHelpHTML = () => `
<div class="help-container">
    <div class="help-header">Seu Sommelier - Portfolio</div>
    <div style="margin-bottom: 10px">Usage: command [FLAGS]</div>
    <div style="margin-bottom: 10px">Commands:</div>
    <div class="help-grid">
        <div class="cmd-name">neofetch</div> <div class="cmd-desc">Exibir informações do sistema</div>
        <div class="cmd-name">bio</div>      <div class="cmd-desc">Sobre mim</div>
        <div class="cmd-name">social</div>   <div class="cmd-desc">Lista redes sociais</div>
        <div class="cmd-name">github</div>   <div class="cmd-desc">Abrir GitHub</div>
        <div class="cmd-name">clear</div>    <div class="cmd-desc">Limpar terminal</div>
    </div>
</div>`;


const commands = {
    neofetch: getNeofetchHTML,
    help: getHelpHTML,
    bio: () => `<p class="response">Sou um desenvolvedor apaixonado por Linux e Web.<br>Idade: ${getUptimeString()}</p>`,
    social: () => `<p class="response">Instagram, Discord, GitHub, Spotify, Email</p>`,
    clear: "clear",
    instagram: "Abrindo Instagram...",
    github: "Abrindo GitHub...",
    discord: "Abrindo Discord...",
    spotify: "Abrindo Spotify...",
    email: "Abrindo Email..."
};

window.onload = () => {
    output.innerHTML += getNeofetchHTML();
    output.innerHTML += `<p style="color: #666; margin-top: 0;">Bem-vindo! Digite 'help' para começar.</p>`;
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const fullCommand = input.value.toLowerCase().trim();
        const cmd = fullCommand.split(' ')[0];
        
        output.innerHTML += `<div class="user-command-line"><span class="prompt">seusomelier@archlinux ~&gt;</span> ${fullCommand}</div>`;

        if (commands[cmd]) {
            if (cmd === 'clear') {
                output.innerHTML = '';
            } else {
                let responseContent;
                
                if (typeof commands[cmd] === 'function') {
                    responseContent = commands[cmd]();
                } else {
                    responseContent = `<p class="response">${commands[cmd]}</p>`;
                }


                const wrapper = document.createElement('div');
                wrapper.innerHTML = responseContent;
                output.appendChild(wrapper);

                handleRedirection(cmd);
            }
        } else if (fullCommand !== "") {
            output.innerHTML += `<p class="error">Comando não encontrado: ${cmd}. Digite 'help'.</p>`;
        }

        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});

function handleRedirection(cmd) {
    const urls = {
        instagram: "https://www.instagram.com/seusomelier/",
        github: "https://github.com/Marcelinemdm",
        discord: "https://discord.com/users/287366389147238400",
        spotify: "https://open.spotify.com/playlist/26emuwehR5u21LbeL5uBR5?si=afeead2a2f3c42a0",
        email: "mailto:contato@seusomelier.com.br",
    };
    if (urls[cmd]) {
        setTimeout(() => window.open(urls[cmd], '_blank'), 1000);
    }
}