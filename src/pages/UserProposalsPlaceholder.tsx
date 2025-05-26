import React from 'react';
import { Typography, Container } from '@mui/material';

const UserProposalsPlaceholder: React.FC = () => (
  <Container sx={{ py: { xs: 2, md: 4 } }}>
    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
      Your Proposals
    </Typography>
    <Typography variant="body1" color="text.secondary">
      This page will display your submitted proposals and their statuses. (Placeholder)
    </Typography>
  </Container>
);

export default UserProposalsPlaceholder;
