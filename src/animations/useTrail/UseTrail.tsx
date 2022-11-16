import React, { useState } from 'react';
import { config, useTrail, useTransition } from '@react-spring/web';
import {
  AnimatedBox,
  AnimationContainter,
  BoxContainer,
  HookExplanation,
  ToggleButton
} from '../../styles/styles';

//----------------------------------------------Staggered spring animations using useTrail----------------------------------------------\\
const Example1 = () => {
  const [isActive, setIsActive] = useState(false);

  //Our dataset
  const elements = [
    { id: 1, message: 'Im' },
    { id: 2, message: 'Sprung' },
    { id: 3, message: 'By' },
    { id: 4, message: 'T-Pain' }
  ];

  /*
    You'll notice this is identical to how we use useSprings.
    The only difference is that its automatically staggered for us

    1st argument is the number of items
    2nd second argument is your config object 
  */
  const trail1 = useTrail(elements.length, {
    opacity: isActive ? 1 : 0,
    transform: isActive
      ? 'translateX(0%) rotate(0deg)'
      : 'translateX(200%) rotate(360deg)',
    backgroundColor: isActive ? '#FF7518' : 'white',
    color: 'white',
    delay: 500 //We can also add a delay of 500ms
  });

  return (
    <BoxContainer>
      <h1>useTrail automatically staggers springs for us</h1>
      <AnimationContainter>
        {trail1.map((transition, i) => (
          <AnimatedBox style={transition}>
            <h1>{elements[i].message}</h1>
          </AnimatedBox>
        ))}
      </AnimationContainter>
      <ToggleButton onClick={() => setIsActive((state) => !state)}>
        Click to change state
      </ToggleButton>
    </BoxContainer>
  );
};

//----------------------------------------------Staggered spring animations using useTrail----------------------------------------------\\
const Example2 = () => {
  const [isActive, setIsActive] = useState(false);

  //Here is a second example to show how we can use the useTrail hook for slighty incorrect quotes by dead philosophers
  const message = [
    { id: 1, side1: 'On', side2: 'a' },
    { id: 2, side1: 'the', side2: 'man' },
    { id: 3, side1: 'highest', side2: 'sits' },
    { id: 4, side1: 'of', side2: 'on' },
    { id: 5, side1: 'thrones', side2: 'his' },
    { id: 6, side1: '...', side2: 'ass' }
  ];

  const trail2 = useTrail(message.length, {
    transformOrigin: 'center',
    transform: isActive ? 'rotateX(1080deg)' : 'rotateX(0deg)',
    config: config.molasses
  });

  return (
    <BoxContainer>
      <h1>useTrail automatically staggers animations for us</h1>
      <AnimationContainter>
        {trail2.map((transition, i) => (
          <AnimatedBox style={transition}>
            <h1>{!isActive ? message[i].side1 : message[i].side2}</h1>
          </AnimatedBox>
        ))}
      </AnimationContainter>
      <ToggleButton onClick={() => setIsActive((state) => !state)}>
        Click to fire
      </ToggleButton>
    </BoxContainer>
  );
};

const UseTrail = () => {
  return (
    <>
      <HookExplanation>
        As stated in the React-Spring documentation
        <br />
        <br />
        'useTrail has an identical API signature to useSprings the difference is
        the hook automatically orchestrates the springs to stagger one after the
        other.'
      </HookExplanation>

      <Example1 />
      {/* <Example2 /> */}
    </>
  );
};

export default UseTrail;
