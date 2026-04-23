import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

// Мокаем axios
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxiosCreate = axios.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // важно для throttle
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });

    mockedAxiosCreate.mockReturnValue({
      get: getMock,
    });

    throttledGetDataFromApi('/posts');

    // Прокручиваем throttle
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });

    mockedAxiosCreate.mockReturnValue({
      get: getMock,
    });

    throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(getMock).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'test' };

    const getMock = jest.fn().mockResolvedValue({ data: mockData });

    mockedAxiosCreate.mockReturnValue({
      get: getMock,
    });

    const promise = throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await promise;

    expect(result).toEqual(mockData);
  });
});
