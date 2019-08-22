import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId: string;
  note: Note;
  constructor(private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private noteService: NotesService,
    private router: RouterService) { }

  ngOnInit() {// It will trigger Edit dialog box to user when click on any note
    this.activatedRoute.params.subscribe(params => this.noteId = params.noteid);
    this.note = this.noteService.getNoteById(parseInt(this.noteId, 10));
    this.dialog.open(EditNoteViewComponent, {
      data: this.note
    }).afterClosed().subscribe(result => {
      this.router.routeToDashboard(); // It will navigate to dashboard page when click on outside of dialog box
    });

  }

}
