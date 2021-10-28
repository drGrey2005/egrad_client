import { RoadOwnersModule } from './road-owners.module';

describe('RoadOwnersModule', () => {
  let roadOwnersModule: RoadOwnersModule;

  beforeEach(() => {
    roadOwnersModule = new RoadOwnersModule();
  });

  it('should create an instance', () => {
    expect(roadOwnersModule).toBeTruthy();
  });
});
