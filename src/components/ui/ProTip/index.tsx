import * as React from 'react';
import Link from '@mui/material/Link';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Typography from '@mui/material/Typography';

export default function ProTip() {
  return (
    <Typography sx={{ mt: 6, mb: 3 }}>
      <HourglassBottomIcon />
      Pro tip: See more <Link href="https://mui.com/getting-started/templates/">templates</Link> on the MUI documentation.
    </Typography>
  );
}
