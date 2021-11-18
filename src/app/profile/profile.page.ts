import {Component} from '@angular/core';
import {IonViewWillEnter} from '@app/core/interfaces/ionic.interfaces';
import {ProfileUserFormService} from '@app/profile/forms/profile-user-form.service';
import {UserManagerService} from '@app/profile/services/user-manager.service';
import {first} from 'rxjs/operators';
import {ProfileUserFormFields} from '@app/profile/enums/profile-user-form-fields';
import {plainToClass} from 'class-transformer';
import {User} from '@app/profile/models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements IonViewWillEnter {

    public formFields = ProfileUserFormFields;

    constructor(
        public formService: ProfileUserFormService,
        private userManager: UserManagerService,
        private router: Router
    ) {
    }

    public ionViewWillEnter(): void {
        this.userManager.user$.pipe(first()).subscribe(
            u => this.formService.initForm(u)
        );
    }

    public save(): void {
        this.userManager.updateUser(this.getValue()).subscribe(
            () => this.router.navigateByUrl('/main'),
            e => console.error(e)
        );
    }

    private getValue(): User {
        const u = plainToClass(User, this.formService.form.value);
        u.gender = this.formService.form.get(this.formFields.gender).value === 'man';

        return u;
    }
}
