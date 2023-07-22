import baseURL from '../../../config.js';

const validation = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (name == '') {
        alert('Name field requird');
        return false;
    }
    if (email == '') {
        alert('Email field requird');
        return false;
    }
    if (password == '') {
        alert('Password field requird');
        return false;
    }
    if (confirmPassword == '') {
        alert('ConfirmPassword field requird');
        return false;
    }
    if (password.localeCompare(confirmPassword) != 0) {
        alert('Please enter same password');
        return false;
    }
    return true;
};

const register = async (registrationDetails) => {
    const raw = JSON.stringify(registrationDetails);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
    };

    const response = await fetch(`${baseURL}/auth/register`, requestOptions);
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    } 
 
};

export { validation, register };
