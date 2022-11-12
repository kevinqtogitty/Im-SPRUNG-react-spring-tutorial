import { styled } from '@stitches/react';
import { animated, CSS } from 'react-spring';

export const AnimatedBox = styled(animated.div, {
  position: 'relative',
  height: '7rem',
  width: '7rem',
  backgroundColor: 'rgb(255,255,255)',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '.7rem',
  padding: '.5rem',
  color: 'black',
  '&.clickable': {
    cursor: 'pointer'
  },
  '&.chain': {
    width: '10rem',
    textAlign: 'center'
  }
});

export const infoStyle: CSS.Properties = {
  color: 'white',
  fontSize: '1.2rem',
  width: '30rem',
  position: 'absolute',
  top: '2rem',
  left: 'calc(20vw - 12.5rem)'
};

export const BoxContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '2rem',
  alignItems: 'center',
  color: 'white'
});

export const AnimationContainter = styled('div', {
  display: 'flex',
  columnGap: '5rem'
});

export const ToggleButton = styled('button', {
  display: 'flex',
  width: '9rem',
  height: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.2rem .5rem',
  borderRadius: '3px',
  border: '.5px solid grey',
  color: 'white',
  backgroundColor: '#FF7518',
  cursor: 'pointer',
  left: 'calc(50vw - 4.5rem)'
});

export const AnimatedCircle = styled(animated.div, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50% 50%',
  width: '5rem',
  height: '5rem',
  position: 'absolute',
  alignSelf: 'center',
  border: '2px solid red',
  backgroundColor: '#FF7518',
  color: 'white'
});

export const Explanation = styled(animated.article, {
  padding: '1rem',
  maxWidth: '30rem'
});
