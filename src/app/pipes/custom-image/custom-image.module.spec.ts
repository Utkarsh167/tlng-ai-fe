import { CustomImageModule } from './custom-image.module';

describe('CustomImageModule', () => {
  let customImageModule: CustomImageModule;

  beforeEach(() => {
    customImageModule = new CustomImageModule();
  });

  it('should create an instance', () => {
    expect(customImageModule).toBeTruthy();
  });
});
