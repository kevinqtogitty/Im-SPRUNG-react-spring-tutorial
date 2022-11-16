import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import {
  HookExplanation,
  BoxContainer,
  AnimatedBox,
  ToggleButton,
  AnimationContainter,
  Explanation
} from '../../styles/styles';

//----------------------------------------------State-less and event-less animation----------------------------------------------\\
const Example1 = () => {
  /*
    Where are we starting from? Invisible, and off the screen 100% off the y axis i.e. from the bottom
    Where do we want to end up? Visible, and the position we have determined for our element in our css
  */
  const animation1 = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0%)' }
  });

  return (
    <AnimatedBox style={animation1}>
      <p>State-less & no event</p>
    </AnimatedBox>
  );
};

//----------------------------------------------Animation based on state----------------------------------------------\\
const Example2 = () => {
  //Here we are going to animate based on the current state of a variable
  const [isActive, setIsActive] = useState(false);

  /*
    We do not need to define a start and end point, simply use a ternary for each property
    If you want a property to remain unchanged based on state, then as you can see you can just leave it as a normal css property definition
  */
  const animation2 = useSpring({
    transform: isActive ? 'rotate(720deg)' : 'rotate(0deg)',
    borderRadius: isActive ? '50% 50%' : '0% 0%',
    transformOrigin: 'center'
  });

  return (
    <>
      <AnimatedBox
        style={animation2}
        onClick={() => setIsActive((state) => !state)}
      >
        {isActive ? 'Click Me!' : 'Square!'}
      </AnimatedBox>
    </>
  );
};

//----------------------------------------------Animation on an event without state----------------------------------------------\\
const Example3 = () => {
  /*
    To animate without state and on a click/mouseenter/keydown event we need to extract the api object and name our spring
    The api object has many methods on it but for now we will focus on the api.start method. 
  */

  //We must first define the starting point for the api object
  const [animation3, api] = useSpring(() => ({
    from: { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' }
  }));

  //Define like usual an event handler, and voila!
  const fireAnimation = () => {
    api.start({
      from: { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' },
      to: { backgroundColor: '#FF7518', color: 'rgb(255, 255, 255)' }
    });
  };

  return (
    <AnimatedBox
      style={animation3}
      onClick={fireAnimation}
      className="clickable"
    >
      <p>Onclick event</p>
    </AnimatedBox>
  );
};

const UseSpring: React.FC = () => {
  return (
    <>
      <HookExplanation>
        We use useSpring when we want to animate an element from state/position
        A to state/position B
      </HookExplanation>
      <BoxContainer>
        <h1>How we can trigger a useSpring animation</h1>
        <span>
          Animates on page load | Animates based on boolean value | Animates via
          an event
        </span>
        <AnimationContainter>
          <Example1 />
          <Example2 />
          <Example3 />
        </AnimationContainter>
      </BoxContainer>
    </>
  );
};

export default UseSpring;
