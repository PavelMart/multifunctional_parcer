const puppeteer = require('puppeteer');

const filters = [
    'mail.ru',
    'yandex.ru'
];

const checkFilters = (filters, elem) => {
    let result = false;

    filters.forEach( filter => {
        if (elem.indexOf(filter) > -1) {
            result = true;
        }
    });

    return result;
}

const getData = async (url, selector1, selector2, regExp_1, regExp_2, regExp_3) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url);

    const data = await page.evaluate((selector1, selector2) => {
        return {
            block: document.querySelector(selector1).innerText,
            adress: document.querySelector(selector2).innerText
        };
    }, selector1, selector2);

    browser.close();

    return [
        data.block.match(regExp_1),
        data.block.match(regExp_2),
        data.adress.match(regExp_3)
    ];
}

const parsePage = async (url, blockSelector, adressSelector) => {
    const regExp_SiteLink = /(https?:\/\/)?([\da-zа-яё\.-]+)\.([a-zа-яё]{2,6})/g;
    const regExp_PhoneMask = /(\+7[\-\‒ ]?)(\‒?\(?\d{3}\)?\‒?[\- ]?)?[\d\-\‒ ]{7,10}/g;
    const regExp_Adress = /([а-яёА-ЯЁ\d\s]+), ([а-яё\d]+)/g;

    const data = await getData(url, blockSelector, adressSelector, regExp_SiteLink, regExp_PhoneMask, regExp_Adress);

    return data;  
}

module.exports = parsePage;