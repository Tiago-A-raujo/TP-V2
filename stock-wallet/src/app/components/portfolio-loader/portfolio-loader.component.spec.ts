import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLoaderComponent } from './portfolio-loader.component';

describe('PortfolioLoaderComponent', () => {
  let component: PortfolioLoaderComponent;
  let fixture: ComponentFixture<PortfolioLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
