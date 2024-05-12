'use client';
import * as React from 'react';
import { alpha } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Box
      id="landing-page"
      sx={() => ({
        width: '100%',
        backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
        backgroundSize: '100% 60%',
        backgroundRepeat: 'no-repeat'
      })}
    >
      <CssBaseline/>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Stock Price&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: 'primary.main',
              }}
            >
              Visualiser
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            A tool to display mock historical stock price data on a chart. Data is acquired via the Coinbase public sandbox API.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Link href="/history">
              <Button variant="contained" size="large" color="primary">
                Start now
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}