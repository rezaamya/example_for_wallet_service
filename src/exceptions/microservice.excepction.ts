import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class MicroserviceException extends Error {}

export function handleError(
  error: Error,
  logger: Logger,
  errorLogMessage: string,
  throwMessage: string,
  throwHttpException: boolean = false,
  httpStatus: number = HttpStatus.BAD_REQUEST,
) {
  if (!throwHttpException && error instanceof MicroserviceException) {
    throw error;
  }

  logger.error(errorLogMessage);

  if (throwHttpException) {
    throw new HttpException(throwMessage, httpStatus);
  }

  throw new MicroserviceException(throwMessage);
}
