let zIndexCounter = 100;

// Clock
function updateClock() {
    const clock = document.getElementById('clock');
    setInterval(() => {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }, 1000);
}

// Open window
function openWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'flex';
        win.style.zIndex = ++zIndexCounter;
    }
}

// Close window
function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
}

// Dragging
let draggedElement = null;
let offsetX, offsetY;

function dragStart(e, element) {
    draggedElement = element;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.zIndex = ++zIndexCounter;
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
    if (draggedElement) {
        draggedElement.style.left = (e.clientX - offsetX) + 'px';
        draggedElement.style.top = (e.clientY - offsetY) + 'px';
    }
}

function dragEnd() {
    draggedElement = null;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
}

// Desktop icon clicks
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
        const target = icon.getAttribute('data-target');
        if (target === 'notes') openWindow('notes-window');
        else if (target === 'casefiles') openWindow('casefiles-window');
        else if (target === 'archive') openWindow('archive-window');
        else if (target === 'terminal') openWindow('terminal-window');
        else if (target === 'browser') openWindow('browser-window');
        else if (target === 'music') alert("WinAmp Classic\nNow Playing: Cybernetic Groove");
        else if (target === 'messenger') alert("Aurora Messenger v1.0\nDr. Elias is offline.");
    });
});

// Case file handlers
function openCaseFile(n) {
    if (n === 1) openWindow('case1-window');
    if (n === 2) openWindow('case2-window');
    if (n === 3) openWindow('case3-window');
}

function openPhoto() {
    openWindow('photo-window');
}

function openStage2Note() {
    alert("stage2_note.txt\n\nRecovered archive link:\nhttp://archive.local/stage2.html");
}

// Terminal logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim();
        terminalOutput.innerHTML += `C:\\> ${cmd}<br>`;
        
        if (cmd.toLowerCase() === 'help') {
            terminalOutput.innerHTML += 'Available: help, clear, ls, open notes, decode, whoami<br>';
        } else if (cmd.toLowerCase() === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (cmd.toLowerCase() === 'ls') {
            terminalOutput.innerHTML += 'casefile_01.txt  casefile_02.txt  casefile_03.txt  photo_fragment.png  stage2_note.txt<br>';
        } else if (cmd.toLowerCase().includes('open notes')) {
            openWindow('notes-window');
        } else if (cmd.toLowerCase().includes('decode')) {
            terminalOutput.innerHTML += 'THE ARCHIVE REMEMBERS<br>';
        } else if (cmd === '') {
            // do nothing
        } else {
            terminalOutput.innerHTML += 'Command not recognized.<br>';
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        terminalInput.value = '';
    }
});

// Initialize
window.onload = () => {
    updateClock();
    
    // Make all windows focusable
    document.querySelectorAll('.window').forEach(win => {
        win.addEventListener('mousedown', () => {
            win.style.zIndex = ++zIndexCounter;
        });
    });
    
    // Open a starting window for demo
    setTimeout(() => {
        openWindow('notes-window');
    }, 800);
};
