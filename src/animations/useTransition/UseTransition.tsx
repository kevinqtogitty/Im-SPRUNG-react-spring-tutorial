import React, { useState } from 'react';
import { config, TransitionFn, useTransition } from '@react-spring/web';
import {
  AnimatedBox,
  AnimationContainter,
  BoxContainer,
  HookExplanation,
  ToggleButton
} from '../../styles/styles';

interface ExampleProps {
  transition: TransitionFn<
    boolean,
    {
      opacity: number;
      transform: string;
      backgroundColor: string;
      color: string;
    }
  >;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

//----------------------------------------------Single element mounting and unmounting----------------------------------------------\\
const Example1: React.FC<ExampleProps> = ({ transition, setIsActive }) => {
  return (
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
  );
};

//----------------------------------------------Multiple elements mounting and unmounting----------------------------------------------\\
const Example2: React.FC<ExampleProps> = ({ transition, setIsActive }) => {
  /*
    We will use the same configuration, except this time we want to mount and unmount several elements
    In out transition callback function we just have to map over each item, return an animated element with the spring applied
  */
  const elements = [
    { id: 1, message: 'Im' },
    { id: 2, message: 'Sprung' },
    { id: 3, message: 'By' },
    { id: 4, message: 'T-Pain' }
  ];
  return (
    <BoxContainer>
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
    </BoxContainer>
  );
};

const UseTransition = () => {
  const [isActive, setIsActive] = useState(false);

  /*
    The config object for useTransition is different than our useSpring.
    from: What is the starting state and position of our element? 
          - Starts invisible, comes in offscreen from the right and will rotate 360deg, bg starts out white, text starts out white

    enter: What is the mounted state and position of our element? 
          - Is fully visible, mounted in its designated position rotation will have finished, bg is orange, text remains white

    leave: What is the unmounting animation of our element? 
          - Turns invisble, goes offscreen to the left rotates -360deg, bg turns white, text stays white
  */
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
    config: config.molasses //React-Spring provides us some pre-defined mass/tension/friction configs for us in the config object
  });

  return (
    <>
      <HookExplanation>
        We the useTransition hook for mounting and unmounting an
        element/elements to the dom. As opposed to the useSpring where the
        elements are already on the dom tree and remain there after their spring
      </HookExplanation>

      <Example1 transition={transition} setIsActive={setIsActive} />
      {/* <Example2 transition={transition} setIsActive={setIsActive} /> */}
    </>
  );
};

export default UseTransition;
