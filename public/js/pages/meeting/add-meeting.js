import { showUserEmail } from '../../nav.js';
import {
    isTeamValid,
    isEmailValid,
    addMeeting,
    allAttendeesEmailFromAtt,
    allEmailFromTeam,
    getDataInFormat,
} from './services/meeting.services.js';

const isAttendeesValid = async (attendees) => {
    const attendeesArr = attendees.split(',');
    for (let i = 0; i < attendeesArr.length; i++) {
        attendeesArr[i] = attendeesArr[i].trim();
    }
    const checkEmail = await isEmailValid(attendeesArr);
    if (!checkEmail) {
        alert('User with email not present ');
        return false;
    }

    const checkTeam = await isTeamValid(attendeesArr);
    if (!checkTeam) {
        alert('Team not Present');
        return false;
    }

    return true;
};

async function onAddMeetingSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const description = document.getElementById('description').value;
    const attendees = document.getElementById('attendees').value;

    const isValidAtt = await isAttendeesValid(attendees);
    if (isValidAtt) {
        let attendeesArr = allEmailFromTeam.concat(allAttendeesEmailFromAtt);
        const correctDataOrder = await getDataInFormat({ name, date, startTime, endTime, description, attendeesArr });
        try {
            const addedMeeting = await addMeeting(correctDataOrder);
            alert(`${addedMeeting.name} added to your Meeting List`);
        } catch (error) {
            alert(error.message);
        }
    } else {
        console.log('attendees or team not present in the data');
    }
}

const onDOMLoad = () => {
    showUserEmail();
    document.querySelector('#add-meetings').addEventListener('submit', onAddMeetingSubmit);
};
document.addEventListener('DOMContentLoaded', onDOMLoad);
