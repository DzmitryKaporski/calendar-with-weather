export function getWeather(renderWeather: Function) {
  const key: string = 'ea3048edbea509dded6a444de56c4ddf';
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Mogilev&appid=${key}&units=metric`)
    .then(function (resp): {} { return resp.json() })
    .then(function (data): void {
      renderWeather(data);
    })
    .catch((): Error => new Error("No data weather"));
};

type weather = {
  city: { name: string },
  list: [{
    dt_txt: string,
    main: { temp: number },
    weather: [{ description: string }]
  }]
};

export function renderWeather(data: weather): void {
  const arrItemData: number[] = [0, 6, 15, 23, 32, 38];
  const arrayObjects: [{ dt_txt: string, }] = data.list;
  const obj: { name: string } = data.city;
  const city: string = obj.name;
  const wrapWeather: HTMLDivElement = document.createElement('div');
  wrapWeather.classList.add('weather-wrap');
  wrapWeather.classList.add('hide');
  wrapWeather.classList.add('none');

  for (let i = 0; i < arrItemData.length; i++) {
    const date: string = arrayObjects[arrItemData[i]].dt_txt.split(' ')[0];
    const tempDate: number = ~~data.list[arrItemData[i]].main.temp;
    const descriptionDate = data.list[arrItemData[i]].weather[0].description;
    const block: HTMLDivElement = document.createElement('div');
    const mainPage: Element | null = document.querySelector('.main');
    if (!mainPage) throw Error('root element not found');

    block.classList.add('weather');
    block.innerHTML = `${city}/ ${date}/ ${descriptionDate}/  temp: ${tempDate}&deg;C`;
    wrapWeather.append(block);
    mainPage.append(wrapWeather);
  };
};

export function controlViewWeather(): void {
  const buttonWeather: Element | null = document.querySelector('.events__button-weather');
  if (!buttonWeather) throw Error('root element not found');

  buttonWeather.addEventListener('click', () => {
    const wrapWeather: Element | null = document.querySelector('.weather-wrap');
    if (!wrapWeather) throw Error('root element not found');

    setTimeout(function (): void {
      wrapWeather.classList.toggle('hide');
    }, 100);
    wrapWeather.classList.toggle('none');
  });
};
