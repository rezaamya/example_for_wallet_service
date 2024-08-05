import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { TransactionsWalletService } from '../services/transactions.wallet.service';

describe('WalletController', () => {
  let controller: WalletController;
  let mockTransactionsWalletService: Partial<TransactionsWalletService>;

  beforeEach(async () => {
    mockTransactionsWalletService = {
      walletBalance: jest.fn(),
      addOrSubtractMoney: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: TransactionsWalletService,
          useValue: mockTransactionsWalletService,
        },
      ],
    }).compile();

    controller = module.get<WalletController, WalletController>(
      WalletController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('walletBalance', () => {
    it('should return the wallet balance', async () => {
      const userId = 1;
      const expectedBalance = 100;
      mockTransactionsWalletService.walletBalance = jest
        .fn()
        .mockResolvedValue(expectedBalance);

      const result = await controller.walletBalance({ user_id: userId });

      expect(result).toEqual({ balance: expectedBalance });
      expect(mockTransactionsWalletService.walletBalance).toHaveBeenCalledWith(
        userId,
      );
    });
  });

  describe('money', () => {
    it('should add money to the wallet', async () => {
      const userId = 1;
      const amount = 50;
      const expectedReferenceId = 123;
      mockTransactionsWalletService.addOrSubtractMoney = jest
        .fn()
        .mockResolvedValue(expectedReferenceId);

      const result = await controller.money({
        user_id: userId,
        amount: amount,
      });

      expect(result).toEqual({ reference_id: expectedReferenceId });
      expect(
        mockTransactionsWalletService.addOrSubtractMoney,
      ).toHaveBeenCalledWith(userId, amount);
    });
  });
});
