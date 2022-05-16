import * as React from 'react';
import Layout from '@/com/Layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/com/ui/Link';
import ProTip from '@/com/ui/ProTip';

function Home() {
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
          Next.js + MUI v5 Dark Mode Theme + TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
      </Box>
    </Container>
  );
}

export default Home;

Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
