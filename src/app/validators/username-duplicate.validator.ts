import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserAccountService } from '../services/api/user-account.service';

@Injectable({
    providedIn: 'root'
})
export class UsernameDuplicateValidator {

    debouncer: any;

    constructor(private readonly userAccountApi: UserAccountService) {

    }

    checkUsername(control: FormControl, origValue: string): any {

        clearTimeout(this.debouncer);

        return new Promise(resolve => {

            this.debouncer = setTimeout(() => {

                // only check if the name has changed from the original
                if (origValue && control.value === origValue) {
                    resolve(null);
                    return;
                }

                // only check if there is a value registered
                if (!control.value) {
                    resolve(null);
                    return;
                }

                this.userAccountApi.exists(control.value).subscribe((exists: boolean) => {
                    if (exists) {
                        resolve({ 'duplicate': true });
                        return;
                    } else {
                        resolve(null);
                        return;
                    }
                });

            }, 1000);

        });
    }

}
