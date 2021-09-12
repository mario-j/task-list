import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskItemDialogComponent } from './edit-task-item-dialog.component';

describe('EditTaskItemDialogComponent', () => {
  let component: EditTaskItemDialogComponent;
  let fixture: ComponentFixture<EditTaskItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
