import { DictionariesModule } from './dictionaries.module';

describe('DictionariesModule', () => {
  let dictionariesModule: DictionariesModule;

  beforeEach(() => {
    dictionariesModule = new DictionariesModule();
  });

  it('should create an instance', () => {
    expect(dictionariesModule).toBeTruthy();
  });
});
