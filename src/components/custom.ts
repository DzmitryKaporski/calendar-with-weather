export function handlerPageHtml(): void {
  const main: HTMLElement = document.createElement('section');
  main.innerHTML = `
 <main class="main">
      <section>
        <nav class="menu">
          <div class="menu__days">Hide days of the previous and next month</div>
          <div class="menu__events">List events</div>
        </nav>
        <div class="calendar">
          <div class="calendar__control">
            <div class="calendar__control-preview">&#10094;</div>
            <div class="calendar__title-month"></div>
            <div class="calendar__control-next">&#10095;</div>
          </div>
          <ul class="calendar__week">
            <li class="calendar__week-day" id="MON">MON</li>
            <li class="calendar__week-day" id="TUE" data-title="Make it the first day of the week">TUE</li>
            <li class="calendar__week-day" id="WED">WED</li>
            <li class="calendar__week-day" id="THU">THU</li>
            <li class="calendar__week-day" id="FRI">FRI</li>
            <li class="calendar__week-day" id="SAT">SAT</li>
            <li class="calendar__week-day" id="SUN" data-title="Make it the first day of the week">SUN</li>
          </ul>
          <div class="calendar__days"></div>
        </div>
      </section>
    </main>`
  document.body.appendChild(main);
};

export function handlerEventsHtml(): void {
  const section: HTMLElement = document.createElement('section');
  const main: HTMLElement | null = document.querySelector('main');
  if (!main) throw Error('root element not found');

  section.innerHTML = `
      <section class="events">
        <div class="events__control events__button-weather">Weather</div>
        <div class="events__control events__button-add">Add event list</div>
        <div class="events__box"></div>
      </section>`
  main.appendChild(section);
};
