import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PreLogoutService {

    public run(): Promise<any> {
        return Promise.all([]);
    }
}
