// to load the email in the navbar
const showUserEmail = () => {
  const userEl = document.querySelector("#loged-in-user");

  let userDetails = localStorage.getItem("email");
  userEl.innerHTML = `Hello <span class="primary">${userDetails}</span>!`;
};



// this method takes the response recieved after fetching the datat with given period and search 

const disPlayAllFetchedMeetings = async (data) => {
    
    const meetingDetailEl = document.querySelector("#filter-meeting-details");
    meetingDetailEl.innerHTML ="";
     let meetingDetailContainerStr = "";

     const month = ["January","Febuary","March","April","May", "June","July","August","September","October","November","December"];

  for(let i = 0 ; i < data.length; i++){

    const attendeesArr =[];
    for( let j = 0 ; j < data[i].attendees.length;j++){
        attendeesArr[j] = data[i].attendees[j].email; 
    }
    let attendeesList = attendeesArr.join(", ");

    let date = data[i].date.substring();
    date = date.substring(8,10).concat(" ".concat(month[parseInt(date.substring(5,7)) -1].concat(" " .concat(date.substring(0,4)))));
    const name = data[i].name;
    let startTimehour = data[i].startTime.hours;
       if(startTimehour < 10) startTimehour = "0".concat(startTimehour);
    let startTimeMinues = data[i].startTime.minutes;
       if(startTimeMinues<10) startTimeMinues = "0".concat(startTimeMinues);

       let endTimehour = data[i].endTime.hours;
       if(endTimehour < 10) endTimehour = "0".concat(endTimehour);
    let endTimeMinues = data[i].endTime.minutes;
       if(endTimeMinues<10) endTimeMinues = "0".concat(endTimeMinues);
    const eachMeetingDiv = `
    <div class="search-result my-2">
            <div class="mb-1">
              <span class="meeting-date">${date}</span>
              <span class="meeting-time">${startTimehour}:${startTimeMinues} - ${endTimehour}:${endTimeMinues}</span>
            </div>
            <div class="meeting-name">${name}</div>
            <div class="mb-2"><button class="btn btn-danger" id="excuse-yourself">Excuse yourself</button></div>
            <hr />
            <div class="attendees mb-1">
              <span class="font-bold">Attendees:</span>
              ${attendeesList}
            </div>
  
            <div class="select-mem-div">
              <input list="members" name="members" class="select-members" placeholder="Select members" />
              <datalist id="members">
                <option value="sachin@example.com"></option>
                <option value="sameer@example.com"></option>
                <option value="xyz@fynd.com"></option>
              </datalist>
  
              <input type="submit" value="Add" class="btn-primary btn select-members" />
            </div>
          </div>
       `;
       meetingDetailContainerStr += eachMeetingDiv;
  }
  meetingDetailEl.innerHTML += meetingDetailContainerStr;
}

// this funciton fetch the meeting details based on period and searched passed
const getMeetingDetails = async (period, search) => {
  const response = await fetch(`https://mymeetingsapp.herokuapp.com/api/meetings?period=${period}&search=${search}`, {
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") },
  });

  console.log(response);
  return response.json();
};

// this function will give the give the details of the meetings
async function onFilterMeetings(event) {
  event.preventDefault();

  const period = document.getElementById("period").value; //username
  const search = document.getElementById("search").value; //email

  console.log("this is the period ", period);
  console.log("this is the search ", search);
  const data = { period, search };

  try {
    const response = await getMeetingDetails(period, search);
    console.log(response.length);
    console.log(response, "Succesfully execuated");
   await disPlayAllFetchedMeetings(response);

  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showUserEmail();

  document.querySelector("#filter-meetings").addEventListener("submit", onFilterMeetings);
});
