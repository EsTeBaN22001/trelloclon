import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CardBoardComponent } from './card-board.component'

describe('CardBoardComponent', () => {
  let component: CardBoardComponent
  let fixture: ComponentFixture<CardBoardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardBoardComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CardBoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
