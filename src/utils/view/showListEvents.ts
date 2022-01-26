import { handlerEventsHtml } from '../../components/custom';

function showListEvents(): void {
  handlerEventsHtml();

  const addEventToTheList: Element | null = document.querySelector('.menu__events');
  const buttonToShowTheFormCalendar: Element | null = document.querySelector('.events');
  if (!addEventToTheList || !buttonToShowTheFormCalendar) throw Error('root element not found');

  addEventToTheList.addEventListener('click', (): void => {
    buttonToShowTheFormCalendar.classList.toggle('events__view');

    if (addEventToTheList.innerHTML == 'List events') {
      addEventToTheList.innerHTML = 'Hide event list';
    } else {
      addEventToTheList.innerHTML = 'List events';
    };
  });
};

export default showListEvents;
