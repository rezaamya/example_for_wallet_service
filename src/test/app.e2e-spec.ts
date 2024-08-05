import '../utilities/pg.fixes';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/balance (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/balance')
      .query({ user_id: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('balance');
        expect(typeof res.body.balance).toBe('number');
        expect(Number.isFinite(res.body.balance)).toBe(true);
      });
  });

  it('/v1/money (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/money')
      .send({ user_id: 1, amount: 50 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('reference_id');
        expect(typeof res.body.reference_id).toBe('number');
        expect(Number.isInteger(res.body.reference_id)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
