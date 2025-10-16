import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Tooltip } from '@mui/material';

const RefreshButton = ({ refreshing, activatedButtonCallback, error }) => {
  return (
    <Tooltip title="Aktualizácia cien" placement="top">
      <span
        style={{ 
            display: 'flex', 
            alignItems: 'center',
        }}
        onClick={() => !refreshing && activatedButtonCallback()}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{
            cursor: 'pointer',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            padding: '6px 12px',
            borderRadius: '16px',
            backgroundColor: refreshing ? '#f0f0f0' : '#ffffff',
            transform: refreshing ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.05)',
            },
            border: '2px solid transparent',
            animation: error
              ? 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both'
              : 'none',
            '@keyframes shake': {
              '10%, 90%': { transform: 'translateX(-1px)' },
              '20%, 80%': { transform: 'translateX(2px)' },
              '30%, 50%, 70%': { transform: 'translateX(-4px)' },
              '40%, 60%': { transform: 'translateX(4px)' },
            },
          }}
        >
          <RefreshIcon
            sx={{
              color: refreshing ? '#115293' : '#1976d2',
              fontSize: 28,
              transition: 'color 0.3s ease',
              animation: refreshing
                ? 'spinEase 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
                : 'none',
              '@keyframes spinEase': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        </Box>
      </span>
    </Tooltip>
  );
};

export default RefreshButton;
