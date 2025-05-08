import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const dateTimeInput = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,           // Дозволяє вибір часу
    time_24hr: true,            // 24-годинний формат часу
    defaultDate: new Date(),    // Поточна дата як дата за замовчуванням
    minuteIncrement: 1,         // Крок зміни хвилин
    onClose(selectedDates) {    // Колбек при закритті календаря
      console.log("Обрана дата:", selectedDates[0]);
      const now = new Date();
      if (selectedDates[0] <= now) {
        iziToast.warning({
            title: 'Caution',
            message: 'Please choose a date in the future',
            position: "topLeft"
        });
        startBtn.disabled = true;
      } else {
        userSelectedDate = selectedDates[0];
        startBtn.disabled = false;
      }
    },
  };
flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', handleStart);

function handleStart(){
    if (!userSelectedDate){
    return;
    }
    startBtn.disabled = true;
    dateTimeInput.disabled = true;

    timerId = setInterval (() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0){
            clearInterval(timerId);
            updateTimerDisplay(0, 0, 0, 0);
            dateTimeInput.disabled = false;
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(diff);
        updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
};

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }
//   Форматування часу It makes sure that minutes, hours, and seconds are always two digits, like this:
// Instead of 3:5:9 → you get 03:05:09
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
