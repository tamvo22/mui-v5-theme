import * as React from 'react';
import Layout from '@/com/Layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/com/ui/Link';
import ProTip from '@/com/ui/ProTip';

function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Page
        </Typography>
        <Link href="/" color="secondary">
          Go to the home page
        </Link>
        <ProTip />
      </Box>
    </Container>
  );
}

export default About;

About.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
