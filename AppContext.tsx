import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { appReducer, initialAppState, AppState } from "./appReducer";
import { AppAction } from "./actions";
import { seedProjects } from "./seedData";
import {
  ExpenseDraft,
  DocumentFile,
  ClientPayment,
  VendorPayment,
  Project,
} from "../types/models";

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    addProject: (project: Project) => void;
    addExpense: (draft: ExpenseDraft, document?: DocumentFile) => void;
    updateExpense: (expenseId: string, patch: Partial<ExpenseDraft>) => void;
    deleteExpense: (expenseId: string) => void;
    addClientPayment: (payment: ClientPayment) => void;
    addVendorPayment: (payment: VendorPayment) => void;
    addDocument: (doc: DocumentFile) => void;
    deleteDocument: (documentId: string) => void;
  };
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // One-time hydration. Swap for a real fetch to /api/projects.
  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: { projects: seedProjects } });
  }, []);

  const actions = useMemo(
    () => ({
      addProject: (project: Project) => dispatch({ type: "ADD_PROJECT", payload: project }),
      addExpense: (draft: ExpenseDraft, document?: DocumentFile) =>
        dispatch({ type: "ADD_EXPENSE", payload: { draft, document } }),
      updateExpense: (expenseId: string, patch: Partial<ExpenseDraft>) =>
        dispatch({ type: "UPDATE_EXPENSE", payload: { expenseId, patch } }),
      deleteExpense: (expenseId: string) =>
        dispatch({ type: "DELETE_EXPENSE", payload: { expenseId } }),
      addClientPayment: (payment: ClientPayment) =>
        dispatch({ type: "ADD_CLIENT_PAYMENT", payload: payment }),
      addVendorPayment: (payment: VendorPayment) =>
        dispatch({ type: "ADD_VENDOR_PAYMENT", payload: payment }),
      addDocument: (doc: DocumentFile) => dispatch({ type: "ADD_DOCUMENT", payload: doc }),
      deleteDocument: (documentId: string) =>
        dispatch({ type: "DELETE_DOCUMENT", payload: { documentId } }),
    }),
    []
  );

  const value = useMemo(() => ({ state, dispatch, actions }), [state, actions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
}
