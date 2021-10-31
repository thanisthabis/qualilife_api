/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import env from './env';

export class LoggerAddon implements LoggerService{
    
    private readonly logger: any;
    private readonly context: string;

    constructor(configService: ConfigService, context?: string){

    }

    setContext(context?: string): string{
        if(context) return context;
        if(this.context) return this.context;
        return 'NONSPECIFIED';
    }

    log(message: any, context?: string) {     
        const ctx = this.setContext(context);
        this.logger.info(`[${ctx}] ${message}`);
    }

    error(message: any, trace?: string, context?: string) {
        const ctx = this.setContext(context);
        this.logger.error(`[${ctx}] ${message}`);
    }

    warn(message: any, context?: string) {
        const ctx = this.setContext(context);
        this.logger.warn(`[${ctx}] ${message}`);
    }

    debug?(message: any, context?: string) {
        const ctx = this.setContext(context);
        this.logger.info(`[${ctx}] ${message}`);
    }

    verbose?(message: any, context?: string) {
        const ctx = this.setContext(context);
        this.logger.verbose(`[${ctx}] ${message}`);
    }
}

// For unit testing only
export class NoOpLogger implements LoggerService {
    log(message: any, context?: string) {
    }
    error(message: any, trace?: string, context?: string) {
    }
    warn(message: any, context?: string) {
    }
    debug?(message: any, context?: string) {
    }
    verbose?(message: any, context?: string) {
    }
}