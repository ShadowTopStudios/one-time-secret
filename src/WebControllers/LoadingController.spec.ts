import { LoadingController } from './LoadingController';

describe('LoadingController Spec', function() {
  it('should return an http response with body containing template and secret uri', function() {

    const render = (identity: any) => { return identity; };
    const sut = new LoadingController(render);

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    sut.execute(<any> {}, <any> mockResponse);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/html' });
    expect(mockResponse.end).toBeCalledWith('uri-for-posting-form');
  });
});
