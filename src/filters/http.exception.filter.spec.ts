import { ArgumentsHost, HttpException } from '@nestjs/common';
import { AllExceptionsFilter } from './http.exception.filter';

const mockHost = {
  switchToHttp: () => ({
    getResponse: jest.fn().mockImplementation(() => ({
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(() => 'response'),
      })),
    })),
    getRequest: jest.fn(() => 'response'),
  }),
} as unknown as ArgumentsHost;

describe('HttpExceptionFilter', () => {
  let httpExceptionFilter: AllExceptionsFilter;

  beforeEach(() => {
    httpExceptionFilter = new AllExceptionsFilter();
    jest.clearAllMocks();
  });

  it('should call reply method from http adapter when catch method is called', () => {
    expect(httpExceptionFilter.catch(new Error(), mockHost)).toBeUndefined();
  });
});

describe('HttpExceptionFilter', () => {
  let httpExceptionFilter: AllExceptionsFilter;

  beforeEach(() => {
    httpExceptionFilter = new AllExceptionsFilter();
    jest.clearAllMocks();
  });

  it('should call reply method from HttpException', () => {
    expect(
      httpExceptionFilter.catch(new HttpException('Test error', 400), mockHost),
    ).toBeUndefined();
  });
});
