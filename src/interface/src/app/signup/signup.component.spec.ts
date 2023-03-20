import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { MaterialModule } from '../material/material.module';
import { AuthService } from '../services';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let fakeAuthService: AuthService;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: string[]) => ({}) });
    fakeAuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      { signup: of({}) },
      {}
    );
    TestBed.configureTestingModule({
      imports: [FormsModule, MaterialModule, ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('signup form', () => {
    it('disables continue button when first half of form is incomplete', () => {
      expect(component.enableContinue()).toBeFalse();
    });

    it('enables continue button when first half of form is complete', () => {
      component.form.get('firstName')?.setValue('Foo');
      component.form.get('lastName')?.setValue('Bar');

      expect(component.enableContinue()).toBeTrue();
    });

    it('disables submit when password fields are not equal', () => {
      component.form.get('password1')?.setValue('foo');
      component.form.get('password2')?.setValue('bar');

      expect(component.form.valid).toBeFalse();
    });

    it('enables submit when all fields are valid', () => {
      component.form.get('firstName')?.setValue('Foo');
      component.form.get('lastName')?.setValue('Bar');
      component.form.get('username')?.setValue('testuser');
      component.form.get('email')?.setValue('test@test.com');
      component.form.get('password1')?.setValue('password');
      component.form.get('password2')?.setValue('password');

      expect(component.form.valid).toBeTrue();
    });
  });

  describe('signup', () => {
    it('calls authentication service', () => {
      component.form.get('username')?.setValue('testuser');
      component.form.get('email')?.setValue('test@test.com');
      component.form.get('password1')?.setValue('password');
      component.form.get('password2')?.setValue('password');

      component.signup();

      expect(fakeAuthService.signup).toHaveBeenCalledOnceWith(
        'testuser',
        'test@test.com',
        'password',
        'password'
      );
    });
  });

  describe('login', () => {
    it('navigates to login page', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();

      component.login();

      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
