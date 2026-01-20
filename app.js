// CrypThreads Application Logic

// Global variables
let blockchain;
let currentUser = null;
let users = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load blockchain from localStorage
    const savedBlockchain = localStorage.getItem('crypthreads_blockchain');
    if (savedBlockchain) {
        blockchain = Blockchain.fromJSON(savedBlockchain);
    } else {
        blockchain = new Blockchain();
        saveBlockchain();
    }

    // Load users from localStorage
    const savedUsers = localStorage.getItem('crypthreads_users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        users = [];
        saveUsers();
    }

    // Check for existing session
    const savedSession = localStorage.getItem('crypthreads_session');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        // Verify session is still valid (within 30 days)
        const sessionAge = Date.now() - session.timestamp;
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        
        if (sessionAge < thirtyDays) {
            currentUser = session.username;
            showDashboard();
            return;
        } else {
            // Session expired, clear it
            localStorage.removeItem('crypthreads_session');
        }
    }

    // Show authentication screen
    showAuthScreen();
}

// Authentication Functions
function switchToRegister() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
}

function switchToLogin() {
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;

    // Validation
    if (!username || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (username.length < 3) {
        showNotification('Username must be at least 3 characters', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showNotification('Username already exists', 'error');
        return;
    }

    // Create new user
    const newUser = {
        username: username,
        password: hashPassword(password),
        createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers();

    showNotification('Registration successful! Please login.', 'success');
    
    // Clear form and switch to login
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm').value = '';
    switchToLogin();
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showNotification('Please enter username and password', 'error');
        return;
    }

    // Find user
    const user = users.find(u => u.username === username);
    
    if (!user) {
        showNotification('Invalid username or password', 'error');
        return;
    }

    // Verify password
    if (user.password !== hashPassword(password)) {
        showNotification('Invalid username or password', 'error');
        return;
    }

    // Create persistent session
    const session = {
        username: username,
        timestamp: Date.now()
    };
    localStorage.setItem('crypthreads_session', JSON.stringify(session));

    currentUser = username;
    showNotification('Login successful!', 'success');
    
    // Clear form
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    
    setTimeout(() => {
        showDashboard();
    }, 500);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('crypthreads_session');
        currentUser = null;
        showAuthScreen();
        showNotification('Logged out successfully', 'info');
    }
}

// Screen Management
function showAuthScreen() {
    document.getElementById('auth-screen').classList.add('active');
    document.getElementById('dashboard-screen').classList.remove('active');
}

function showDashboard() {
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('dashboard-screen').classList.add('active');
    
    // Update dashboard
    document.getElementById('current-username').textContent = currentUser;
    updateDashboard();
    loadMessages();
    updateRecipientList();
}

// Dashboard Functions
function updateDashboard() {
    const stats = blockchain.getBlockchainStats();
    const userMessages = blockchain.getMessagesForUser(currentUser);
    const receivedMessages = userMessages.filter(msg => msg.to === currentUser && msg.status === 'mined');

    document.getElementById('total-blocks').textContent = stats.totalBlocks;
    document.getElementById('pending-messages').textContent = stats.pendingMessages;
    document.getElementById('total-messages').textContent = receivedMessages.length;
    document.getElementById('total-users').textContent = users.length;

    // Update last mined time
    if (blockchain.chain.length > 1) {
        const lastBlock = blockchain.getLatestBlock();
        const lastMinedTime = new Date(lastBlock.timestamp).toLocaleString();
        document.getElementById('last-mined').textContent = lastMinedTime;
    }
}

function loadMessages() {
    const messageList = document.getElementById('message-list');
    const userMessages = blockchain.getMessagesForUser(currentUser);

    if (userMessages.length === 0) {
        messageList.innerHTML = `
            <div class="no-messages">
                <div class="no-messages-icon">💬</div>
                <p>No messages yet. Start a conversation!</p>
            </div>
        `;
        return;
    }

    messageList.innerHTML = userMessages.map(msg => {
        const isSent = msg.from === currentUser;
        const otherUser = isSent ? msg.to : msg.from;
        const direction = isSent ? 'To' : 'From';
        
        return `
            <div class="message-item">
                <div class="message-header">
                    <div>
                        <div class="message-from">${direction}: ${otherUser}</div>
                        ${isSent ? `<div class="message-to">Sent by you</div>` : ''}
                    </div>
                    <div class="message-time">${new Date(msg.timestamp).toLocaleString()}</div>
                </div>
                <div class="message-content">${escapeHtml(msg.message)}</div>
                <span class="message-status ${msg.status}">${msg.status === 'pending' ? '⏳ Pending Mining' : '✓ Mined & Delivered'}</span>
            </div>
        `;
    }).join('');
}

function updateRecipientList() {
    const recipientSelect = document.getElementById('recipient-select');
    const otherUsers = users.filter(u => u.username !== currentUser);

    recipientSelect.innerHTML = '<option value="">Select recipient...</option>' +
        otherUsers.map(u => `<option value="${u.username}">${u.username}</option>`).join('');
}

function sendMessage() {
    const recipient = document.getElementById('recipient-select').value;
    const messageText = document.getElementById('message-input').value.trim();

    if (!recipient) {
        showNotification('Please select a recipient', 'error');
        return;
    }

    if (!messageText) {
        showNotification('Please enter a message', 'error');
        return;
    }

    if (messageText.length > 1000) {
        showNotification('Message is too long (max 1000 characters)', 'error');
        return;
    }

    // Add message to pending transactions
    blockchain.addMessage(currentUser, recipient, messageText);
    saveBlockchain();

    showNotification('Message added to pending queue. Click "Mine Pending Messages" to send.', 'info');

    // Clear input
    document.getElementById('message-input').value = '';
    document.getElementById('recipient-select').value = '';

    // Update dashboard
    updateDashboard();
    loadMessages();
}

function minePendingMessages() {
    const stats = blockchain.getBlockchainStats();
    
    if (stats.pendingMessages === 0) {
        showNotification('No pending messages to mine', 'info');
        return;
    }

    showNotification('Mining in progress... Please wait.', 'info');

    // Simulate mining delay for better UX
    setTimeout(() => {
        const success = blockchain.minePendingMessages();
        
        if (success) {
            saveBlockchain();
            showNotification(`Successfully mined ${stats.pendingMessages} message(s)!`, 'success');
            updateDashboard();
            loadMessages();
        } else {
            showNotification('Mining failed. Please try again.', 'error');
        }
    }, 1000);
}

// User Management Functions
function showUserList() {
    const modal = document.getElementById('user-list-modal');
    const container = document.getElementById('user-list-container');

    if (users.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No users registered yet.</p>';
    } else {
        container.innerHTML = users.map(user => `
            <div class="user-list-item">
                <span class="user-name">${user.username}${user.username === currentUser ? ' (You)' : ''}</span>
                ${user.username !== currentUser ? `<button class="btn btn-delete" onclick="deleteUser('${user.username}')">Delete</button>` : ''}
            </div>
        `).join('');
    }

    modal.classList.add('active');
}

function showAddUser() {
    const modal = document.getElementById('add-user-modal');
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    modal.classList.add('active');
}

function addNewUser() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;

    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (username.length < 3) {
        showNotification('Username must be at least 3 characters', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    if (users.find(u => u.username === username)) {
        showNotification('Username already exists', 'error');
        return;
    }

    const newUser = {
        username: username,
        password: hashPassword(password),
        createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers();

    showNotification('User added successfully!', 'success');
    closeModal('add-user-modal');
    updateDashboard();
    updateRecipientList();
}

function deleteUser(username) {
    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
        users = users.filter(u => u.username !== username);
        saveUsers();
        showNotification('User deleted successfully', 'success');
        showUserList(); // Refresh the list
        updateDashboard();
        updateRecipientList();
    }
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Click outside modal to close
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Utility Functions
function hashPassword(password) {
    // Simple hash function (in production, use proper hashing like bcrypt)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function saveBlockchain() {
    localStorage.setItem('crypthreads_blockchain', blockchain.toJSON());
}

function saveUsers() {
    localStorage.setItem('crypthreads_users', JSON.stringify(users));
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter to send message (Ctrl+Enter in textarea)
    if (e.ctrlKey && e.key === 'Enter') {
        const messageInput = document.getElementById('message-input');
        if (document.activeElement === messageInput) {
            sendMessage();
        }
    }
    
    // Enter to login/register
    if (e.key === 'Enter') {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (loginForm.classList.contains('active')) {
            const inputs = loginForm.querySelectorAll('input');
            if (Array.from(inputs).includes(document.activeElement)) {
                login();
            }
        } else if (registerForm.classList.contains('active')) {
            const inputs = registerForm.querySelectorAll('input');
            if (Array.from(inputs).includes(document.activeElement)) {
                register();
            }
        }
    }
});

// Auto-save blockchain periodically
setInterval(() => {
    if (blockchain) {
        saveBlockchain();
    }
}, 30000); // Save every 30 seconds