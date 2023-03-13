import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Questions } from '../models/questions.models';
import { QuestionsService } from './questions.service';

describe('Questions Service', () => {
  let service: QuestionsService;
  let httpClientSpy: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };

  function post() {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new QuestionsService(httpClientSpy as any);

    return { httpClientSpy, service };
  };

  function get() {
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    service = new QuestionsService(httpClientSpyGet as any);

    return { httpClientSpyGet, service };
  };

  it('should be created', () => {
    const { service } = post();
    expect(service).toBeTruthy();
  });

  it('Should return a Question', (done: DoneFn) => {
    const { httpClientSpy, service } = post();

    const mockQuestion = { 
      id : 1,
      content: 'Pregunta',
      bloque: {
        id: 1,
        name: 'Ortografía'
      },
      oposicion: [
        {
          id: 1,
          name: 'Guardia Civil', 
          isselected: true
        }
      ], 
      test: [
        {
          id: 1,
          name: 'Titulos', 
          isselected: true
        }
      ]
    }

    const mockResult = [{
      "content": "Pregunta",
      "bloque": {
        "id": 1,
        "name": "Ortografía"
      },
      "oposicion": [
        {
          "id": 1,
          "name": "Guardia Civil",
          "isselected": true
        }
      ],
      "test": [
        {
          "id": 1,
          "name": "Titulos",
          "isselected": true
        }
      ],
      "id": 1
    },]

    httpClientSpy.post.and.returnValue(of(mockResult))

    const {       
      id,
      content,
      bloque, 
      oposicion, 
      test } = mockQuestion

    service.createQuestion(mockQuestion)
      .subscribe(resultado => {
        expect(resultado).toEqual(mockResult)
        done()
      })

  });

  // it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
  //   const { httpClientSpyGet, service } = get();

  //   const questions: Questions[] =
  //     [
  //       { id : 1,
  //       content: 'Pregunta',
  //       bloque: {
  //         id: 1,
  //         name: 'Ortografía'
  //       },
  //       oposicion: [
  //         {
  //           id: 1,
  //           name: 'Guardia Civil', 
  //           isselected: true
  //         }
  //       ], 
  //       test: [
  //         {
  //           id: 1,
  //           name: 'Titulos', 
  //           isselected: true
  //         }
  //       ] }
  //     ];
  
  //   httpClientSpyGet.get.and.returnValue((questions));
  
  //   service.getQuestions().subscribe({
  //     next: questions => {
  //       expect(questions)
  //         .withContext('expected questions')
  //         .toEqual(questions);
  //       done();
  //     },
  //     error: done.fail
  //   });
  //   expect(httpClientSpyGet.get.calls.count())
  //     .withContext('one call')
  //     .toBe(1);
  // });
  
  it('should return expected question'), () => {
    const mockQuestions: Questions[] = [
      { id : 1,
        content: 'Pregunta',
        bloque: {
          id: 1,
          name: 'Ortografía'
        },
        oposicion: [
          {
            id: 1,
            name: 'Guardia Civil', 
            isselected: true
          }
        ], 
        test: [
          {
            id: 1,
            name: 'Titulos', 
            isselected: true
          }
        ] 
      }
    ]

    service.getQuestions().subscribe(data => {
      expect(data.length).toBe(1)
      expect(data).toEqual(mockQuestions)
    })

  }
  

});