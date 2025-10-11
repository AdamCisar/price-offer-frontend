import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Tooltip } from '@mui/material';

const PriceRefresher = ({ updatingItemPrices, updateItemPrices, itemIds }) => {
  return (
    <Tooltip title="Aktualizácia cien" placement="top">
      <span
        style={{ 
            display: 'flex', 
            alignItems: 'center',
        }}
        onClick={() => !updatingItemPrices && updateItemPrices(itemIds)}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{
            cursor: 'pointer',
            cursor: updatingItemPrices ? 'not-allowed' : 'pointer',
            padding: '6px 12px',
            borderRadius: '16px',
            backgroundColor: updatingItemPrices ? '#f0f0f0' : '#ffffff',
            transform: updatingItemPrices ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.05)',
            },
            border: '2px solid transparent',
          }}
        >
          <RefreshIcon
            sx={{
              color: updatingItemPrices ? '#115293' : '#1976d2',
              fontSize: 28,
              transition: 'color 0.3s ease',
              animation: updatingItemPrices
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

export default PriceRefresher;
