// The code below is for alarm clock functionality 

const presentTime = document.querySelector("#current-time");
const set_Hours = document.querySelector("#hours");
const set_Minutes = document.querySelector("#minutes");
const set_Seconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");
const addactive = document.getElementById("clockImg");
const ringTone = new Audio('./file/ringtone.mp3');


// Get the current date
const currentDate = new Date();
const alarmList=[];  // alarm array



// Array of week days and months
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get the week day, month, day, and year
const weekDay = weekDays[currentDate.getDay()];
const month = months[currentDate.getMonth()];
const day = currentDate.getDate();
const year = currentDate.getFullYear();

// Update the HTML elements with the values
document.getElementById('week').textContent = weekDay;
document.getElementById('month').textContent = month;
document.getElementById('date').textContent = day;
document.getElementById('year').textContent = year;


// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener("DOMContentLoaded", (event) => {
  
  dropDownMenu(1, 12, set_Hours);
 
  dropDownMenu(0, 59, set_Minutes);

  dropDownMenu(0, 59, set_Seconds);

  setInterval(getpresentTime, 1000);
  fetchAlarm();
});

// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener("click", getInput);


// To get the update
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var timeString = hours.toString().padStart(2, '0') + ':'
    + minutes.toString().padStart(2, '0') + ':'
    + seconds.toString().padStart(2, '0');

}

// Update the clock every second
setInterval(updateClock, 1000);
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

// Tp get present Time
function getpresentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  presentTime.innerHTML = time;

  return time;
}

// To get the input
function getInput(e) {
  e.preventDefault();
  const hourValue = set_Hours.value;
  const minuteValue = set_Minutes.value;
  const secondValue = set_Seconds.value;
  const amPmValue = setAmPm.value;

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}

// Converting time to 24 hour format
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

// To set the alarm
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getpresentTime()) {
       alert("Alarm Ringing");
      ringTone.play();

    }
document.querySelector("#stopAlarm").addEventListener("click", stopAlarm);

    console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// Alarms set by user Dislayed in HTML
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmContainer.prepend(alarm);
}

// Is alarms saved in Local Storage?
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// save alarm to local storage
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Fetching alarms from local storage
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}

// To delete the alarm
function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  console.log(time);

  deleteAlarmFromLocal(time);
  alarm.remove();
}

function deleteAlarmFromLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}
// ... your existing code ...
//  used to stopAlarm

function stopAlarm() {
    ringTone.pause();
    
}

