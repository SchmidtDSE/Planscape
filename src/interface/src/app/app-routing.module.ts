import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';

import { createFeatureGuard } from './features/feature.guard';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { CreateScenariosComponent } from './plan/create-scenarios/create-scenarios.component';
import { PlanTableComponent } from './plan/plan-table/plan-table.component';
import { PlanComponent } from './plan/plan.component';
import { ScenarioConfirmationComponent } from './plan/scenario-confirmation/scenario-confirmation.component';
import { ScenarioDetailsComponent } from './plan/scenario-details/scenario-details.component';
import { RegionSelectionComponent } from './region-selection/region-selection.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    title: 'Planscape',
    children: [
      { path: '', redirectTo: 'region', pathMatch: 'full' },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        canActivate: [createFeatureGuard('login')],
      },
      {
        path: 'signup',
        title: 'Signup',
        component: SignupComponent,
        canActivate: [createFeatureGuard('login')],
      },
      {
        path: 'region',
        title: 'Region Selection',
        component: RegionSelectionComponent,
      },
      { path: 'map', title: 'Explore', component: MapComponent },
      {
        path: 'plan/:id',
        title: 'Plan Details',
        component: PlanComponent,
        children: [
          {
            path: `scenario/:id`,
            title: 'Saved Scenario Details',
            component: ScenarioDetailsComponent,
          },
          {
            path: 'config/:id',
            title: 'Scenario Configuration',
            component: CreateScenariosComponent,
          },
        ],
      },
      {
        path: 'scenario-confirmation/:id',
        title: 'Generating Scenario',
        component: ScenarioConfirmationComponent,
      },
      { path: 'plan', title: 'My Plans', component: PlanTableComponent },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class PlanscapeTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Planscape | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: PlanscapeTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
