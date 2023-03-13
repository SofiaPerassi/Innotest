import { createEnvironmentInjector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';

import { CreateQuestionComponent } from './create-question.component';

describe('CreateQuestionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        MatDialogModule
      ],
      declarations: [
        CreateQuestionComponent
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }]
    }).compileComponents();

  });

  it('should create', () => {
    // const dialogRef: MatDialogRef<CreateQuestionComponent> = dialog.open(CreateQuestionComponent);
    const fixture = TestBed.createComponent(CreateQuestionComponent);
    const component = fixture.componentInstance
    expect(component).toBeTruthy();
  });

  it('Should return invalid form', () => {
    const fixture = TestBed.createComponent(CreateQuestionComponent);
    const component = fixture.componentInstance
    fixture.detectChanges()

    const enunciado = component.createForm.controls['content']
    enunciado.setValue('Esta es una pregunta')

    expect(component.createForm.invalid).toBeTrue();
  });

  // it('Should return invalid form', () => {
  //   const fixture = TestBed.createComponent(CreateQuestionComponent);
  //   const component = fixture.componentInstance
  //   fixture.detectChanges()

  //   const enunciado = component.createForm.controls['content']
  //   enunciado.setValue('Esta es una pregunta')

  //   const bloque = component.createForm.controls['bloque']
  //   bloque.setValue({
  //     id: 4,
  //     name: "Psicotécnicos",
  //   })
    
  //   const oposicion = component.createForm.controls['oposicion']
  //   oposicion.setValue([{
  //     id: 1,
  //     name: "Guardia Civil",
  //     isselected: true
  //   }])

  //   const test = component.createForm.controls['test']
  //   test.setValue([
  //     {
  //       id: 2,
  //       name: "Temas",
  //       isselected: true
  //     }
  //   ])

  //   expect(component.createForm.invalid).toBeFalse();
  // });
});
