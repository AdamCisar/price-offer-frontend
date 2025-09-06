import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CardSkeleton = (props) => {
    return (
        <div className='card' style={{ position: 'relative' }}>
            <BounceCard
                onClick={props.cardCallback} 
                isEditing={props.isEditing}
                sx={{ maxHeight: 320, minHeight: 320, maxWidth: 200, minWidth: 200, padding: 0 }}
            >
                {props.innerContent}
                
                <CardActionArea 
                    onClick={props.textCallback}
                    sx={{ textAlign: 'center', padding: 0 }}>
                    <CardContent sx={{ padding: 0 }}>
                    <Typography gutterBottom variant="h6" component="div" style={{ fontSize: 16, padding: 0 }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: 12, padding: 0 }}>
                        {props.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </BounceCard>
        </div>
    )
}

const BounceCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isEditing',
      })(({ theme, isEditing }) => ({
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        position: 'relative',
        ...(isEditing ? {} : {
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        }),
  }));

export default CardSkeleton