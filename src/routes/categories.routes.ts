import { Router, Request, Response } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const categoryAlreadyExits = categoriesRepository.findByName(name);

  if (categoryAlreadyExits) {
    return response.status(400).json({ message: 'Category already exits' });
  }

  categoriesRepository.create({
    description,
    name,
  });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoutes };
