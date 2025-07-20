export interface Response {
  data: object;
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  error: string[];
  developmentError?: string;
}
