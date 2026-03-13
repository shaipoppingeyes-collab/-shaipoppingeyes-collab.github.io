const files = [
    { id: 'mem', title: 'memory_scan.log', content: 'Memory block recovery successful.\n\nRecovered archive fragment:\nNODE_03' },
    { id: 'stage2', title: 'stage2_note.txt', content: 'Recovered archive link:\n\nhttp://archive.local/stage2.html' },
    { id: 'notes', title: 'Notes.txt', content: 'They told me the archive was empty.\nBut new records keep appearing...\n\n— Vale' },
    { id: 'del_user', title: 'deleted_user.log', content: 'user archive deletion attempt detected\nrecovery incomplete' },
    { id: 'case1', title: 'casefile_01.txt', content: 'Subject: Unknown Individual\nStatus: Record Incomplete...' },
    { id: 'case2', title: 'casefile_02.txt', content: 'Intercepted transmission:\n20-8-5 1-18-3-8-9-22-5 18-5-13-5-13-2-5-18-19' },
    { id: 'case3', title: 'casefile_03.txt', content: 'Terminal requires a specific phrase to unlock Node 03.' }
];

const desktopIcons = [
    { name: 'Recycle Bin', img: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-0.png' },
    { name: 'Notes.txt', img: 'https://win98icons.alexmeub.com/icons/png/notepad-0.png' },
    { name: 'Browser', img: 'https://win98icons.alexmeub.com/icons/png/internet_explorer-0.png' },
    { name: 'System Info', img: 'https://win98icons.alexmeub.com/icons/png/computer-0.png' }
];

document.getElementById('init-btn').addEventListener('click', () => {
    document.getElementById('boot-screen').style.display = 'none';
    document.getElementById('desktop').style.display = 'block';
    document.getElementById('bg-music').play();

    // Auto-open requested windows
    files.forEach((file, index) => {
        setTimeout(() => createWindow(file.title, file.content, 50 + (index * 30), 50 + (index * 30)), index * 200);
    });
    
    // Open Terminal & Image
    createWindow('Terminal', 'C:\\> _', 400, 300);
    createWindow('photo_fragment.png', '<img src="https://via.placeholder.com/200?text=CORRUPTED+IMAGE" width="100%">', 600, 100);
});

function createWindow(title, content, x, y) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.left = x + 'px';
    win.style.top = y + 'px';
    win.innerHTML = `
        <div class="window-header">
            <span>${title}</span>
            <button onclick="this.parentElement.parentElement.remove()">X</button>
        </div>
        <div class="window-content">${content.replace(/\n/g, '<br>')}</div>
    `;
    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
}

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.querySelector('.window-header').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Generate Icons
const grid = document.getElementById('icon-grid');
desktopIcons.forEach(icon => {
    grid.innerHTML += `<div class="icon"><img src="${icon.img}">${icon.name}</div>`;
});