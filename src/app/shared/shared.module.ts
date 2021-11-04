import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from '@app/shared/components/main-menu/main-menu.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [
        MainMenuComponent
    ],
    exports: [
        MainMenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        TranslateModule,
    ]
})
export class SharedModule {
}
