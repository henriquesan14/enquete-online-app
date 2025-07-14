import { IsOwner } from './is-owner';

describe('IsOwner', () => {
  it('should create an instance', () => {
    const directive = new IsOwner();
    expect(directive).toBeTruthy();
  });
});
