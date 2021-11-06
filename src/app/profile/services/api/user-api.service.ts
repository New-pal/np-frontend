import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {User} from '@app/profile/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {environment} from '@env/environment';

@Injectable()
export class UserApiService extends AbstractApiService<User> {

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return environment.backend.user;
    }

    // @ts-ignore
    protected transform(data: User | User[]): User | User[] {
        return plainToClass(User, data);
    }
}
