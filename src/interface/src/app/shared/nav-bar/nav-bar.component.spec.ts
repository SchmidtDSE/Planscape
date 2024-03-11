import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { WINDOW } from '@services/window.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FeaturesModule } from '../../features/features.module';
import { MockProvider } from 'ng-mocks';
import { PlanStateService } from '@services';
import { NEVER } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FeaturesModule],
      declarations: [NavBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: WINDOW,
          useValue: {
            location: {
              href: 'some-url',
            },
            navigator: {
              clipboard: {
                writeText: () => {},
              },
            },
            print: () => {},
          },
        },
        MockProvider(PlanStateService, {
          getPlan: () => NEVER,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open print menu when clicking on print', () => {
    const window = TestBed.inject(WINDOW);
    spyOn(window, 'print');
    const printLink = fixture.debugElement.query(By.css('[data-id="print"]'));
    printLink.nativeElement.click();

    expect(window.print).toHaveBeenCalled();
  });
});
