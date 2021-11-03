export interface AuthResponseInterface {
    /* eslint-disable @typescript-eslint/naming-convention */
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
    access_expire?: number;
    refresh_expire?: number;
}
