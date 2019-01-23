import { LayoutRoutingModule } from './layout-routing.module';

describe('LayoutRoutingModule', () => {
  let layoutRoutingModule: LayoutRoutingModule;

  beforeEach(() => {
    layoutRoutingModule = new LayoutRoutingModule();
  });

  it('should create an instance', () => {
    expect(layoutRoutingModule).toBeTruthy();
  });
});
