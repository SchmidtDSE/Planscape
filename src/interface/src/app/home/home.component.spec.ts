import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '@services';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  function setUpComponent() {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { loggedInStatus$: new BehaviorSubject(false) },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    setUpComponent();
  });

  it('should show welcome if not logged in', () => {
    const auth = TestBed.inject(AuthService);
    auth.loggedInStatus$.next(false);
    fixture.detectChanges();
    const planTable = fixture.debugElement.query(By.css('app-welcome'));
    expect(planTable).toBeTruthy();
  });
  it('should show planning areas if logged in', () => {
    const auth = TestBed.inject(AuthService);
    auth.loggedInStatus$.next(true);
    fixture.detectChanges();
    const planTable = fixture.debugElement.query(By.css('app-planning-areas'));
    expect(planTable).toBeTruthy();
  });
});
