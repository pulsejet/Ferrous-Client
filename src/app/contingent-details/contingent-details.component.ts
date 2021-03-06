﻿import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contingent, RoomAllocation, Link } from '../interfaces';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { ContingentArrivalDialogComponent } from '../contingent-arrival-dialog/contingent-arrival-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorHelper } from '../helpers';


/* Contingent Details Component */
@Component({
    selector: 'app-contingent',
    templateUrl: './contingent-details.component.html',
})
export class ContingentDetailsComponent {
    public newrecord: boolean;
    /** true if currently editing */
    public editing = false;
    /** Object for reverting cancelled changes */
    public initial_contingent: Contingent;
    /** Master Contingent object */
    public contingent: Contingent;
    /** Link passed in the url, should refer to contingent self */
    public urlLink: Link;
    public links: Link[];
    paginatorHelper = new PaginatorHelper;

    /** constructor for ContingentDetailsComponent */
    constructor(
        private activatedRoute: ActivatedRoute,
        private _location: Location,
        public dataService: DataService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private titleService: Title) {

        this.titleService.setTitle('Contingent Details');

        /* Get URL parameters */
        this.activatedRoute.params.subscribe((params: Params) => {
            this.newrecord = params['edit'] === '1';
            this.urlLink = this.dataService.DecodeObject(params['id']);
        });

        /* CLNo 0 indicates a new record  *
         * Fetch if not a new record      */
        if (!this.newrecord) {
            this.dataService.FireLink<Contingent>(this.urlLink).subscribe(result => {
                this.contingent = result;
                this.links = result.links;
                this.initial_contingent = { ...this.contingent };   /* Shallow copy */
            }, error => {
                console.error(error);
                alert('No such Contingent or error retrieving!');
                this._location.back();       /* Go back if invalid */
            });
        }

        /* Start editing if edit was clicked */
        if (this.newrecord) {
            this.editing = true;
            this.contingent = {} as Contingent;
        }

    }

    /** Handle actions of both edit and cancel */
    public edit() {
        /* Cancel if startedit navigates to contingent list  */
        if (this.newrecord) {
            this.dataService.NavigateContingentsList();
            return;
        }

        /* Start/Stop editing; revert to initial values */
        this.editing = !this.editing;
        this.contingent = { ...this.initial_contingent };
    }

    /** PUT/POST the master */
    public save() {
        const body = JSON.stringify(this.contingent);

        /* PUT for editing; POST for new record */
        if (!this.newrecord) {
            this.dataService.FireLinkUpdate(this.links, body).subscribe(() => {
                /* Update the initial data */
                this.initial_contingent = { ...this.contingent };
                this.editing = !this.editing;
                if (this.newrecord) { this.dataService.NavigateContingentsList(); }
            });
        } else {
            /* Go back to list for new record */
            this.dataService.FireLink(this.urlLink, body).subscribe(() => {
                this.dataService.NavigateContingentsList();
            });
        }
    }

    /** DELETE a record */
    public delete() {
        if (confirm('Are you sure to delete?')) {
            this.dataService.FireLinkDelete(this.links).subscribe(() => {
                this.dataService.NavigateContingentsList();
            });
        }
    }

    /** DELETE a RoomAllocation */
    public unallocateRoom(roomA: RoomAllocation) {
        if (confirm('Are you sure you want to unallocate this room?')) {
            this.dataService.UnallocateRoom(roomA).subscribe(() => {
                /* Get the index and splice it from master */
                const index = this.contingent.roomAllocation.indexOf(roomA, 0);
                this.contingent.roomAllocation.splice(index, 1);

                /* Alert the user */
                this.snackBar.open('Room unallocated', 'Dismiss', {
                    duration: 2000,
                });
            });
        }
    }

    /** Open the allocation dialog */
    public StartAllocation() {
        this.dialog.open(ContingentArrivalDialogComponent, {
            data: {
                links: this.links,
                ca: this.contingent.contingentArrival,
                clno: this.contingent.contingentLeaderNo
            }
        });
    }
}
