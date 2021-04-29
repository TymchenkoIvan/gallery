import { TestBed, inject } from '@angular/core/testing';

import { PhotoService } from './photo-service.service';

describe('PhotoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService]
    });
  });

  it('should be created', inject([PhotoService], (service: PhotoService) => {
    expect(service).toBeTruthy();
  }));
});
