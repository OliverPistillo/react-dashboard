import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { setTaskModal } from '../../store/slices/uiSlice';

const TaskModal = () => {
  const dispatch = useDispatch();
  const { open, taskData } = useSelector((state) => state.ui.taskModal);

  const handleClose = () => {
    dispatch(setTaskModal({ open: false, taskData: null }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{taskData?.title || 'Dettagli Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>Descrizione:</strong> {taskData?.description || 'Nessuna descrizione'}
          </Typography>
          <Typography variant="body2">
            <strong>Stato:</strong> {taskData?.status || 'Non definito'}
          </Typography>
          <Typography variant="body2">
            <strong>Priorità:</strong> {taskData?.priority || 'Non assegnata'}
          </Typography>
          <Typography variant="body2">
            <strong>Assegnato a:</strong> {taskData?.assignee || 'Non assegnato'}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;