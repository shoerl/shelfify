import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material';
import type { CollectionTypeProposal } from '../../types/collection';

interface ProposalReviewProps {
  proposal: CollectionTypeProposal;
  onApprove: (proposal: CollectionTypeProposal, notes: string) => void;
  onReject: (proposal: CollectionTypeProposal, notes: string) => void;
}

export function ProposalReview({ proposal, onApprove, onReject }: ProposalReviewProps) {
  const [reviewNotes, setReviewNotes] = useState('');
  const [isPublic, setIsPublic] = useState(proposal.metadata.isPublic);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Review Proposal: {proposal.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {proposal.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Fields
            </Typography>
            <Stack spacing={2}>
              {proposal.fieldDefs.map((field, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2">Name</Typography>
                        <Typography>{field.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2">Label</Typography>
                        <Typography>{field.label}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2">Type</Typography>
                        <Typography>{field.type}</Typography>
                      </Grid>
                      {field.options && (
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2">Options</Typography>
                          <Stack direction="row" spacing={1}>
                            {field.options.map((option, i) => (
                              <Chip key={i} label={option} size="small" />
                            ))}
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Examples
            </Typography>
            <Stack direction="row" spacing={1}>
              {proposal.metadata.examples.map((example, index) => (
                <Chip key={index} label={example} />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Rationale
            </Typography>
            <Typography variant="body1" paragraph>
              {proposal.metadata.rationale}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              }
              label="Make this collection type public"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Review Notes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add any notes about your decision..."
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => onApprove(proposal, reviewNotes)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onReject(proposal, reviewNotes)}
              >
                Reject
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
} 