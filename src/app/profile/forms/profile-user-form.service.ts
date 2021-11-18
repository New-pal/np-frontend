import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '@app/profile/models/user';
import {ProfileUserFormFields} from '@app/profile/enums/profile-user-form-fields';

@Injectable()
export class ProfileUserFormService {

    public form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    public initForm(user: User): void {
        this.form = this.builder.group({
            [ProfileUserFormFields.firstName]: [user?.first_name],
            [ProfileUserFormFields.lastName]: [user?.last_name],
            [ProfileUserFormFields.birthday]: [user?.birthday],
            [ProfileUserFormFields.gender]: [user?.gender ? 'man': 'woman']
        });
    }
}
