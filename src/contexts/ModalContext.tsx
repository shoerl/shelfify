import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  addCopyOpen: boolean;

  openAddCopyModal: (initialData?: any) => void; // initialData can be used later
  closeAddCopyModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [addCopyOpen, setAddCopyOpen] = useState(false);

  const [initialModalData, setInitialModalData] = useState<any>(null); // For future use

  const openAddCopyModal = (initialData?: any) => {
    setInitialModalData(initialData); // Store data if needed for pre-filling form
    setAddCopyOpen(true);
  };

  const closeAddCopyModal = () => {
    setAddCopyOpen(false);
    setInitialModalData(null); // Clear data on close
  };

  return (
    <ModalContext.Provider value={{ addCopyOpen, openAddCopyModal, closeAddCopyModal }}>
      {children}
      {/* Dialog will be rendered in AppShell using this context's state */}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
