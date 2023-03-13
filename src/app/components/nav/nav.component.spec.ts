import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        NavComponent
      ],
    }).compileComponents();

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const component = fixture.componentInstance
    expect(component).toBeTruthy();
  });
});
