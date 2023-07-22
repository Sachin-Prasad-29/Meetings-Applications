import baseURL from '../../../config.js';

const allEmailFromTeam = [];
const allAttendeesEmailFromAtt = [];
const isEmailValid = async (attendeesArr) => {
    const response = await fetch(`${baseURL}/users`, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    }
    const allUserdata = await response.json();

    for (let i = 0; i < attendeesArr.length; i++) {
        if (attendeesArr[i][0] === '@') continue;
        let flag = true;
        for (let j = 0; j < allUserdata.length; j++) {
            if (attendeesArr[i] === allUserdata[j].email) {
                allAttendeesEmailFromAtt.push(attendeesArr[i]);
                flag = false;
                break;
            }
        }
        if (flag) return false;
    }
    return true;
};

const isTeamValid = async (attendeesArr) => {
    const response = await fetch(`${baseURL}/teams`, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    }

    const allteamdata = await response.json();
    for (let i = 0; i < attendeesArr.length; i++) {
        if (attendeesArr[i][0] !== '@') continue;
        let flag = true;
        let team = attendeesArr[i].substring(1);
        for (let j = 0; j < allteamdata.length; j++) {
            if (team === allteamdata[j].shortName) {
                for (let k = 0; k < allteamdata[j].members.length; k++) {
                    allEmailFromTeam.push(allteamdata[j].members[k].email);
                }
                flag = false;
                break;
            }
        }
        if (flag) return false;
    }
    return true;
};

const addMeeting = async (data) => {
    const raw = JSON.stringify(data);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        body: raw,
        redirect: 'follow',
    };
    const response = await fetch(`https://mymeetingsapp.herokuapp.com/api/meetings`, requestOptions);

    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Some error occured');
    }

    return response.json();
};

const getDataInFormat = async (meetingData) => {
    const correctDataOrder = {
        name: meetingData.name,
        description: meetingData.description,
        date: meetingData.date,
        startTime: {
            hours: parseInt(meetingData.startTime.substring(0, 2)),
            minutes: parseInt(meetingData.startTime.substring(3, 5)),
        },
        endTime: {
            hours: parseInt(meetingData.endTime.substring(0, 2)),
            minutes: parseInt(meetingData.endTime.substring(3, 5)),
        },
        attendees: meetingData.attendeesArr,
    };
    return correctDataOrder;
};

export { isEmailValid, isTeamValid, addMeeting, allAttendeesEmailFromAtt, allEmailFromTeam, getDataInFormat };
