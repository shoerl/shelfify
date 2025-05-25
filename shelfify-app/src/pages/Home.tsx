import React from 'react';
import Hero from '../components/home/Hero';
import ShelvesPreview from '../components/home/ShelvesPreview';
import Metrics from '../components/home/Metrics';
import RecentlyAdded from '../components/home/RecentlyAdded';
import ExploreMore from '../components/home/ExploreMore';
import FooterLinks from '../components/home/FooterLinks'; // Added import
import { Divider } from '@mui/material'; 
// Box can be used for overall page structure if needed
// import { Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    // Example of using a Box to ensure footer is at the bottom if content is short
    // <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - YourAppBarHeight - YourAppFooterHeight)' }}> 
    //   <Box sx={{ flexGrow: 1 }}> {/* Main content takes available space */}
    <>
      <Hero />
      <Divider sx={{ my: 4 }} /> 
      <ShelvesPreview />
      <Divider sx={{ my: 4 }} /> 
      <Metrics />
      <Divider sx={{ my: 4 }} /> 
      <RecentlyAdded />
      <Divider sx={{ my: 4 }} /> 
      <ExploreMore />
      {/* FooterLinks includes its own top Divider, so no extra Divider here unless more space needed */}
      <FooterLinks /> 
    </>
    //   </Box>
    // </Box>
  );
};

export default Home;
