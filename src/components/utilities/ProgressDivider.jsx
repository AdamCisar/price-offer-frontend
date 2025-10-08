import { Divider, Box } from '@mui/material';

const ProgressDivider = ({ progress = 0, refreshing }) => {
  const safeProgress = Math.max(0, Math.min(progress, 100));

  if (!progress && !refreshing) {
    return (
        <Divider sx={{ margin: '20px 0' }} />
    );
  }

  return (
    <Box sx={{ width: '100%', margin: '20px 0', position: 'relative' }}>
      <Divider sx={{ bgcolor: '#e0e0e0', height: 4 }} />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 4,
          width: `${safeProgress}%`,
          bgcolor: '#1976d2',
          borderRadius: 2,
          transition: 'width 0.3s ease',
        }}
      />
    </Box>
  );
};

export default ProgressDivider;
