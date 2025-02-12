import React from 'react';
import { styled, keyframes } from '@mui/system';

const shimmerKeyframes = keyframes`
  from {
    background-position: -1000px 0;
  }
  to {
    background-position: 1000px 0;
  }
`;

const ShimmerContainer = styled('div')`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '15px'};
  background: linear-gradient(to right, #e6e6e6 5%, #cccccc 25%, #e6e6e6 35%);
  background-size: 1000px 100%;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  animation: ${shimmerKeyframes} 1.5s infinite linear;
`;

const ShimmerWrapper = styled('div')({
  padding: '10px 0',
  width: '100%',
  margin: '10px auto',
});

const Shimmer = ({ width, height, borderRadius }) => {
  return (
    <ShimmerContainer width={width} height={height} borderRadius={borderRadius} />
  );
};

const ShimmerGroup = ({ count = 1, width, height, borderRadius }) => {
  return (
    <ShimmerWrapper>
      {[...Array(count)].map((_, idx) => (
        <Shimmer
          key={idx}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      ))}
    </ShimmerWrapper>
  );
};

export default Shimmer;
