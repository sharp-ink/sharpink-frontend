import { ApiErrorCodeEnum } from './api-error-code-enum.model';

export interface ApiError {
    code: ApiErrorCodeEnum;
    message?: string;
}
