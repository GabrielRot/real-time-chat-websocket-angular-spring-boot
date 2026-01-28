import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersListComponent } from './active-users-list.component';

describe('ActiveUsersListComponent', () => {
  let component: ActiveUsersListComponent;
  let fixture: ComponentFixture<ActiveUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
