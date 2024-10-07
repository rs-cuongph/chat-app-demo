import type { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { QueryInfo } from 'nestjs-prisma';
// import { LoggingOptions, QueryLoggingExt } from 'prisma/extendsion/logger';
// import { SoftDeleteExt } from 'prisma/extendsion/soft-delete';
import PaginationExt from 'prisma-extension-pagination';

export interface LoggingOptions {
  logger: Console | Logger;
  logLevel: 'log' | 'debug' | 'warn' | 'error';
  /**
   * Create a custom log message.
   */
  logMessage?: (query: QueryInfo) => string;
}

interface CustomPrismaClientOpts {
  loggingOpts: LoggingOptions;
}

export const CustomPrismaClient = (options: CustomPrismaClientOpts) => {
  console.log(options);
  return (
    new PrismaClient<
      Prisma.PrismaClientOptions,
      'query' | 'info' | 'warn' | 'error'
    >({
      log: ['query', 'info'],
      transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      },
    })
      // .$extends(QueryLoggingExt(options.loggingOpts))
      // .$extends(SoftDeleteExt())
      .$extends(PaginationExt())
  );
};

export type ExtendedPrismaClient = ReturnType<typeof CustomPrismaClient>;
