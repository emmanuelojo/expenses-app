export interface apiResponse {
  code: number;
  error?: apiError;
  message: string;
  success: boolean;
  data?: any;
}

export interface apiError {
  devMessage: string;
  possibleSolution: string;
  exceptionError: string;
  validationError: any[];
  userMessage: string;
  errorCode: number;
}
