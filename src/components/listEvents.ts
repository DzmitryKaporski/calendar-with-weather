import { handlerEventsHtml } from './custom';

const arrEventsDate: string[] = [];
let arrStartDayAddEvents: string[] = [];
let startDayAddEvents: string;

function handlerListEvents(
  dynamicYear: number | string,
  dynamicMonth: number,
  event: Event | undefined): void | string {

  handlerEventsHtml();

  const changeButtonTextListEvents: Element | null = document.querySelector('.menu__events');
  const buttonToShowTheFormCalendar: Element | null = document.querySelector('.events');
  if (!changeButtonTextListEvents || !buttonToShowTheFormCalendar || !event) throw Error('root element not found');
  buttonToShowTheFormCalendar.classList.add('events__view');

  let startDate: string = `${dynamicYear}${"-"}${dynamicMonth + 1}${"-"}${(event.target as HTMLElement).innerText}`;
  const spanFinish: HTMLSpanElement = document.createElement('span');
  const spanStart: HTMLSpanElement = document.createElement('span');
  spanStart.classList.add('events__item-date-start');
  spanStart.innerText = startDate;

  const sectionEvents: Element | null = document.querySelector('.events__box');
  const newListEvents: HTMLOListElement = document.createElement('ol');
  const listItem: HTMLLIElement = document.createElement('li');
  if (!sectionEvents) throw Error('root element not found');

  newListEvents.classList.add('events__box-new');
  newListEvents.id = startDate;
  listItem.classList.add('event__item');
  listItem.prepend(spanStart, spanFinish);
  arrEventsDate.push(startDate)
  newListEvents.append(listItem);
  sectionEvents.append(newListEvents);

  for (let d = 0; d < arrEventsDate.length; d++) {
    if (startDate === arrEventsDate[d]) {
      const listEvents: HTMLElement | null = document.getElementById(`${arrEventsDate[d]}`);
      if (!listEvents) throw Error('root element not found');
      listEvents.append(listItem);
      listEvents.classList.remove('hide');
      listEvents.classList.add('absolute');
      listEvents.classList.remove('z-index');
    } else {
      const listEvents: HTMLElement | null = document.getElementById(`${arrEventsDate[d]}`);
      if (!listEvents) throw Error('root element not found');
      listEvents.classList.add('hide');
      listEvents.classList.add('z-index');
    };
  };

  const startDateAddEvents: string[] = startDate.split('');
  if (startDate.length === 9) {
    startDayAddEvents = startDateAddEvents[8];
  } else {
    startDayAddEvents = startDateAddEvents[8] + startDateAddEvents[9];
  };
  arrStartDayAddEvents.push(startDayAddEvents);

  const deleteBtn: HTMLButtonElement = document.createElement('button');
  deleteBtn.classList.add('event__item-delete-btn');
  deleteBtn.innerText = 'X';
  spanStart.before(deleteBtn);

  const inputValue: HTMLInputElement = document.createElement('input');
  inputValue.classList.add('event__item-input');
  inputValue.id = (event.target as HTMLElement).innerHTML;
  inputValue.placeholder = 'Input event';
  spanFinish.append(inputValue);

  const addEventBtn: HTMLButtonElement = document.createElement('button');
  addEventBtn.classList.add('event__item-add');
  addEventBtn.innerText = '+';
  spanStart.before(addEventBtn);

  const btnAddLi: Element | null = document.querySelector('.events__button-add');
  if (!btnAddLi) throw Error('root element not found');
  btnAddLi.addEventListener('click', (): void => {
    handlerListEvents(dynamicYear, dynamicMonth, event);
  });

  let idBoxMarkerEvent: string | null;

  addEventBtn.addEventListener('click', (): void => {
    const span: HTMLSpanElement = document.createElement('span');
    span.innerText = inputValue.value;
    spanFinish.append(span);
    localStorage.setItem(`${startDate} 'inputValue'`, JSON.stringify(span.innerText));

    const editEventBtn: HTMLButtonElement = document.createElement('button');
    editEventBtn.classList.add('event__item-add');
    editEventBtn.innerText = '../';
    spanStart.before(editEventBtn);

    if (span.innerText != '') {
      (event.target as HTMLElement).classList.add('marker-event');
      const boxMarkerEvent: EventTarget | null = event.target;
      if (!boxMarkerEvent) throw Error('root element not found');
      idBoxMarkerEvent = (boxMarkerEvent as HTMLElement).getAttribute('id');
      (boxMarkerEvent as HTMLElement).classList.remove('marker-event__delete');
    };

    editEventBtn.addEventListener('click', (): void => {
      editEventBtn.remove();

      let editInputValue: HTMLInputElement = document.createElement('input');
      editInputValue.classList.add('event__item-input');
      editInputValue.value = span.innerText;
      spanFinish.before(editInputValue);
      span.remove();

      const editAddEventBtn: HTMLButtonElement = document.createElement('button');
      editAddEventBtn.classList.add('event__item-add');
      editAddEventBtn.innerText = '+';
      spanStart.before(editAddEventBtn);

      editAddEventBtn.addEventListener('click', (): void => {
        span.innerText = editInputValue.value;
        spanFinish.append(span);
        editInputValue.remove();
        editAddEventBtn.remove();
        spanStart.before(editEventBtn);
      });
    });
    inputValue.remove();
    addEventBtn.remove();
  });

  deleteBtn.addEventListener('click', (): void => {
    localStorage.setItem(`${startDate} 'inputValue'`, JSON.stringify(''));
    listItem.remove();

    if (!idBoxMarkerEvent) throw Error('root element not found');
    const boxMarkerEvent = document.getElementById(idBoxMarkerEvent);
    if (!boxMarkerEvent) throw Error('root element not found');
    boxMarkerEvent.classList.remove('marker-event');
  });

  if (changeButtonTextListEvents.innerHTML === 'List events') {
    changeButtonTextListEvents.innerHTML = 'Hide event list';
  };

  const data: string | null = localStorage.getItem(`${startDate} 'inputValue'`);
  if (!data) { return '' };
  const inputVal: string = JSON.parse(data);
  const input: HTMLElement | null = document.getElementById(`${(event.target as HTMLElement).innerHTML}`);
  (<HTMLInputElement>input).value = inputVal;
};

export default handlerListEvents;
