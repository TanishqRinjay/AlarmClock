const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("#alarm-button");
const time_selector = document.querySelector(".time-selector");
let setTime;
const alarmAudio = new Audio("./files/ringtone.mp3");
let isAlarmTime = false;

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  ampm = "AM";
  if (h > 12) {
    h -= 12;
    ampm = "PM";
  }
  h = h == 12 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;
  if (setTime == `${h}:${m} ${ampm}` && s == "00") {
    alarmAudio.play();
    alarmAudio.loop = true;
  }
}, 1000);

function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select Valid time");
  }
  setTime = time;
  time_selector.classList.add("disabled");
  setAlarmBtn.innerText = "Clear Alarm";
}

function clearAlarm() {
  time_selector.classList.remove("disabled");
  setAlarmBtn.innerText = "Set Alarm";
  setTime = "";
  alarmAudio.pause();
  selectMenu[0].value = "Hour";
  selectMenu[1].value = "Minute";
  selectMenu[2].value = "AM/PM";
}

setAlarmBtn.addEventListener("click", () => {
  if (setAlarmBtn.innerText == "Set Alarm") {
    isAlarmTime = true;
    setAlarm();
  } else {
    clearAlarm();
  }
});
