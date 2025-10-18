
import { create } from 'zustand';
import type { Payment } from '../types/global';

interface PaymentState {
  payments: Payment[];
}

// ✅ Fixed TS2349 & TS7006: Correctly typed the Zustand store
const usePaymentStore = create<PaymentState>(() => ({
  payments: [
    { id: 1, memberId: 1, amount: 50, date: '2024-05-01', status: 'Paid' },
    { id: 2, memberId: 1, amount: 50, date: '2024-04-01', status: 'Paid' },
    { id: 3, memberId: 2, amount: 75, date: '2024-05-10', status: 'Pending' },
    { id: 4, memberId: 3, amount: 60, date: '2024-03-15', status: 'Overdue' },
    { id: 5, memberId: 4, amount: 80, date: '2024-05-20', status: 'Paid' },
  ],
}));

export default usePaymentStore;
