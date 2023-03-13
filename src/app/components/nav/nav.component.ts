import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsService } from 'src/app/service/questions.service';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private _dialog: MatDialog, 
    private service: QuestionsService){}

  goToCreate(){
    const dialogRef = this._dialog.open(CreateQuestionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        //Si val es true, se refresca la lista con el nuevo objeto creado 
        if (val) {
          // this.getQuestionsList();
        }
      },
    });
  }

}
