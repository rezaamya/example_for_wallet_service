import { plainToInstance } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number = 4000;
}

export function configValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
