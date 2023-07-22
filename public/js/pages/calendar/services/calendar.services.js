import { months, days } from '../../../services/util.services.js';
import baseURL from '../../../config.js';

const setDateAndDay = async (today) => {
    const todayInWords = today.split('-');
    const monthKey = parseInt(todayInWords[1]) - 1;
    document.getElementById('today-date').textContent = `${todayInWords[2]} ${months[monthKey]} ${todayInWords[0]}`;
    const day = new Date(`${months[monthKey]} ${todayInWords[2]}, ${todayInWords[0]}`);
    document.getElementById('todays-day').textContent = `${days[day.getDay()]}`;
};

const addEveryMeeting = (MeetingName, attendees, startTime, endTime) => {
    const meetingTimeContainerEl = document.querySelector('.main-meeting-details-div');
    let meetingTimeContainerStr = '';

    let attendeesList = attendees.join(' ');

    const meetingStr = `
        <div class="meeing-guider">
            <div class="hours-block">
                <div class="block-time"></div>
                <div
                class="meeting-detail-div"
                style="width:96%; margin-top:  ${startTime}px; height:  ${endTime}px" > 
                    <p class="m-0 p-0 font-bold">${MeetingName}</p>
                    <hr/>
                    <span class="font-bold">Attendees:</span> ${attendeesList}
                </div>
            </div>
    `;

    meetingTimeContainerStr += meetingStr;
    meetingTimeContainerEl.innerHTML += meetingTimeContainerStr;
};

const fetchCalenderDetails = async (date) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    };

    const response = await fetch(`${baseURL}/calendar?date=${date}`, requestOptions);

    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    }

    const calenderDetails = await response.json();

    document.querySelector('.main-meeting-details-div').innerHTML = '';

    for (let i = 0; i < calenderDetails.length; i++) {
        const members = calenderDetails[i].attendees;

        let marginTop = calenderDetails[i].startTime.hours * 65 + calenderDetails[i].startTime.minutes;

        let heightOf = 65 * (calenderDetails[i].endTime.hours - calenderDetails[i].startTime.hours) - 5;

        if (calenderDetails[i].endTime.minutes - calenderDetails[i].startTime.minutes != 0) {
            heightOf += 5 + calenderDetails[i].endTime.minutes;
        }
        let memberEmail = [];

        for (let j = 0; j < members.length; j++) {
            memberEmail[j] = members[j].email;
        }

        addEveryMeeting(calenderDetails[i].name, memberEmail, marginTop, heightOf);
    }

    return calenderDetails;
};

export { setDateAndDay, fetchCalenderDetails };
