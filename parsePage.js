const parsePage = async ({title, url}, page, selector1, selector2, {regExp_SiteLink, regExp_PhoneMask, regExp_Adress}) => {

    await page.goto(url);

    const data = await page.evaluate((selector1, selector2) => {
        return {
            block: document.querySelector(selector1).innerText,
            adress: document.querySelector(selector2).innerText
        };
    }, selector1, selector2);

    const links = data.block.match(regExp_SiteLink) ? data.block.match(regExp_SiteLink) : [];
    const phones = data.block.match(regExp_PhoneMask) ? data.block.match(regExp_PhoneMask) : [];
    const adresses = data.block.match(regExp_Adress) ? [data.adress.match(regExp_Adress)[0]] : [];

    console.log(
        [
            [title],
            links,
            phones,
            adresses
        ]
    );

    return [
        [title],
        links,
        phones,
        adresses
    ];
}

module.exports = parsePage;