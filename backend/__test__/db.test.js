const { Client } = require('pg'); // Import the pg client to be mocked
const { initDatabase } = require('../config/db');

// Mock the 'pg' Client to avoid actual database calls
jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('Database and Table Creation', () => {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  it('should create the database if it does not exist', async () => {
    client.query.mockRejectedValueOnce({ code: '3D000' }) // First call fails, simulating no DB
                  .mockResolvedValueOnce(); // Second call succeeds for table creation

    await initDatabase();

    expect(client.connect).toHaveBeenCalledTimes(2); // Should connect twice (once for DB, once for table)
    expect(client.query).toHaveBeenCalledWith(`CREATE DATABASE "${process.env.DB_NAME}"`);
  });

  it('should log if the database already exists', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    client.query.mockRejectedValueOnce({ code: '42P04' }); // Simulate the DB already exists

    await initDatabase();

    expect(client.connect).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(`Database ${process.env.DB_NAME} already exists.`);
  });
});
