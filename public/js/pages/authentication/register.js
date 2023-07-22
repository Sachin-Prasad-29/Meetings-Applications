import { validation, register } from './services/register.services.js';

async function onRegisterFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-Password').value;

    const data = { name, email, password, confirmPassword };
    if (validation(data)) {
        try {
            await register({ email, name, password });
            alert('Registered Successfull');
            location.href = 'login.html';
        } catch (error) {
            alert(error.message);
        }
    }
}

const onDOMLoad = () => {
    const registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('submit', onRegisterFormSubmit);
};

document.addEventListener('DOMContentLoaded', onDOMLoad);
