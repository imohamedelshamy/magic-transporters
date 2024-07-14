import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LogService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;
    const requestBody = JSON.stringify(request.body);
    const requestQuery = JSON.stringify(request.query);
    const requestHeaders = JSON.stringify(request.headers);
    const startTime = Date.now();

    const cyan = '\x1b[36m';
    const magenta = '\x1b[35m';
    const yellow = '\x1b[33m';
    const red = '\x1b[31m';
    const reset = '\x1b[0m';

    this.logger.log(
      `${cyan}Incoming Request:${reset} ${magenta}${method}${reset} ${yellow}${url}${reset}`,
    );
    this.logger.log(`${cyan}Request Body:${reset} ${requestBody}`);
    this.logger.log(`${cyan}Request Query:${reset} ${requestQuery}`);
    this.logger.log(`${cyan}Request Headers:${reset} ${requestHeaders}`);

    return next.handle().pipe(
      tap((responseBody) => {
        const endTime = Date.now();
        const responseStatus = response.statusCode;
        const responseTime = endTime - startTime;
        const responseBodyStr = JSON.stringify(responseBody);

        this.logger.log(
          `${cyan}Outgoing Response:${reset} ${magenta}${method}${reset} ${yellow}${url}${reset}`,
        );
        this.logger.log(`${cyan}Response Status:${reset} ${responseStatus}`);
        this.logger.log(
          `${cyan}Response Body:${reset} ${yellow}${responseBodyStr}${reset}`,
        );
        this.logger.log(`${cyan}Response Time:${reset} ${responseTime}ms`);
      }),
      catchError((err) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        this.logger.error(
          `${red}Error Handling Request:${reset} ${magenta}${method}${reset} ${yellow}${url}${reset}`,
          url,
        );
        this.logger.error(`${red}Error Message:${reset} `, err.message);
        this.logger.error(`${red}Stack Trace:${reset} `, err.stack);
        this.logger.error(`${red}Response Time:${reset} ${responseTime}ms`, '');

        return throwError(err);
      }),
    );
  }
}
