import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as fs from 'fs';
import { join } from 'path';
import appConfig from './configs/app.config';
import postgresConfig from './configs/postgres.config';

describe('Database Migration', () => {
  let pool: Pool;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [appConfig, postgresConfig],
        }),
      ],
    }).compile();

    const configService = module.get<ConfigService>(ConfigService);
    const pgConfig = configService.get('postgres');

    pool = new Pool({
      host: pgConfig.host,
      user: pgConfig.user,
      password: pgConfig.password,
      database: pgConfig.database_name,
      port: pgConfig.port,
    });

    const sql = fs.readFileSync(join(__dirname, 'migration.sql')).toString();
    await pool.query(sql);
  });

  it('should create the transactions table', async () => {
    const result = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'transactions')",
    );
    expect(result.rows[0].exists).toBe(true);
  });

  it('should create the migration table', async () => {
    const result = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'migration')",
    );
    expect(result.rows[0].exists).toBe(true);
  });

  afterAll(async () => {
    await pool.end();
  });
});
