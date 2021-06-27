const createCsv = require("./createCsv");
const findOrganizatons = require("./findOrganization");
const getRubrics = require("./findRubrics");

//#################################################//

// Необходимо взять со страницы селектор блока, в котором есть искомые данные, и передать в функцию parsePage

// Указав blockSelector можно найти ссылку на сайт и телефон организации
// Указав adressSelector можно найти адрес организации
//#################################################//

const regExp_SiteLink = /(https?:\/\/)?([\da-zа-яё\.-]+)\.([a-zа-яё]{2,6})/g;
const regExp_PhoneMask = /(\+7[\-\‒ ]?)(\‒?\(?\d{3}\)?\‒?[\- ]?)?[\d\-\‒ ]{7,10}/g;
const regExp_Adress = /Курск, ([а-яёА-ЯЁ\d\s]+), ([а-яё\d]+)/g;

const regExps = {
    regExp_SiteLink,
    regExp_PhoneMask,
    regExp_Adress
}

const url = 'https://kursk.bizly.ru';
const blockSelector = '#contacts';
const adressSelector = '#contacts';

const writeDataToCsv = async () => {
    const resultBeforeCsv = [];

    const rubrics = await getRubrics(url);

    for (let i = 10; i < 13; i++) {
        const data = await findOrganizatons(
            `${url}${rubrics[i].url}`, 
            5, 
            blockSelector, 
            adressSelector, 
            regExps
        );
        
        resultBeforeCsv.push(data);
    }
    createCsv(resultBeforeCsv);
}

writeDataToCsv();