export class HealthCheckDTO {
    buildNum?: string = 'unspecified';
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' = 'ACTIVE';
    dbConnection: boolean;
    message?: string;
}