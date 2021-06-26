const createCsv = require("./createCsv");
const parsePage = require("./parsePage");

//#################################################//
// Можно подключить любую страницу

// const url = `https://2gis.ru/kursk/search/Авторемонт/rubricId/9041/firm/70000001043328887/36.175478%2C51.761601`;
// const url = `https://2gis.ru/kursk/search/Авторемонт/rubricId/9041/firm/10274364930986607/36.135718%2C51.755842`;
// const url = `https://kursk.bizly.ru/1454786959-avtomoyka-admiral/`;
//#################################################//


//#################################################//
// Селекторы, в котором вести поиск данных 

// const blockSelector = '#contacts';
// const adressSelector = '#contacts > div.contacts > div:nth-child(5) > div.col-sm-8';

// Необходимо взять со страницы селектор блока, в котором есть искомые данные, и передать в функцию parsePage

// Указав blockSelector можно найти ссылку на сайт и телефон организации
// Указав adressSelector можно найти адрес организации
//#################################################//


// 1 ВАРИАНТ: 
// В данном случае подключаем страницу организации с сайта 2гис
// Ищем с помощью панели разработчика необходимые селекторы
// Если передать селекторы, которых нет на странице, НА ДАННОМ ЭТАПЕ ПРОГРАММА ВЫДАСТ ОШИБКУ, позже исправлю

// const url = `https://2gis.ru/kursk/search/Авторемонт/rubricId/9041/firm/70000001017421410/36.170738%2C51.764166`;
// const blockSelector = '._16r5tja';
// const adressSelector = '._16r5tja ._1nped2zk';

// 2 ВАРИАНТ:
// В данном случае подключаем страницу организации с сайта bizly (ЗАКОМЕНТИРОВАТЬ ПЕРВЫЙ, РАСКОМЕНТИРОВАТЬ ВТОРОЙ)

const url = `https://kursk.bizly.ru/1454786959-avtomoyka-admiral/`;
const blockSelector = '#contacts';
const adressSelector = '#contacts';

const writeDataToCsv = async () => {
    const data = [await parsePage(url, blockSelector, adressSelector)];
    createCsv(data);
}

writeDataToCsv();