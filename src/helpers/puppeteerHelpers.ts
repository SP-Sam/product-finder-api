import puppeteer from "puppeteer";
import {
  IProduct,
  ISearchByCategory,
  ISearchByTerm,
} from "../interfaces/interfaces";
import {
  BuscapeCategoryLinks,
  MercadoLivreCategoryLinks,
} from "../enums/enums";

const scrapingMercadoLivre = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(url);

  const products = await page.evaluate(() => {
    const productCards: IProduct[] = [
      ...document.querySelectorAll(
        "ol.ui-search-layout ui-search-layout--stack li.ui-search-layout__item div.ui-search-result__wrapper div.ui-search-result"
      ),
    ].map((productCard) => {
      const productInfos = {
        description: productCard.querySelector(
          "div.ui-search-result__content-wrapper div.ui-search-item__group--title a.shops__items-group-details h2.ui-search-item__title"
        ).textContent,
        imageUrl: productCard
          .querySelector(
            "div.ui-search-result__image a div div div div div.slick-slide img"
          )
          .getAttribute("src"),
        price: productCard.querySelector(
          "div.ui-search-result__content-wrapper div.ui-search-result__content-columns div div div div div span span.price-tag-amount"
        ).textContent,
        website: productCard
          .querySelector(
            "div.ui-search-result__content-wrapper div.ui-search-item__group--title a"
          )
          .getAttribute("href"),
        category: document
          .querySelectorAll("ol.andes-breadcrumb li")
          [
            document.querySelectorAll("ol.andes-breadcrumb li").length - 1
          ].querySelector("a span").textContent,
      };

      return productInfos;
    });

    if (productCards.length) {
      return productCards;
    } else {
      const productCardsGrid = [
        ...document.querySelectorAll("ol.ui-search-layout--grid"),
      ].map((ol) =>
        [
          ...ol.querySelectorAll(
            "li.ui-search-layout__item div.ui-search-result__wrapper div.ui-search-result"
          ),
        ].map((productCard) => {
          const productInfos = {
            description: productCard.querySelector(
              "div.ui-search-result__content div.ui-search-result__content-wrapper div.ui-search-item__group--title a.shops__items-group-details h2.ui-search-item__title"
            ).textContent,
            imageUrl: productCard
              .querySelector(
                "div.ui-search-result__image a div div div div div.slick-slide img"
              )
              .getAttribute("src"),
            price: productCard.querySelector(
              "div.ui-search-result__content div.ui-search-result__content-wrapper div.ui-search-item__group--price div div div span span.price-tag-amount"
            ).textContent,
            website: productCard
              .querySelector(
                "div.ui-search-result div.ui-search-result__image a"
              )
              .getAttribute("href"),
            category: document
              .querySelectorAll("ol.andes-breadcrumb li")
              [
                document.querySelectorAll("ol.andes-breadcrumb li").length - 1
              ].querySelector("a span").textContent,
          };

          return productInfos;
        })
      );

      const result: IProduct[] = [];

      productCardsGrid.forEach((list) => [
        result.push(...list.map((item) => item)),
      ]);

      return result;
    }
  });

  await browser.close();

  return products;
};

export const getProductsByCategory = async (search: ISearchByCategory) => {
  if (search.website === "Mercado Livre") {
    return scrapingMercadoLivre(MercadoLivreCategoryLinks[search.category]);
  }

  if (search.website === "Buscapé") {
    console.log(BuscapeCategoryLinks[search.category]);
  }
};

export const getProductsBySearchTerm = async (search: ISearchByTerm) => {
  if (search.website === "Mercado Livre") {
    return scrapingMercadoLivre(
      `https://lista.mercadolivre.com.br/${search.searchTerm}`
    );
  }
};
