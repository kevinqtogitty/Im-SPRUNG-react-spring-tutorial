import React, { useState } from 'react';
import { useSpring, useSprings } from '@react-spring/web';
import {
  AnimatedBox,
  AnimationContainter,
  BoxContainer,
  Explanation,
  infoStyle,
  ToggleButton
} from '../../styles/styles';

// interface SpringsProps {
//   count: number;
//   configurationFn: (springIndex: number) => {[key: string]: {}},
// }

const UseSprings = () => {
  const [isActive, setIsActive] = useState(false);

  //Our dataset
  const elements = [1, 2, 3, 4];

  //----------------------------------------------useSpring State animation----------------------------------------------\\
  //We'll map over our dataset and render 4 boxes with the springs config attached
  //Then we'll trigger the animation via a button to toggle the state
  const springs1 = useSpring({
    transform: isActive ? 'rotate(720deg)' : 'rotate(0deg)',
    borderRadius: isActive ? '50% 50%' : '0% 0%',
    backgroundColor: isActive ? '#FF7518' : 'rgb(255, 255, 255)',
    color: isActive ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
    transformOrigin: 'center'
  });

  //----------------------------------------------useSprings State animation----------------------------------------------\\
  //This method is a little tricky to get your head around. First we have to create a single spring config using useSpring.
  const configAnimation = useSpring({
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translateY(0%)' : 'translateY(100%)'
  });

  //The useSprings hook takes three arguments
  //The first argument is the length the dataset
  //The second argument is your dataset mapped with a callback function that returns the config
  //Third is an array of dependencies, we will omit this here
  const springs2 = useSprings(
    elements.length,
    elements.map(() => configAnimation)
  );

  //----------------------------------------------Event animation----------------------------------------------\\
  //Like before in the useSpring introduction we'll first start by array destructuring out our spring and the api object
  //The first argument in the useSpring hook is the number of times we want to render a particular element
  //The second argument is a callback function with the starting point of our spring config
  const [springs3, api] = useSprings(
    elements.length,
    () => ({
      from: { opacity: 0, transform: 'translateY(100%)' }
    }),
    []
  );

  //Declare your handler function for an event
  const fireAnimation = () => {
    api.start({
      from: { opacity: 0, transform: 'translateY(100%)' },
      to: { opacity: 1, transform: 'translateY(0%)' }
    });
  };

  return (
    <>
      <p style={infoStyle}>
        There are a few ways to animate multiple elements. We can use useSpring
        or use the dedicated useSprings hook
      </p>

      <BoxContainer>
        <h1>useSpring state method</h1>
        <Explanation>
          Given the dataset we'll map over each item, on each loop it will
          render an animated element with the animation attached to it. And we
          simply need to trigger the animation via a state variable
        </Explanation>
        <AnimationContainter>
          {elements.map((element) => (
            <AnimatedBox style={springs1}>
              <h1>item {element}</h1>
            </AnimatedBox>
          ))}
        </AnimationContainter>
        <ToggleButton onClick={() => setIsActive((state) => !state)}>
          Click to change state
        </ToggleButton>
      </BoxContainer>

      {/* <BoxContainer>
        <h1>useSprings state method</h1>
        <Explanation>
          We'll map and render animated boxes given the length of our dataset
          (the first argument of our useSprings hooks). Toggle the state to run
          the animation.
        </Explanation>
        <AnimationContainter>
          {springs2.map((spring, i) => (
            <AnimatedBox style={spring}>
              <h1>item {i}</h1>
            </AnimatedBox>
          ))}
        </AnimationContainter>
        <ToggleButton onClick={() => setIsActive((state) => !state)}>
          Click to change state
        </ToggleButton>
      </BoxContainer> */}

      {/* <BoxContainer>
        <h1>useSprings on event method</h1>
        <Explanation>
          We'll map and render animated boxes given the length of our dataset
          (the first argument of our useSprings hooks). Click to fire the
          handler fucntion. Notice everytime we click if after it will jump to
          the beginning of the animation and immediateley run
        </Explanation>
        <AnimationContainter>
          {springs3.map((spring, i) => (
            <AnimatedBox style={spring}>
              <h1>item {i}</h1>
            </AnimatedBox>
          ))}
        </AnimationContainter>
        <ToggleButton onClick={fireAnimation}>
          Click to fire animation
        </ToggleButton>
      </BoxContainer> */}
    </>
  );
};

export default UseSprings;
