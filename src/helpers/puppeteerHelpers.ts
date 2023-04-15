import { JSDOM } from "jsdom";

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
  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

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
          "div.ui-search-result__image a div.slick-track div.slick-active img.ui-search-result-image__element"
        )
        .getAttribute("src")
        .toString(),
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
            .querySelector("div.ui-search-result div.ui-search-result__image a")
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
};

const scrapingBuscape = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const productCards: IProduct[] = [
    ...document.querySelectorAll("div.SearchCard_ProductCard__1D3ve"),
  ].map((productCard) => {
    const productInfos = {
      description: productCard.querySelector(
        "a div.SearchCard_ProductCard_Body__2wM_H div.SearchCard_ProductCard_Description__fGXI3 div.SearchCard_ProductCard_NameWrapper__Gv0x_ div h2"
      ).textContent,
      imageUrl: productCard
        .querySelector(
          "div.SearchCard_ProductCard_Body__2wM_H div.SearchCard_ProductCard_Image__ffKkn span img"
        )
        .getAttribute("src"),
      price: productCard.querySelector(
        "a div.SearchCard_ProductCard_Body__2wM_H div.SearchCard_ProductCard_Description__fGXI3 div>p.Text_Text__h_AF6"
      ).textContent,
      website: `https://www.buscape.com.br${productCard
        .querySelector("a")
        .getAttribute("href")}`,
      category: document.querySelector("h1").textContent,
    };

    return productInfos;
  });

  return productCards;
};

export const getProductsByCategory = async (search: ISearchByCategory) => {
  if (search.website === "Mercado Livre") {
    return scrapingMercadoLivre(MercadoLivreCategoryLinks[search.category]);
  }

  if (search.website === "Buscapé") {
    return scrapingBuscape(BuscapeCategoryLinks[search.category]);
  }
};

export const getProductsBySearchTerm = async (search: ISearchByTerm) => {
  if (search.website === "Mercado Livre") {
    return scrapingMercadoLivre(
      `https://lista.mercadolivre.com.br/${search.searchTerm}`
    );
  }
  if (search.website === "Buscapé") {
    return scrapingBuscape(
      `https://www.buscape.com.br/search?q=${search.searchTerm}`
    );
  }
};
