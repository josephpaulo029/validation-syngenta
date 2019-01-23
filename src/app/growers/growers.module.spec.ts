import { GrowersModule } from './growers.module';

describe('GrowersModule', () => {
  let growersModule: GrowersModule;

  beforeEach(() => {
    growersModule = new GrowersModule();
  });

  it('should create an instance', () => {
    expect(growersModule).toBeTruthy();
  });
});
