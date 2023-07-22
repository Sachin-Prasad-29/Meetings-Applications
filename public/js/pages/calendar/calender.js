
import { showUserEmail } from '../../nav.js';
import { setDateAndDay,fetchCalenderDetails } from './services/calendar.services.js';
import { getTodaysDate } from '../../services/util.services.js';

const handler = async (event) => {
    event.preventDefault();
    const newDate = event.target.value;
    setDateAndDay(newDate);
    fetchCalenderDetails(newDate);
};

const onDOMLoad = () => {
    showUserEmail();
    setDateAndDay(getTodaysDate());
    let today = new Date().toISOString().slice(0, 10);
    document.getElementById('myDate').defaultValue = today;
    fetchCalenderDetails(today);
};

document.addEventListener('DOMContentLoaded', onDOMLoad);
document.getElementById('myDate').addEventListener('change', handler);
