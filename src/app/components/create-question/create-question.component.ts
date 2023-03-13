import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CheckboxOption, RadioOption } from 'src/app/models/checkbox.model';
import { Questions } from 'src/app/models/questions.models';
import { MessageService } from 'src/app/service/message.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { Bloques, Oposiciones, Tests } from 'src/app/utils/list';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit{

  createForm: FormGroup 

  oposiciones: CheckboxOption[] = [];
  tests: CheckboxOption[] = [];
  bloques: RadioOption[] = [];

  dataSource!: MatTableDataSource<any>;

  getCheckbox(){
    this.oposiciones = Oposiciones;
    this.tests = Tests; 
    this.bloques = Bloques; 
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: QuestionsService,
    private dialogRef: MatDialogRef<CreateQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MessageService,
  ) {
    this.createForm = this.fb.group(
      {
        content: ['', [Validators.required]],
        bloque: [{}, [Validators.required]],
        oposicion: [ [], [Validators.required]],
        test: [ [], [Validators.required]],
      },
      {  }
    );
  }

  ngOnInit(): void {
    this.getCheckbox()
    this.createForm.patchValue(this.data);
  }

  getQuestionsList(){
    this.service.getQuestions().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  onSubmit() {
    const {
      id,
      content,
      bloque, 
      oposicion, 
      test
    } = this.createForm.value;

    const newQuestion: Questions = {
      id : id,
      content : content,
      bloque : this.bloques.filter(item => item.id == bloque)[0],
      oposicion : this.oposiciones.filter(item => item.isselected == true),
      test : this.tests.filter(item => item.isselected == true),
    };

    const currentData: Questions = {
      id,
      content,
      bloque,
      oposicion,
      test,
    }

    if (this.createForm.valid) {
      if (this.data) {
        this.service
          .editQuestion(this.data.id, newQuestion)
          .subscribe({
            next: (val: any) => {
              this.message.openSnackBar('La pregunta ha sido editada con exito!');
              this.dialogRef.close(true);
              // this.getQuestion.getQuestionsList()
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.service.createQuestion(newQuestion).subscribe({
          next: (val: any) => {
            this.message.openSnackBar('La pregunta fue creada con éxito!');
            this.dialogRef.close(true);
            console.log(newQuestion)
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
