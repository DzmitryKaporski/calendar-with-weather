import handlerCalendar from "../../components/calendar";

function assignFirstDayWeek(): void {
  const accessWeekDay1: Element | null = document.querySelector('#TUE');
  if (!accessWeekDay1) throw Error('root element not found');

  accessWeekDay1.addEventListener('click', (): void => {
    const accessWeekDay0: Element | null = document.querySelector('#MON');
    const accessWeekDay1: Element | null = document.querySelector('#TUE');
    const accessWeekDay2: Element | null = document.querySelector('#WED');
    const accessWeekDay3: Element | null = document.querySelector('#THU');
    const accessWeekDay4: Element | null = document.querySelector('#FRI');
    const accessWeekDay5: Element | null = document.querySelector('#SAT');
    const accessWeekDay6: Element | null = document.querySelector('#SUN');

    if (!accessWeekDay0
      || !accessWeekDay1
      || !accessWeekDay2
      || !accessWeekDay3
      || !accessWeekDay4
      || !accessWeekDay5
      || !accessWeekDay6) throw Error('root element not found');

    accessWeekDay0.innerHTML = 'MON';
    accessWeekDay1.innerHTML = 'TUE';
    accessWeekDay2.innerHTML = 'WED';
    accessWeekDay3.innerHTML = 'THU';
    accessWeekDay4.innerHTML = 'FRI';
    accessWeekDay5.innerHTML = 'SAT';
    accessWeekDay6.innerHTML = 'SUN';
    handlerCalendar();
    accessWeekDay1.classList.remove('accessWeekDay1');
  });

  const accessWeekDay6: Element | null = document.querySelector('#SUN');
  if (!accessWeekDay6) throw Error('root element not found');
  accessWeekDay6.classList.add('accessWeekDay6');

  accessWeekDay6.addEventListener('click', (): void => {
    const accessWeekDay0: Element | null = document.querySelector('#MON');
    const accessWeekDay1: Element | null = document.querySelector('#TUE');
    const accessWeekDay2: Element | null = document.querySelector('#WED');
    const accessWeekDay3: Element | null = document.querySelector('#THU');
    const accessWeekDay4: Element | null = document.querySelector('#FRI');
    const accessWeekDay5: Element | null = document.querySelector('#SAT');
    const accessWeekDay6: Element | null = document.querySelector('#SUN');

    if (!accessWeekDay0
      || !accessWeekDay1
      || !accessWeekDay2
      || !accessWeekDay3
      || !accessWeekDay4
      || !accessWeekDay5
      || !accessWeekDay6) throw Error('root element not found');

    accessWeekDay1.classList.add('accessWeekDay1');

    accessWeekDay0.innerHTML = 'SUN';
    accessWeekDay1.innerHTML = 'MON';
    accessWeekDay2.innerHTML = 'TUE';
    accessWeekDay3.innerHTML = 'WED';
    accessWeekDay4.innerHTML = 'THU';
    accessWeekDay5.innerHTML = 'FRI';
    accessWeekDay6.innerHTML = 'SAT';
    handlerCalendar();
    accessWeekDay6.classList.remove('accessWeekDay6');
  });
};

export default assignFirstDayWeek;
