/* eslint-disable no-undef */
import { loadPages } from './load-pages';
import config from '../config';
import * as mapDataModule from './map-data';

jest.mock('./map-data', () => {
  return {
    mapData: jest.fn().mockResolvedValue({ mapped: 1 }),
  };
});

let mockFetch = null;
let mockJson = null;

describe('load-pages', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockJson = jest
      .fn()
      .mockResolvedValue(Promise.resolve({ data: { toJson: 1 } }));

    mockFetch = global.fetch;
    mockFetch.mockResolvedValue({
      json: mockJson,
    });

    jest.clearAllMocks();
  });

  it('should call fetch and mapData with correct values', async () => {
    const result = await loadPages();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(config.url + '/api/pages/');
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mapDataModule.mapData).toHaveBeenCalledTimes(1);
    expect(mapDataModule.mapData).toHaveBeenCalledWith({ toJson: 1 });
    expect(result).toEqual({ mapped: 1 });
  });

  it('should call fetch with correct slug', async () => {
    const slug = 'atenção testando';
    const result = await loadPages(slug);
    expect(mockFetch).toHaveBeenCalledWith(
      `${config.url}/api/pages/${config.ruleAPICall(slug)}`,
    );
    expect(result).toEqual({ mapped: 1 });
  });
});
