import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';
import {RegisterCredentials} from '@app/auth/interfaces/register-credentials';
import {Observable} from 'rxjs';

@Injectable()
export class RegistrationService {

    private readonly url = environment.backend.register;

    constructor(private client: ApiClientService) {
    }

    public register(data: RegisterCredentials): Observable<any> {
        return this.client.post(this.url, data);
    }
}
