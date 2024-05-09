'use client';
import * as React from 'react';
import { Grid, alpha } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import HomeIcon from '@mui/icons-material/Home';
import ChartComponent from './ChartComponent';
import TradingPairSelector from './TradingPairSelector';
import GranularitySelector from './GranularitySelector';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

export default function HistoryPage({ tradingPairs, handleOptionsChange, chartData, selectedPair, selectedDate}) {
  return (
    <Box
          id="history-page"
          sx={() => ({
            width: '100%',
            backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
            backgroundSize: '100% 60%',
            backgroundRepeat: 'no-repeat'
          })}
        >
          <CssBaseline/>
          <Link href="/">
            <Button startIcon={<HomeIcon/>} variant="contained" size="small" color="primary" style={{ position: 'absolute', top: 10, left: 10 }}>
              Home
            </Button>
          </Link>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 4 },
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
            Historical&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: 'primary.main',
              }}
            >
              Prices
            </Typography>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TradingPairSelector options={tradingPairs} pair={selectedPair} onChange={handleOptionsChange} />
            </Grid>
            <Grid item xs={3}>
              <GranularitySelector onChange={handleOptionsChange} />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DateTimePicker label='Start Date' value={dayjs(selectedDate)} onChange={(newDate) => handleOptionsChange(undefined, undefined, newDate.valueOf())} maxDateTime={dayjs()} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {chartData.length > 0 && <ChartComponent data={chartData} pair={selectedPair} />}
        </Stack>
      </Container>
      </Box>
  );
}

{/* <TextField
  id="outlined-basic"
  hiddenLabel
  size="small"
  variant="outlined"
  aria-label="Enter your email address"
  placeholder="Your email address"
  inputProps={{
    autoComplete: 'off',
    'aria-label': 'Enter your email address',
  }}
/> */}