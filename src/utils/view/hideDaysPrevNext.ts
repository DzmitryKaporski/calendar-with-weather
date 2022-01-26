function hideDaysPrevNext(): void {
  const hideDays: Element | null = document.querySelector('.menu__days');
  if (!hideDays) throw Error('root element not found');

  hideDays.addEventListener('click', (): void => {
    const nodeListDaysPrev: NodeListOf<Element> = document.querySelectorAll('.menu__prev-days');
    const nodeListDaysNext: NodeListOf<Element> = document.querySelectorAll('.menu__next-days');
    const arrDaysPrev: Element[] = Array.from(nodeListDaysPrev);
    const arrDaysNext: Element[] = Array.from(nodeListDaysNext);
    hideDays.classList.toggle('control-active');

    if (hideDays.innerHTML === 'Hide days of the previous and next month') {
      hideDays.innerHTML = 'Show days of the previous and next month';
    } else {
      hideDays.innerHTML = 'Hide days of the previous and next month';
    };

    arrDaysPrev.map((item) => item.classList.toggle('hide'));
    arrDaysNext.map((item) => item.classList.toggle('hide'));
  });
};

export default hideDaysPrevNext;
