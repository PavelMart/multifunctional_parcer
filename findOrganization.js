const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const parsePage = require('./parsePage');

const getInfo = (data) => {
    const arr = [];

    data.forEach( elem => {
        const $ = cheerio.load(elem);
        arr.push({
            title: $('a').text(),
            url: $('a').attr('href')
        });
    });

    return arr
}

const getData = async (url, numbers, blockSelector, adressSelector, regExps) => {
    const finalRubricData = [];

    const format = 'page-';
    const companyList = [];

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url);  

    for (let i = 1; i <= numbers; i++) {
        await page.goto(url + format + i);

        const data = await page.evaluate(() => {
            const arr = [];
            const titles = document.querySelectorAll('.title');
            titles.forEach( title => {
                arr.push(title.innerHTML);
            });

            return arr;
        });
        companyList.push(...data);
    }

    const companyInfo = getInfo(companyList);

    for(let i = 0; i < companyInfo.length; i++) {
        console.log(`start: ${i+1}/${companyInfo.length}`);
        finalRubricData.push(await parsePage(companyInfo[i], page, blockSelector, adressSelector, regExps));
    }

    browser.close();

    return finalRubricData;
}

const findOrganizatons = async (url, companiesTotalNumber, blockSelector, adressSelector, regExps) => {
    const companiesPageNumber = 10;
    const totalPages = Math.ceil(companiesTotalNumber / companiesPageNumber);
    console.log('totalPages: ', totalPages);

    const finalRubricData = await getData(url, totalPages, blockSelector, adressSelector, regExps);

    return finalRubricData;  
}

module.exports = findOrganizatons;