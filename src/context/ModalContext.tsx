import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalContextType {
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  const openModal = (content: React.ReactNode, title?: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        {modalTitle && (
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">{modalTitle}</Typography>
              <IconButton onClick={closeModal} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
        )}
        <DialogContent>
          {modalContent}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
