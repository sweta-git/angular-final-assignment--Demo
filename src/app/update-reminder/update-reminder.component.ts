import { Component, OnInit, Inject } from '@angular/core';
import { ReminderService } from '../services/reminder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reminder } from '../create-reminder/reminder';
@Component({
  selector: 'app-update-reminder',
  templateUrl: './update-reminder.component.html',
  styleUrls: ['./update-reminder.component.css']
})
export class UpdateReminderComponent implements OnInit {

  errMessage: string;
  reminder: Reminder;
  reminders: Reminder[];
  constructor(private reminderService: ReminderService, public dialogRef: MatDialogRef<UpdateReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reminder = this.data;
    this.reminders = [];
  }

  ngOnInit() {
  }
  // Update reminder along with validation
  editReminder() {
    if (this.reminder.reminderName === '' && this.reminder.reminderDescription === '' && this.reminder.reminderType === '') {
      this.errMessage = 'Name , desc and type both are required fields';
    }
    if (this.reminder.reminderName !== '' && this.reminder.reminderDescription !== '' && this.reminder.reminderType !== '') {
      this.errMessage = '';

      this.reminderService.editReminder(this.reminder).subscribe(addedReminder => {
      }, error => {
        this.errMessage = error.message;
        const index = this.reminders.findIndex(reminder => reminder.id === this.reminder.reminderId);
        this.reminders.splice(index, 1);
      });
    }
    this.dialogRef.close();
  }

}
