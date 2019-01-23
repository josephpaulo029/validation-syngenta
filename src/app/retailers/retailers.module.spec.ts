import { RetailersModule } from './retailers.module';

describe('RetailersModule', () => {
  let retailersModule: RetailersModule;

  beforeEach(() => {
    retailersModule = new RetailersModule();
  });

  it('should create an instance', () => {
    expect(retailersModule).toBeTruthy();
  });
});
