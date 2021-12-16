import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Categories', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO users(id, name, password, email, driver_license, "isAdmin", created_at) 
    VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', 'xxxxxx', true, 'now()')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.close();
  });

  it('Should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Some Category',
        description: 'Some description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const responseListCategories = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseListCategories.statusCode).toBe(200);
    expect(responseListCategories.body.length).toEqual(1);
    expect(responseListCategories.body[0]).toHaveProperty('id');
  });
});
