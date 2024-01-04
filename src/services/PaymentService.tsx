import env from '@/env';
type PaymentClient = any; // Replace with the appropriate AxiosInstance type

export class PaymentService {
    private static _instance: PaymentService = new PaymentService();
    private _paymentClient?: PaymentClient;

    private constructor() {
        if (PaymentService._instance) {
            throw new Error(
                'Error: Instantiation failed: Use PaymentService.getInstance() instead of new.'
            );
        }
        PaymentService._instance = this;
    }

    public static instance(): PaymentService {
        return PaymentService._instance;
    }

    public initClients = (clients: { loyaltyClient: PaymentClient }) => {
        this._paymentClient = clients.loyaltyClient;
    }

    getLoyaltyProfile = async () => {
      if (this._paymentClient) {
          return await this._paymentClient.get(`wallets?type=LOYALTY_WALLET`);
      } else {
        throw new Error("Payment Client is not registered");
      }
    };

    getTransactionsHistory = async () => {
        if (this._paymentClient) {
            return await this._paymentClient.get(`wallets?type=LOYALTY_WALLET`);
        } else {
            throw new Error("Payment Client is not registered");
        }
    };


}
