import baseURL from '../../../config.js';
import { storeToken } from '../../../services/token.services.js';

const validation = (data) => {
    const { email, password } = data;

    if (email == '') {
        return false;
    }
    if (password == '') {
        return false;
    }
    return true;
};

const login = async (loginDetails) => {
    const raw = JSON.stringify(loginDetails);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
    };

    const response = await fetch(`${baseURL}/auth/login`, requestOptions);

    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    }

    const data = await response.json();
    await storeToken(data);
    return data;
};

export { validation, login };
