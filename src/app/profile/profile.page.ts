import {Component} from '@angular/core';
import {IonViewWillEnter} from '@app/core/interfaces/ionic.interfaces';
import {ProfileUserFormService} from '@app/profile/forms/profile-user-form.service';
import {UserManagerService} from '@app/profile/services/user-manager.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements IonViewWillEnter {

    constructor(private formService: ProfileUserFormService, private userManager: UserManagerService) {
    }

    public ionViewWillEnter(): void {
        this.userManager.user$.pipe(first()).subscribe(
            u => this.formService.initForm(u)
        );
    }

}
