import { create } from 'zustand';

interface AuthState {
  authToken: string | null;
  userEmail: string | null;
  memberId: string | null;
  userName: string | null;
  setAuthState: (token: string, email: string, memberId: string, userName: string) => void;
  resetAuthState: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authToken: null,
  userEmail: null,
  memberId: null,
  userName: null,
  setAuthState: (token, email, memberId, userName) =>
    set({ authToken: token, userEmail: email, memberId: memberId, userName: userName }),
  resetAuthState: () => set({ authToken: null, userEmail: null, memberId: null }),
}));

export default useAuthStore;
