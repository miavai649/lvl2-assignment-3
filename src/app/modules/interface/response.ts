export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  data: T;
};
