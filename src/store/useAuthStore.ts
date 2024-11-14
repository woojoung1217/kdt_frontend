import { create } from 'zustand';

interface AuthState {
  authToken: string | null;
  userEmail: string | null;
  memberId: string | null;
  setAuthState: (token: string, email: string, memberId: string) => void;
  resetAuthState: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authToken: null,
  userEmail: null,
  memberId: null,
  setAuthState: (token, email, memberId) => set({ authToken: token, userEmail: email, memberId: memberId }),
  resetAuthState: () => set({ authToken: null, userEmail: null, memberId: null }),
}));

export default useAuthStore;
