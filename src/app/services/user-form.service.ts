import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class UsersFormService {
  private fb: FormBuilder = inject(FormBuilder)

  public createUserFormGroup(userData?: any): FormGroup {
      return this.fb.group({
        id: [userData?.id ?? new Date().getTime()],
        name: [userData?.name ?? '', Validators.required],
        email: [userData?.email ?? '', [Validators.email, Validators.required]],
        phone: [userData?.phone ?? '', Validators.required],
        website: [userData?.website ?? '', Validators.required],
      })
    }
}
