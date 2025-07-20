import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as errorMessages from 'errors.json';
import { Response as ResponseType } from './response.interface';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message =
        exception?.response?.data?.message || exception?.response?.data?.error,
      status = exception?.response?.status,
      // eslint-disable-next-line prefer-const
      { error, statusCode } = exception,
      id,
      parameters;

    if (statusCode && error && error.length) {
      status = statusCode;
    } else if (!(exception instanceof HttpException)) {
      const exceptionData = exception.error?.response?.data || {};
      status = exceptionData.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      id = errorMessages.internal_error;
      error =
        exceptionData?.error ||
        message ||
        this.buildErrorMessage(id, parameters);
    } else if (!message && !status) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      parameters = exceptionResponse.parameters;
      id = exceptionResponse.id;
      message = exceptionResponse.message;
      error = message || this.buildErrorMessage(id, parameters);
    }
    const responseJson: ResponseType = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      success: false,
      data: null,
      path: request.url,
      error: error instanceof Array ? error : [error],
      developmentError: exception.message,
    };

    // send error to logService
    // const logContent = `${new Date().toISOString()} - ${status} ${JSON.stringify(
    //   responseJson,
    // )} `;
    // this.client.emit<any>(process.env.MANAGEMENT_API_SERVICE_LOG_EVENT, {
    //   info: 'Error',
    //   text: logContent,
    // });

    response.status(status).json(responseJson);
  }

  buildErrorMessage(id, parameters = []) {
    let message = id;
    if (message) {
      Object.keys(parameters).forEach((parameter) => {
        message = message.replace(`{{${parameter}}}`, parameters[parameter]);
      });
    }
    return message;
  }
}
