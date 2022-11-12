import React, { useState } from 'react';
import { config, useTransition } from '@react-spring/web';
import {
  AnimatedBox,
  AnimationContainter,
  BoxContainer,
  infoStyle,
  ToggleButton
} from '../../styles/styles';

const UseTransition = () => {
  const [isActive, setIsActive] = useState(false);

  //----------------------------------------------Single element mounting and unmounting----------------------------------------------\\
  //The config object for useTransition is different than our useSpring,
  //from: What is the starting state and position of our element? Invisible offscreen to the right
  //enter: What is the mounted state and position of our element? Visible mounted in its designated position
  //leave: What is the unmounted state and position of our element? Invisble offscreen to the left
  const transition = useTransition(isActive, {
    from: {
      opacity: 0,
      transform: 'translateX(200%) rotate(360deg)',
      backgroundColor: 'white',
      color: 'white'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%) rotate(0deg)',
      backgroundColor: '#FF7518',
      color: 'white'
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-200%) rotate(-360deg)',
      backgroundColor: 'white',
      color: 'white'
    },
    config: config.molasses //React-Spring provides us some pre-built mass/tension/friction configs for us in the config object
  });

  //----------------------------------------------Multiple elements mounting and unmounting----------------------------------------------\\
  //We will use the same configuration as above, except this time we want to mount and unmount several elements
  //In out transition callback function we just have to map over each item, return an animated element with the spring applied
  const elements = [
    { id: 1, message: 'Im' },
    { id: 2, message: 'Sprung' },
    { id: 3, message: 'By' },
    { id: 4, message: 'T-Pain' }
  ];

  return (
    <>
      <p style={infoStyle}>
        We the useTransition hook for mounting and unmounting an
        element/elements to the dom. As opposed to the useSpring where the
        elements are already on the dom tree and remain there after their spring
      </p>

      <BoxContainer>
        <h1>useTransition, mounting and unmounting a single element</h1>
        <AnimationContainter>
          {transition(
            (spring, item) =>
              item && (
                <AnimatedBox style={spring}>
                  <h1>Hey ho!</h1>
                </AnimatedBox>
              )
          )}
        </AnimationContainter>
        <ToggleButton onClick={() => setIsActive((state) => !state)}>
          Click to change state
        </ToggleButton>
      </BoxContainer>

      {/* <BoxContainer>
        <h1>useTransition, mounting and unmounting of multiple elements</h1>
        <AnimationContainter>
          {transition(
            (spring, item) =>
              item &&
              elements.map((element) => (
                <AnimatedBox style={spring}>
                  <h1>{element.message}</h1>
                </AnimatedBox>
              ))
          )}
        </AnimationContainter>
        <ToggleButton onClick={() => setIsActive((state) => !state)}>
          Click to fire
        </ToggleButton>
      </BoxContainer> */}
    </>
  );
};

export default UseTransition;
