import React from 'react';
import { Box, Typography, Link as MuiLink, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const mockFooterLinks = [
  {"label": "All Copies", "linkTo": "/all-items"},
  {"label": "Browse All Releases", "linkTo": "/releases"}, 
  {"label": "Activity Feed", "linkTo": "/activity"}
];

const FooterLinks: React.FC = () => {
  return (
    <Box 
      component="footer" // Semantic HTML5 footer element
      sx={{ 
        py: { xs: 3, sm: 4 }, 
        px: 2,
        mt: 'auto', // Pushes footer to the bottom if main content is short (in a flex column layout)
        // backgroundColor: 'grey.200', // Optional: distinct background
        // borderTop: '1px solid', // Optional: top border
        // borderColor: 'divider', // Optional: use theme's divider color
      }}
    >
      <Divider sx={{ mb: 3 }} /> 
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ flexWrap: 'wrap' }} // Ensure links wrap on smaller screens
      >
        {mockFooterLinks.map((link, index) => (
          <MuiLink
            key={index}
            component={RouterLink}
            to={link.linkTo}
            variant="body2"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
              my: 0.5 // Add some vertical margin if they wrap
            }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Shelfify &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default FooterLinks;
