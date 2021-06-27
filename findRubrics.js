const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getInfo = (data) => {
    const arr = [];

    data.forEach( elem => {
        const $ = cheerio.load(elem);
        if ($('a').attr('href')) {
            arr.push({
                url: $('a').attr('href'),
                count: $('.information').text().match(/\d+/g)[0]
            });
        }
    });

    return arr
}

const getRubrics = async (url) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url);  

    const data = await page.evaluate(() => {
        const arr = [];
        const titles = document.querySelectorAll('.title');
        titles.forEach( title => {
            arr.push(title.parentNode.innerHTML);
        });

        return arr;
    });

    browser.close();

    const rubricList = getInfo(data);

    console.log('Рубрики получены');
    return rubricList;
}

module.exports = getRubrics;