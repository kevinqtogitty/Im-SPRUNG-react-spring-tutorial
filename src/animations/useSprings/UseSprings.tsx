import React, { useState } from 'react';
import { useSpring, useSprings } from '@react-spring/web';
import {
  AnimatedBox,
  AnimationContainter,
  BoxContainer,
  Explanation,
  HookExplanation,
  ToggleButton
} from '../../styles/styles';

const UseSprings = () => {
  const [isActive, setIsActive] = useState(false);

  //Our dataset
  const elements = [1, 2, 3, 4];

  //----------------------------------------------useSpring State animation----------------------------------------------\\
  /*
    We'll map over our dataset and render 4 boxes with the springs config attached
    Then we'll trigger the animation via a button to toggle the state 
  */
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

  /*
    The useSprings hook takes three arguments:
    1. The length of the dataset
    2. The dataset mapped with a callback function that returns the config
    3. An array of dependencies, we will omit this here 
  */
  const springs2 = useSprings(
    elements.length,
    elements.map(() => configAnimation)
  );

  //----------------------------------------------Event animation----------------------------------------------\\
  /*
    Like before in the useSpring introduction we'll first start by array destructuring out our spring and the api object.
    Our arguments for this method:
    1. The length of the dataset
    2. Anonymous function with our starting point
  */
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
      <HookExplanation>
        There are a few ways to animate multiple elements. We can use useSpring
        or use the dedicated useSprings hook
      </HookExplanation>
      {/*--------------------------------------------------------------------EXAMPLE 1--------------------------------------------------------------------*/}
      <BoxContainer>
        <h1>useSpring state method</h1>
        <Explanation>
          Given the data set we'll map and render out boxs with our spring
          attached. Trigger the spring when the state changes
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

      {/*--------------------------------------------------------------------EXAMPLE 2--------------------------------------------------------------------*/}
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

      {/*--------------------------------------------------------------------EXAMPLE 3--------------------------------------------------------------------*/}
      {/* <BoxContainer>
        <h1>useSprings on event method</h1>
        <Explanation>
          We'll map and render animated boxes given the length of our dataset
          (the first argument of our useSprings hooks). Click to fire the
          handler function. Notice everytime we click if after it will jump to
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
