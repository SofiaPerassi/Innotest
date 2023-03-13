import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { LayoutComponent } from '../layout/layout.component';
import { NavComponent } from '../nav/nav.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        NavComponent,
        LayoutComponent,
        HomeComponent
      ],
    }).compileComponents();

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance
    expect(component).toBeTruthy();
  });
});
