import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart'; // Example icon

interface StatPanelProps {
  title: string;
  placeholderText: string;
}

const StatPanel: React.FC<StatPanelProps> = ({ title, placeholderText }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: 200, sm: 250, md: 300 }, // Responsive height
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
      }}
    >
      <ShowChartIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {placeholderText}
      </Typography>
    </Paper>
  );
};

export default function Statistics() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const panels = [
    { title: 'Spend Over Time', placeholder: '[Chart for Spend Over Time will be displayed here]' },
    { title: 'Completion Progress', placeholder: '[Chart for Completion Progress will be displayed here]' },
    { title: 'Condition Distribution', placeholder: '[Chart for Condition Distribution will be displayed here]' },
    { title: 'Top Valued Copies', placeholder: '[List or chart for Top Valued Copies will be displayed here]' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" sx={{ fontWeight: 700 }}>
          Collection Statistics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Visual insights into your collection.
        </Typography>
      </Box>

      <Grid container spacing={isMobile ? 2 : 4}>
        {panels.map((panel, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}> {/* On md, take half width for 2x2 */}
            <StatPanel title={panel.title} placeholderText={panel.placeholder} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
