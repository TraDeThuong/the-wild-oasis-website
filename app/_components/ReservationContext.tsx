"use client"

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// 1. Define the shape of your range state
type Range = {
  from: Date | undefined;
  to: Date | undefined;
};

// 2. Define the Context value type
interface ReservationContextType {
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
  resetRange: () => void;
}

const initialState: Range = { from: undefined, to: undefined };

// 3. Initialize context with an explicit type
// We can cast an empty object or use undefined, but providing a shape is safer for IDE autocomplete
const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

interface ReservationProviderProps {
  children: ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange = () => setRange (initialState)

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  
  // This guard handles the "undefined" initial state and provides type safety for consumers
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  
  return context;
}

export { ReservationProvider, useReservation };