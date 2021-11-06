import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {IonicSelectableModule} from 'ionic-selectable';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {AppInitService} from './core/services/app-init.service';
import {AuthInterceptor} from './core/services/auth-interceptor.service';
import {GlobalErrorHandlerService} from './core/services/global-error-handler.service';
import {HeadersInterceptor} from './core/services/headers-interceptor.service';
import {environment} from '@env/environment';
import {JsonTranslateLoader} from '@app/core/services/json-translate-loader';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicSelectableModule,
        IonicModule.forRoot({
            mode: 'md'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: JsonTranslateLoader,
            },
            defaultLanguage: environment.defaultLang,
        }),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LeafletModule.forRoot(),
        SharedModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (initService: AppInitService) => () => initService.init(),
            multi: true,
            deps: [AppInitService]
        },
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeadersInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
