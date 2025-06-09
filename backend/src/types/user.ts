
export interface UserDashboardView {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  totalInvested: number;
  totalEarnings: number;
  registeredAt: string;
  lastLogin?: string;
}
