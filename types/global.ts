
// ✅ Global types for reusability

export interface Member {
  id: number;
  name: string;
  avatar: string;
}

export interface Payment {
  id: number;
  memberId: number;
  amount: number;
  date: string;
  status: 'Paid' | 'Overdue' | 'Pending';
}
