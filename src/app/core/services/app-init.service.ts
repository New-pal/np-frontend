import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GlobalErrorHandlerService} from './global-error-handler.service';
import {AuthenticationService} from './authentication.service';
import {TokenManagerService} from './token-manager.service';
import {UserManagerService} from '@app/profile/services/user-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private readonly platform: Platform,
        private readonly errorHandler: GlobalErrorHandlerService,
        private readonly auth: AuthenticationService,
        private readonly tokenManager: TokenManagerService,
        private readonly userManager: UserManagerService
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(async () => {
                this.tokenManager.init();
                this.auth.init().then(
                    () => Promise.all([
                        this.userManager.init()
                    ]).catch(error => this.errorHandler.handleError(error)).finally(() => resolve(null))
                );
            }).catch(error => this.errorHandler.handleError(error)).finally(() => resolve(null));
        });
    }
}
