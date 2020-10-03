import { authConfig } from './auth';

const isProduction = process.env.MM_DATABASE_IS_PRODUCTION;

export {
    isProduction,
    authConfig
}