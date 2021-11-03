import { environment } from '@env/environment';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

export class JsonTranslateLoader implements TranslateLoader {
    public getTranslation(lang: string): Observable<any> {
        return fromPromise(import(`../../../assets/i18n/${lang ?? environment.defaultLang}.json`));
    }
}
