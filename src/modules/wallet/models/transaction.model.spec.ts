import { Test, TestingModule } from '@nestjs/testing';
import { TransactionModel } from './transaction.model';
import { Pool } from 'pg';

describe('TransactionModel', () => {
  let model: TransactionModel;
  let mockPool: Partial<Pool>;

  beforeEach(async () => {
    mockPool = {
      query: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionModel,
        {
          provide: 'PG',
          useValue: mockPool,
        },
      ],
    }).compile();

    model = module.get<TransactionModel, TransactionModel>(TransactionModel);
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('findLatestByUserId', () => {
    it('should return the latest transaction for a user', async () => {
      const userId = 1;
      const expectedTransaction = {
        reference_id: 1,
        user_id: userId,
        amount: 100,
        balance: 100,
        created_at: new Date(),
      };
      mockPool.query = jest
        .fn()
        .mockResolvedValue({ rows: [expectedTransaction] });

      const result = await model.findLatestByUserId(userId);

      expect(result).toEqual(expectedTransaction);
      expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    });
  });

  describe('insertOne', () => {
    it('should insert a new transaction and return it', async () => {
      const userId = 1;
      const amount = 50;
      const expectedTransaction = {
        reference_id: 2,
        user_id: userId,
        amount: amount,
        balance: 150,
        created_at: new Date(),
      };
      mockPool.query = jest
        .fn()
        .mockResolvedValueOnce({ rows: [{ balance: 100 }] }) // findLatestByUserId
        .mockResolvedValueOnce({ rows: [expectedTransaction] }); // insertOne

      const result = await model.insertOne(userId, amount);

      expect(result).toEqual(expectedTransaction);
      expect(mockPool.query).toHaveBeenCalledTimes(2);
    });
  });
});
