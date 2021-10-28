import { InfodocsModule } from './infodocs.module';

describe('InfodocsModule', () => {
  let infodocsModule: InfodocsModule;

  beforeEach(() => {
    infodocsModule = new InfodocsModule();
  });

  it('should create an instance', () => {
    expect(infodocsModule).toBeTruthy();
  });
});
