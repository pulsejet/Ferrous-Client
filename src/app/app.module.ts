import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { NavMenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';

import { ContingentComponent } from './contingent/contingent.component';
import { ContingentDetailsComponent } from './contingent-details/contingent-details.component';
import { ContingentArrivalDialogComponent } from './contingent-arrival-dialog/contingent-arrival-dialog.component';

import { PersonComponent } from './person/person.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

import { RoomLayoutComponent } from './room-layout/room-layout.component';
import { LocationSelectComponent } from './location-select/location-select.component';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';

import { CounterComponent } from './counter/counter.component';
import { MyMaterialClass } from './material-angular.module';
import { DataService } from './data.service';

import { HttpClientModule } from '@angular/common/http';
import { FilterContingents } from './pipes/filter-contingents';
import { ClickStopPropagationDirective } from './helpers';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { Desk1Component } from './desk1/desk1.component';
import { Desk2Component } from './desk2/desk2.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UploadComponent } from './upload/upload.component';
import { UploadSheetComponent } from './upload-sheet/upload-sheet.component';
import { UsersComponent } from './users/users.component';
import { ColorLegendComponent } from './color-legend/color-legend.component';
import { Desk2QueueComponent } from './desk2-queue/desk2-queue.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,

        ContingentComponent,
        ContingentDetailsComponent,
        ContingentArrivalDialogComponent,

        PersonComponent,
        PersonDetailsComponent,

        RoomLayoutComponent,
        LocationSelectComponent,
        RoomDialogComponent,

        HomeComponent,

        ClickStopPropagationDirective,
        FilterContingents,
        LoginComponent,
        Desk1Component,
        Desk2Component,
        RegisterComponent,
        StatisticsComponent,
        UploadComponent,
        UploadSheetComponent,
        UsersComponent,
        ColorLegendComponent,
        Desk2QueueComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),

        CommonModule,
        HttpClientModule,
        FormsModule,
        MyMaterialClass,
        NgxUpperCaseDirectiveModule,
        Ng2GoogleChartsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },

            { path: 'contingent', component: ContingentComponent },
            { path: 'contingent/:id', component: ContingentDetailsComponent },
            { path: 'contingent/:id/:edit', component: ContingentDetailsComponent },

            { path: 'person', component: PersonComponent },
            { path: 'person/:link', component: PersonDetailsComponent },
            { path: 'person/:link/:edit', component: PersonDetailsComponent },

            { path: 'room-layout/:link/:location/:clno', component: RoomLayoutComponent },
            { path: 'location-select/:link/:clno', component: LocationSelectComponent },

            { path: 'desk1/:link', component: Desk1Component },
            { path: 'desk2/:link', component: Desk2Component },
            { path: 'desk2queue', component: Desk2QueueComponent },

            { path: 'register', component: RegisterComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'upload-sheet', component: UploadSheetComponent },
            { path: 'users', component: UsersComponent },

            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        DataService
    ],
    entryComponents: [
        ContingentArrivalDialogComponent,
        RoomDialogComponent
    ]
})
export class AppModule { }

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
