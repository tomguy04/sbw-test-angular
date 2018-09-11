import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensusblockComponent } from './censusblock.component';

describe('CensusblockComponent', () => {
  let component: CensusblockComponent;
  let fixture: ComponentFixture<CensusblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensusblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
