import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs';
import { join } from 'path';
import { WalletModule } from './modules/wallet/wallet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import postgresConfig, { IPostgresConfig } from './configs/postgres.config';
import { configValidator } from './configs/validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, postgresConfig],
      validate: configValidator,
    }),
    WalletModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'PG',
      useFactory: async (configService: ConfigService) => {
        try {
          const postgresConfig = configService.get<IPostgresConfig>('postgres');
          const pool = new Pool({
            host: postgresConfig.host,
            user: postgresConfig.user,
            password: postgresConfig.password,
            database: postgresConfig.database_name,
            port: postgresConfig.port,
          });

          const poolClient = await pool.connect();

          const sql = fs
            .readFileSync(join(__dirname, 'migration.sql'))
            .toString();
          await poolClient.query(sql);
          poolClient.release();

          return pool;
        } catch (e) {
          throw e;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG'],
})
export class AppModule {}
