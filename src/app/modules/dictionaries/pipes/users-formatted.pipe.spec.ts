import { UsersFormattedPipe } from './users-formatted.pipe';

describe('UsersFormattedPipe', () => {
  it('create an instance', () => {
    const pipe = new UsersFormattedPipe();
    expect(pipe).toBeTruthy();
  });
});
