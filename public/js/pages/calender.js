// In calender page you will get following details from the backend
// array of object containing meeting details of the present date
// details contains
/* 
    {
        "startTime": {
            "hours": 9,
            "minutes": 0
        },
        "endTime": {
            "hours": 11,
            "minutes": 30
        },
        "_id": "62c7340c118e87001578b6d2",
        "name": "Mern Training",
        "description": "Increasing brand awareness and spreading information about new products",
        "date": "2022-10-28T00:00:00.000Z",
        "attendees": [
            {
                "userId": "60b3bc005b1fc1001573c478",
                "email": "Shashi4@example.com"
            },
            {
                "userId": "62c52b91f79c720015fe0210",
                "email": "rutuja@example.com"
            },
            {
                "userId": "62c6ed64118e87001578b6aa",
                "email": "Ritu@example.com"
            },
            {
                "userId": "62c489e2eb0c9e001542007b",
                "email": "sachin29@example.com"
            }
        ],
        "__v": 0
    },


    we need name and attendences In the Calender

*/

const addEveryMeeting = (MeetingName, attendees, startTime, endTime) => {
  const meetingTimeContainerEl = document.querySelector(".main-meeting-details-div");
  let meetingTimeContainerStr = "";

  let attendeesList = attendees.join(" ");

  const meetingStr = `
  <div class="meeing-guider">
     <div class="hours-block">
        <div class="block-time"></div>
        <div
          class="meeting-detail-div"
          style="width:96%; margin-top:  ${startTime}px; height:  ${endTime}px"> 
          <p class="m-0 p-0 font-bold">${MeetingName}</p>
          <hr/>
          <span class="font-bold">Attendees:</span> ${attendeesList}
        </div>
     </div>
     `;
  meetingTimeContainerStr += meetingStr;
  meetingTimeContainerEl.innerHTML += meetingTimeContainerStr;
};

const showUserEmail = () => {
  const userEl = document.querySelector("#loged-in-user");

  let userDetails = localStorage.getItem("email");
  console.log(userDetails);
  userEl.innerHTML = `Hello <span class="primary">${userDetails}</span>!`;
};

const fetchCalenderDetails = async (date) => {
  // console.log(" This is the date we get here",date);
  const response = await fetch(`https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText || "Some error occured");
  }
  const calenderDetails = await response.json();

  document.querySelector(".main-meeting-details-div").innerHTML = "";

  for (let i = 0; i < calenderDetails.length; i++) {
    // console.log(calenderDetails[i].name, calenderDetails[i].startTime, calenderDetails[i].endTime);

    const members = calenderDetails[i].attendees;

    // let totalDuration = calenderDetails[i].endTime.hours - calenderDetails[i].startTime.hours;
    //totalDuration *= 60;
    //totalDuration += calenderDetails[i].endTime.minutes - calenderDetails[i].startTime.minutes;
    //console.log(totalDuration);

    let marginTop = calenderDetails[i].startTime.hours * 65 + calenderDetails[i].startTime.minutes;

    let heightOf = 65 * (calenderDetails[i].endTime.hours - calenderDetails[i].startTime.hours) - 5;

    if (calenderDetails[i].endTime.minutes - calenderDetails[i].startTime.minutes != 0) {
      heightOf += 5 + calenderDetails[i].endTime.minutes;
    }

    // console.log(marginTop, heightOf);
    let memberEmail = [];

    for (let j = 0; j < members.length; j++) {
      memberEmail[j] = members[j].email;
    }

    addEveryMeeting(calenderDetails[i].name, memberEmail, marginTop, heightOf);
  }

  return calenderDetails;
};

const fetchAndShowCalender = async (date) => {
  try {
    const calenderDetails = await fetchCalenderDetails(date);
    console.log(calenderDetails);
  } catch (error) {
    console.log(error);
  }
};

const getTodaysDate = () => {
  let today = new Date().toISOString().slice(0, 10);
  document.getElementById("myDate").defaultValue = today;
  return today;
};

const setDateAndDay = async (today) => {
  //console.log(today);
  const todayInWords = today.split("-");
  // console.log(todayInWords);
  const month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // show the Todays Date month and year
  const monthKey = parseInt(todayInWords[1]) - 1;
  document.getElementById("today-date").textContent = `${todayInWords[2]} ${month[monthKey]} ${todayInWords[0]}`;

  // show the Todays date
  const day = new Date(`${month[monthKey]} ${todayInWords[2]}, ${todayInWords[0]}`);
  console.log(day.getDay());
  document.getElementById("todays-day").textContent = `${daysArr[day.getDay()]}`;
};

const handler = async (event) => {
  event.preventDefault();
  const newDate = event.target.value;
  console.log(newDate);
  setDateAndDay(newDate);
  console.log("This is the date while changing the date", newDate);
  fetchAndShowCalender(newDate).then(() => {
    // console.log(document.querySelector(".calender-details"));
  });
};

document.addEventListener("DOMContentLoaded", function () {
  showUserEmail();
  setDateAndDay(getTodaysDate());

  let today = new Date().toISOString().slice(0, 10);
  document.getElementById("myDate").defaultValue = today;

  fetchAndShowCalender(today).then(() => {
    //console.log(document.querySelector(".calender-details"));
  });
});
