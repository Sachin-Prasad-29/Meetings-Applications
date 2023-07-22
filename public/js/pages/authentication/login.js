import { validation, login } from './services/login.services.js';

const onLoginFormSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginDetails = { email, password };
    if (validation(loginDetails)) {
        try {
            await login(loginDetails);
            location.href = 'calender.html';
            alert(`Login Successfully`);
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert('Please Enter both Fields');
    }
};

const onDOMLoad = () => {
    console.log('Dom Loaded');
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', onLoginFormSubmit);
};

document.addEventListener('DOMContentLoaded', onDOMLoad);
