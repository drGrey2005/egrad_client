import { ActionLogModule } from './action-log.module';

describe('ActionLogModule', () => {
  let actionLogModule: ActionLogModule;

  beforeEach(() => {
    actionLogModule = new ActionLogModule();
  });

  it('should create an instance', () => {
    expect(actionLogModule).toBeTruthy();
  });
});
