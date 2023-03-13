import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { CheckboxOption } from 'src/app/models/checkbox.model';
// import { Oposicion, Questions } from 'src/app/models/questions.models';
import { MessageService } from 'src/app/service/message.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'content',
    'bloque',
    'oposicion',
    'test',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private service: QuestionsService, 
    private message: MessageService
  ){}  

  ngOnInit(): void {
    
    this.getQuestionsList()

      // this.store.dispatch(loadQuestions())
  }

  getQuestionsList(){
    this.service.getQuestions().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.service.deleteQuestion(id).subscribe({
      next: (res) => {
        this.message.openSnackBar('Employee deleted!', 'done');
        this.getQuestionsList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CreateQuestionComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        //Si es true se refresca la lista con el objeto editado 
        if (val) {
          this.getQuestionsList();
        }
      },
    });
  }

}
