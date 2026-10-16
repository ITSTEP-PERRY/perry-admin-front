export interface HealthCheckResponse {
    status: string;
    service: string;
    timestamp: string;
    database?: string;
    utc?: string;
}
