// PaymentContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PaymentService } from '@/services/PaymentService';
import { useAuth } from 'react-native-auth-component';

// Define the context value type for Loyalty-related functions
interface PaymentContextType {
  fetchLoyaltyProfile: () => void;
  loyaltyProfileDetails: any;
}

// Create the Loyalty context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);
const loyaltyService = PaymentService.instance()

export const LoyaltyProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [loyaltyProfileDetails, setLoyaltyProfileDetails] = useState<any>(null);

  const fetchLoyaltyProfile = async () => {
    try {
      // Call the loyalty service to get loyalty details with pagination parameters
      const response = await loyaltyService.getLoyaltyProfile();
      // Check if the response contains data
      if (response.data) {
        // Set the loyaltyDetails state
        setLoyaltyProfileDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching loyalty details:', error);
    }
  };

  const fetchTransactionsHistory = async () => {

  }

  useEffect(() => {

  }, []);

  return (
    <PaymentContext.Provider value={{ loyaltyProfileDetails,fetchLoyaltyProfile }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
