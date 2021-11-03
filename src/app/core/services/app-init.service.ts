import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GlobalErrorHandlerService} from './global-error-handler.service';
import {AuthenticationService} from './authentication.service';
import {TokenManagerService} from './token-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private readonly platform: Platform,
        private readonly errorHandler: GlobalErrorHandlerService,
        private readonly auth: AuthenticationService,
        private readonly tokenManager: TokenManagerService
    ) {
    }

    // public init(): Promise<any> {
    //     return new Promise<any>(resolve => {
    //         this.platform.ready().then(async () => {
    //             this.tokenManager.init();
    //             Promise.all([
    //                 this.auth.init()
    //             ]).catch(error => this.errorHandler.handleError(error)).finally(() => resolve());
    //         }).catch(error => this.errorHandler.handleError(error)).finally(() => resolve());
    //     });
    // }
}
