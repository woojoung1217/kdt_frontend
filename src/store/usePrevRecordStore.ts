import { create } from 'zustand';

export interface IPrevRecord {
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
}

interface IState {
  record: IPrevRecord;
}

export const initialState: IState = {
  record: {
    total: 0,
    social: 0,
    sexual: 0,
    relational: 0,
    refusing: 0,
    essential: 0,
  },
};

interface IAction {
  updateRecord: (data: IPrevRecord) => void;
  reset: () => void;
}

const usePrevRecordStore = create<IState & IAction>()((set) => ({
  ...initialState,
  updateRecord: (data) => set(() => ({ record: data })),
  reset: () => {
    set(initialState);
  },
}));

export default usePrevRecordStore;
