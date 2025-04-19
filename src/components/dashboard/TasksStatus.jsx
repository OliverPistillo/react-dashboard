// src/components/dashboard/TasksStatus.jsx
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { PieChart } from '@nivo/pie';

const TasksStatus = () => {
  const theme = useTheme();
  const { tasks } = useSelector((state) => state.tasks);
  
  // Calcola il conteggio dei task per stato
  const taskStatusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  
  // Prepara i dati per il grafico
  const chartData = [
    {
      id: 'Todo',
      label: 'Da fare',
      value: taskStatusCounts.todo || 0,
      color: '#e0e0e0'
    },
    {
      id: 'In Progress',
      label: 'In corso',
      value: taskStatusCounts.inProgress || 0,
      color: '#64b5f6'
    },
    {
      id: 'Review',
      label: 'In revisione',
      value: taskStatusCounts.review || 0,
      color: '#fff176'
    },
    {
      id: 'Complete',
      label: 'Completate',
      value: taskStatusCounts.complete || 0,
      color: '#81c784'
    }
  ];
  
  return (
    <Box height="240px">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Stato Task
      </Typography>
      
      <Box height="200px">
        <PieChart
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerRadius={0.6}
          padAngle={0.5}
          cornerRadius={4}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: 'circle'
            }
          ]}
          theme={{
            tooltip: {
              container: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: 12,
                borderRadius: 4,
                boxShadow: theme.shadows[3]
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default TasksStatus;