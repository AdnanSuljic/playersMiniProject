import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalTeamsComponent } from './national-teams.component';

describe('NationalTeamsComponent', () => {
  let component: NationalTeamsComponent;
  let fixture: ComponentFixture<NationalTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
