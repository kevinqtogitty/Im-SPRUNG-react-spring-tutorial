import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import {
  infoStyle,
  BoxContainer,
  AnimatedBox,
  ToggleButton,
  AnimationContainter,
  Explanation
} from '../../styles/styles';

const UseSpring: React.FC = () => {
  //----------------------------------------------State-less and event-less animation----------------------------------------------\\

  //Where are we starting from? Invisible, and off the screen 100% off the y axis i.e. from the bottom
  //Where do we want to end up? Visible, and the position we have determined for our element in our css
  const animation1 = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0%)' }
  });

  //----------------------------------------------Animation based on state----------------------------------------------\\

  //Here we are going to animate based on the current state of a variable
  const [isActive, setIsActive] = useState(false);

  //We do not need to define a start and end point, simply use a ternary for each property
  //If you want a property to remain unchanged based on state, then as you can see you can just leave it as a normal css property definition
  const animation2 = useSpring({
    transform: isActive ? 'rotate(720deg)' : 'rotate(0deg)',
    borderRadius: isActive ? '50% 50%' : '0% 0%',
    transformOrigin: 'center'
  });

  //----------------------------------------------Animation on an event without state----------------------------------------------\\

  //To animate without state and on a click/mouseenter/keydown event we need to extract the api object and name our spring
  //The api object has many methods on it but for now we will focus on the api.start method.

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
    <>
      <p style={infoStyle}>
        We use useSpring when we want to animate an element from state/position
        A to state/position B
      </p>
      <BoxContainer>
        <h1>How we can trigger a useSpring animation</h1>
        <span>
          Animates on page load | Animates based on boolean value | Animates via
          an event
        </span>
        <AnimationContainter>
          {/*Because this animation is not tied to the state of a component it will only animate on pageload*/}
          <AnimatedBox style={animation1}>
            <p>State-less & no event</p>
          </AnimatedBox>
          {/*This box will only animated when the state has gone from false to true*/}
          <AnimatedBox style={animation2}>
            {isActive ? 'Circle!' : 'Square!'}
          </AnimatedBox>
          {/*This box will animated via an onlick event*/}
          <AnimatedBox
            style={animation3}
            onClick={fireAnimation}
            className="clickable"
          >
            <p>Onclick event</p>
          </AnimatedBox>
        </AnimationContainter>
        <ToggleButton onClick={() => setIsActive((state) => !state)}>
          Click to change state
        </ToggleButton>
      </BoxContainer>
    </>
  );
};

export default UseSpring;
