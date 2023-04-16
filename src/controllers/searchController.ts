import { Request, Response } from "express";
import Logger from "../../config/logger";
import { ISearchByCategory, ISearchByTerm } from "../interfaces/interfaces";
import {
  getProductsByCategory,
  getProductsBySearchTerm,
} from "../helpers/scrapingHelpers";
import { prismaClient } from "../database/prismaClient";

export const searchByCategory = async (req: Request, res: Response) => {
  try {
    const body: ISearchByCategory = req.body;

    const foundedSearch = await prismaClient.search.findUnique({
      where: { search: `${body.website} ${body.category}` },
    });

    if (foundedSearch !== null) {
      const storedProducts = await prismaClient.product.findMany({
        where: {
          searchId: foundedSearch.id,
        },
      });

      return res.status(200).json(storedProducts);
    } else {
      const products = await getProductsByCategory(body);

      const search = await prismaClient.search.create({
        data: { search: `${body.website} ${body.category}` },
      });

      const productList = products.map((product) => ({
        ...product,
        searchId: search.id,
      }));

      await prismaClient.product.createMany({ data: productList });

      return res.status(201).json(products);
    }
  } catch (e: any) {
    Logger.error(e.message);
  }
};

export const searchByTerm = async (req: Request, res: Response) => {
  try {
    const body: ISearchByTerm = req.body;

    const foundedSearch = await prismaClient.search.findUnique({
      where: { search: `${body.website} ${body.searchTerm}` },
    });

    if (foundedSearch !== null) {
      const storedProducts = await prismaClient.product.findMany({
        where: {
          searchId: foundedSearch.id,
        },
      });

      return res.status(200).json(storedProducts);
    } else {
      const products = await getProductsBySearchTerm(body);

      const search = await prismaClient.search.create({
        data: { search: `${body.website} ${body.searchTerm}` },
      });

      const productList = products.map((product) => ({
        ...product,
        searchId: search.id,
      }));

      await prismaClient.product.createMany({ data: productList });

      return res.status(201).json(products);
    }
  } catch (e: any) {
    Logger.error(e.message);
  }
};
