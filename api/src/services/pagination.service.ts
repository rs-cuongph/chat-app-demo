import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export interface PaginationResult<T> {
  data: T[];
  meta: {
    is_first_page: boolean;
    is_last_page: boolean;
    current_page: number;
    previous_page: number | null;
    next_page: number | null;
    page_count: number;
    total_count: number;
  };
}

@Injectable()
export class PaginationService {
  constructor(
    @Inject('PrismaService')
    private prisma: PrismaService,
  ) {}

  async paginate<T>(
    query: string,
    params: any[],
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResult<T>> {
    const countQuery = `SELECT COUNT(*) as total FROM (${query}) as subquery`;
    const [{ total }] = await this.prisma.$queryRaw<
      [{ total: number }]
    >`${countQuery}`;

    const totalCount = Number(total);
    const pageCount = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    const paginatedQuery = `${query} LIMIT ${pageSize} OFFSET ${offset}`;
    const data = await this.prisma.$queryRaw<T[]>`${paginatedQuery}`;

    const meta = {
      is_first_page: page === 1,
      is_last_page: page === pageCount,
      current_page: page,
      previous_page: page > 1 ? page - 1 : null,
      next_page: page < pageCount ? page + 1 : null,
      page_count: pageCount,
      total_count: totalCount,
    };

    return { data, meta };
  }
}
