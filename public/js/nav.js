import { clearToken } from './services/token.services.js';

const menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', function () {
    const navItems = document.querySelectorAll('.nav-items');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.toggle('d-sm-none');
    }
});

const logout = () => {
    clearToken();
};

const showUserEmail = () => {
    const userEl = document.querySelector('#loged-in-user');
    let username = localStorage.getItem('name');
    userEl.innerHTML = `Hello <span class="primary" style="text-transform:capitalize;">${username}</span>!`;
};

document.getElementById('log-out').addEventListener('click', logout);

export { showUserEmail };
