import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FormMessageType } from '../../types';
import { SNACK_BOTTOM_NOTICE_CONFIG } from '../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INVITE_ROLE, InvitesService } from '../../services/invites.service';

const Roles: Record<INVITE_ROLE, string> = {
  Viewer: 'Viewer',
  Collaborator: 'Collaborator',
  Owner: 'Owner',
};

export interface Invite {
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-share-plan-dialog',
  templateUrl: './share-plan-dialog.component.html',
  styleUrls: ['./share-plan-dialog.component.scss'],
})
export class SharePlanDialogComponent {
  constructor(
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SharePlanDialogComponent>,
    private inviteService: InvitesService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number }
  ) {}

  emails: string[] = [];
  errorType = FormMessageType.ERROR;
  invalidEmail = false;
  showHelp = false;
  submitting = false;
  message = '';

  invites$ = of([
    { name: 'John Doe', role: 'Owner', email: 'john@doe.com' },
    { name: 'Richard Doe', role: 'Collaborator', email: 'richard@doe.com' },
    { name: 'John Doe', role: 'Owner', email: 'john@doe.com' },
    { name: 'Richard Doe', role: 'Collaborator', email: 'richard@doe.com' },
    { name: 'John Doe', role: 'Owner', email: 'john@doe.com' },
    { name: 'Richard Doe', role: 'Collaborator', email: 'richard@doe.com' },
    { name: 'John Doe', role: 'Owner', email: 'john@doe.com' },
    { name: 'Richard Doe', role: 'Collaborator', email: 'richard@doe.com' },
  ] as Invite[]);

  roles = Object.keys(Roles);

  selectedRole = this.roles[0] as INVITE_ROLE;

  addEmail(email: string): void {
    this.emails.push(email);
  }

  removeEmail(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  close() {
    this.dialogRef.close();
  }

  invite() {
    this.submitting = true;
    this.inviteService
      .inviteUsers(this.emails, this.selectedRole, this.data.id, this.message)
      .subscribe({
        next: (result) => {
          this.matSnackBar.open(
            'Users invited',
            'Dismiss',
            SNACK_BOTTOM_NOTICE_CONFIG
          );
          this.close();
        },
        error: () => {
          this.matSnackBar.open(
            'There was an error trying to send the invites. Please try again.',
            'Dismiss',
            SNACK_BOTTOM_NOTICE_CONFIG
          );
          this.submitting = false;
        },
      });
  }

  get showMessageBox() {
    return this.invalidEmail || this.emails.length > 0;
  }

  startOver() {
    this.invalidEmail = false;
    this.emails = [];
  }

  changeRole(invite: Invite) {
    this.matSnackBar.open(
      'Access Updated',
      'Dismiss',
      SNACK_BOTTOM_NOTICE_CONFIG
    );
  }

  changeInvitationsRole(role: string) {
    this.selectedRole = Roles[role as keyof typeof Roles] as INVITE_ROLE;
  }

  resendCode(invite: Invite) {
    this.matSnackBar.open(
      `Email sent to ${invite.email}`,
      'Dismiss',
      SNACK_BOTTOM_NOTICE_CONFIG
    );
  }

  removeAccess(invite: Invite) {
    this.matSnackBar.open(
      `Removed  ${invite.email}`,
      'Dismiss',
      SNACK_BOTTOM_NOTICE_CONFIG
    );
  }
}
