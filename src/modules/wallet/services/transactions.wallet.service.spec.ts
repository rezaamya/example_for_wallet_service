import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsWalletService } from './transactions.wallet.service';
import { TransactionModel } from '../models/transaction.model';

describe('TransactionsWalletService', () => {
  let service: TransactionsWalletService;
  let mockTransactionModel: Partial<TransactionModel>;

  beforeEach(async () => {
    mockTransactionModel = {
      findLatestByUserId: jest.fn(),
      insertOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsWalletService,
        {
          provide: TransactionModel,
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionsWalletService, TransactionsWalletService>(
      TransactionsWalletService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('walletBalance', () => {
    it('should return the correct balance for a user', async () => {
      const userId = 1;
      const expectedBalance = 100;
      mockTransactionModel.findLatestByUserId = jest
        .fn()
        .mockResolvedValue({ balance: expectedBalance });

      const result = await service.walletBalance(userId);

      expect(result).toBe(expectedBalance);
      expect(mockTransactionModel.findLatestByUserId).toHaveBeenCalledWith(
        userId,
      );
    });
  });

  describe('addOrSubtractMoney', () => {
    it('should add money to the wallet', async () => {
      const userId = 1;
      const amount = 50;
      const expectedReferenceId = 123;
      mockTransactionModel.insertOne = jest
        .fn()
        .mockResolvedValue({ reference_id: expectedReferenceId });

      const result = await service.addOrSubtractMoney(userId, amount);

      expect(result).toBe(expectedReferenceId);
      expect(mockTransactionModel.insertOne).toHaveBeenCalledWith(
        userId,
        amount,
      );
    });
  });
});
