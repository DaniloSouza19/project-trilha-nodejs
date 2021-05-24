import { Router, Request, Response } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const categoriesRepository = new CategoriesRepository();

  categoriesRepository.create({
    description,
    name,
  });

  return response.status(201).send();
});

export { categoriesRoutes };
