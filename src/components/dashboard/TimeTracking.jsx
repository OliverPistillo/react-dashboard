// src/components/dashboard/TimeTracking.jsx
import React from 'react';
import { Box, Typography, useTheme, MenuItem, Select, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import { subDays, format } from 'date-fns';
import { it } from 'date-fns/locale';

const TimeTracking = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = React.useState('week');
  
  // Genera dati fittizi per il tracciamento del tempo
  const generateTimeData = () => {
    const today = new Date();
    const data = [];
    
    const daysToGenerate = timeRange === 'week' ? 7 : 30;
    
    for (let i = daysToGenerate - 1; i >= 0; i--) {
      const date = subDays(today, i);
      data.push({
        x: format(date, 'dd/MM'),
        y: Math.floor(Math.random() * 5) + 4 // Ore tra 4 e 8
      });
    }
    
    return [
      {
        id: 'time-spent',
        data
      }
    ];
  };
  
  const timeData = generateTimeData();
  
  return (
    <Box height="240px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" fontWeight="bold">
          Tracciamento Tempo
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            variant="outlined"
            sx={{ height: 32 }}
          >
            <MenuItem value="week">Settimana</MenuItem>
            <MenuItem value="month">Mese</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Box height="200px">
        <ResponsiveLine
          data={timeData}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 10,
            stacked: false
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Giorno',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ore',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          colors={[theme.palette.primary.main]}
          lineWidth={3}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={false}
          enableArea={true}
          areaOpacity={0.1}
          useMesh={true}
          legends={[]}
          theme={{
            tooltip: {
              container: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: 12,
                borderRadius: 4,
                boxShadow: theme.shadows[3]
              }
            },
            grid: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1
              }
            },
            crosshair: {
              line: {
                stroke: theme.palette.text.secondary,
                strokeWidth: 1,
                strokeOpacity: 0.35
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default TimeTracking;