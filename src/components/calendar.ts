import assignFirstDayWeek from '../utils/view/assignFirstDayWeek';
import showListEvents from '../utils/view/showListEvents';
import hideDaysPrevNext from '../utils/view/hideDaysPrevNext';
import handlerListEvents from "./listEvents";
import { handlerPageHtml } from './custom';
import { getWeather, renderWeather, controlViewWeather } from './weather';

handlerPageHtml();

const prevMonth: Element | null = document.querySelector('.calendar__control-preview');
const nextMonth: Element | null = document.querySelector('.calendar__control-next');
const titleCalendar: Element | null = document.querySelector('.calendar__title-month');

const arrHolidaysDays: string[] = ['27', '1'];
const date: Date = new Date();

if (!prevMonth || !nextMonth) throw Error('root element not found');

prevMonth.addEventListener('click', (): void => {
  date.setMonth(date.getMonth() - 1);
  handlerCalendar();
});

nextMonth.addEventListener('click', (): void => {
  date.setMonth(date.getMonth() + 1);
  handlerCalendar();
});

function handlerCalendar(): void {
  let accessWeekDay0: Element | null = document.querySelector('#MON');
  if (!accessWeekDay0 || !titleCalendar) throw Error('root element not found');
  (<HTMLElement>accessWeekDay0).innerText === 'MON' ? date.setDate(7) : date.setDate(1);

  const dynamicMonth: number = date.getMonth();
  const currentMonth: number = new Date().getMonth();
  const dynamicYear: number = date.getFullYear();
  const currentYear: number = new Date().getFullYear();
  const monthDays: Element | null = document.querySelector('.calendar__days');
  const isMonth: boolean = dynamicMonth === currentMonth;
  const isYear: boolean = dynamicYear === currentYear;

  const lastDay: number = new Date(dynamicYear, dynamicMonth + 1, 0).getDate();
  const prevLastDay: number = new Date(dynamicYear, dynamicMonth, 0).getDate();
  const firstDayIndex: number = date.getDay();
  const lastDayIndex: number = new Date(dynamicYear, dynamicMonth + 1, 3).getDay();
  let nextDays: number;


  if (accessWeekDay0.innerHTML === 'MON') {
    nextDays = 11 - lastDayIndex - 1;
  } else {
    nextDays = 11 - lastDayIndex - 2;
  };

  const months = [
    'January',
    'February',
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

  titleCalendar.innerHTML = `${months[dynamicMonth]} ${dynamicYear}`;

  let days: string = '';

  for (let q: number = firstDayIndex; q > 0; q--) {
    days += `<div class='menu__prev-days'>${prevLastDay - q + 1}</div>`;
  };

  const arrDays: string[] = days.split(' ');
  const countPrevDays: number = arrDays.length;
  const weekendStart: number = 7 - countPrevDays;

  for (let i: number = 1; i <= lastDay; i++) {
    const date: number = new Date().getDate();
    const isCurrentDate: boolean = (i === date && isMonth && isYear);
    const accessWeekDay6: Element | null = document.querySelector('#SUN');

    const arrStartStepForWeekMonday: number[] = [0, 1, 7, 8, 14, 15, 21, 22, 28, 29];
    const arrWeekendForWeekMonday: number[] = arrStartStepForWeekMonday.map((item) => item + weekendStart);
    const flagMonday: number | undefined = arrWeekendForWeekMonday.find(e => +e === i);

    const arrStartStepForWeekSunday: number[] = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
    const arrWeekendForWeekSunday: number[] = arrStartStepForWeekSunday.map((item) => item + weekendStart);
    const flagSunday: number | undefined = arrWeekendForWeekSunday.find(e => +e === i);

    localStorage.setItem('holidays', JSON.stringify(arrHolidaysDays));
    const holidayDay: string | null = localStorage.getItem('holidays');
    if (!holidayDay || !accessWeekDay6) throw Error('root element not found');
    const holidayDayPars = JSON.parse(holidayDay);

    const holidayFake: boolean = (i === +holidayDayPars[0] && isMonth && isYear);
    const holidayNewYear: boolean = (i === +holidayDayPars[1] && dynamicMonth === 0 && dynamicYear === 2022);
    const isHoliday: boolean = holidayFake || holidayNewYear;

    localStorage.setItem('holidays', JSON.stringify(arrHolidaysDays));
    let startDate: string = `${dynamicYear}${"-"}${dynamicMonth + 1}${"-"}${i}`;
    let dataLocalStorage: string | null = localStorage.getItem(`${startDate} 'inputValue'`);
    if (!dataLocalStorage) { dataLocalStorage = 'null' }
    const stringDataLocalStorage: string = JSON.parse(dataLocalStorage);
    const isString: boolean = typeof stringDataLocalStorage === 'string';
    const isEmptyString: boolean = stringDataLocalStorage === '';

    if (isCurrentDate) {
      days += `<div id='today'>${i}</div>`;
    } else if (isHoliday) {
      days += `<div class='holiday' id='holiday'>${i}</div>`;
    } else if (isEmptyString) {
      days += `<div class='marker-event__delete' id='day${i}'>${i}</div>`;
    } else if (isString) {
      days += `<div class='marker-event' id='day${i}'>${i}</div>`;
    } else {
      if (accessWeekDay6.innerHTML === 'SUN') {
        i === i && flagMonday ?
          days += `<div class='event__marker-weekend' id='day${i}'>${i}</div>` :
          days += `<div id='day${i}'>${i}</div>`;
      } else {
        i === i && flagSunday ?
          days += `<div class='event__marker-weekend' id='day${i}'>${i}</div>` :
          days += `<div id='day${i}'>${i}</div>`;
      }
    };
  };

  for (let j = 1; j <= nextDays; j++) {
    if (!monthDays) throw Error('root element not found');
    days += `<div class='menu__next-days'>${j}</div>`;
    monthDays.innerHTML = days;
  };

  for (let d = 1; d < 32; d++) {
    const block: HTMLElement | null = document.getElementById(`day${d}`);
    const blockToday: HTMLElement | null = document.getElementById(`today`);
    const holiday: HTMLElement | null = document.getElementById(`holiday`);
    const dynamicYear: number = date.getFullYear();
    const dynamicMonth: number = date.getMonth();

    if (block === null) {
      if (blockToday === null) {
        ''
      } else {
        blockToday.onclick = function () {
          handlerListEvents(dynamicYear, dynamicMonth, event);
        };
      };

    } else {
      block.onclick = function (event) {
        handlerListEvents(dynamicYear, dynamicMonth, event);
      }
    };
    if (holiday) {
      holiday.onclick = function (event) {
        handlerListEvents(dynamicYear, dynamicMonth, event);
      };
    }
  };
  assignFirstDayWeek();
};

showListEvents();
getWeather(renderWeather);
controlViewWeather();
hideDaysPrevNext();

export default handlerCalendar;
