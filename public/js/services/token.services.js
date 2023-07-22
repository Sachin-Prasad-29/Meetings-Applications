const storeToken = async  (data) => {
    const { token, email, name, message } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    localStorage.setItem('message', message);
};

const clearToken = () => {
  localStorage.clear();
  window.location = '/login.html';
}

export { storeToken, clearToken };
