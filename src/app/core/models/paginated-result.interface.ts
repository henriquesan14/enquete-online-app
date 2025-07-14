export interface PaginatedResult<T> {
    pageNumber: number;
    pageSize: number;
    data: T[];
    count: number;
}