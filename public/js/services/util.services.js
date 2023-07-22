const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getTodaysDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    document.getElementById('myDate').defaultValue = today;
    return today;
};

export { months, days, getTodaysDate };
