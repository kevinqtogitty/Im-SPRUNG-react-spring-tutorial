import React, { useState } from 'react';
import {
  useTrail,
  useTransition,
  useSpring,
  useSpringRef,
  useChain
} from '@react-spring/web';
import {
  AnimatedBox,
  AnimatedCircle,
  AnimationContainter,
  BoxContainer,
  Explanation,
  HookExplanation,
  ToggleButton
} from '../../styles/styles';

const UseChain = () => {
  //----------------------------------------------Chaining animations based on state----------------------------------------------\\
  //First we need to declare a trigger for each animation
  const [firstAnimationTriggered, setFirstAnimationTriggered] = useState(false);
  const [secondAnimationTriggered, setSecondAnimationTriggered] =
    useState(false);

  /*
    Our second animation will be a useTrail to animate 4 circles
    These circles are positioned absolute, so they are stacked on top of each other
    We need to offset each of them, so we'll declare some offset values for them to interpolate later
  */
  const elements = [
    { id: 1, message: '🐷', offset: '-50%' },
    { id: 2, message: '🐶', offset: '-175%' },
    { id: 3, message: '🐸', offset: '-300%' },
    { id: 4, message: '🐮', offset: '-425%' }
  ];

  /*
    We need to make some references for our useChain hook
    Our first animation will animate based on the firstAnimationTriggered variable
  */
  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    opacity: firstAnimationTriggered ? 1 : 0
  });

  const transitionRef = useSpringRef();
  const transition = useTransition(firstAnimationTriggered, {
    from: { opacity: 0, y: '100%' },
    enter: { opacity: 1, y: '0%' },
    leave: { opacity: 0, y: '-100%' }
  });

  //Our second animation will animate based on the secondAnimationTriggered variable
  const trailRef = useSpringRef();
  const trail = useTrail(elements.length, {
    ref: trailRef,
    opacity: secondAnimationTriggered ? 1 : 0,
    transform: secondAnimationTriggered
      ? 'translateX(-150%)'
      : 'translateX(150%)'
  });

  //Our useChain hook takes an array of references of our defined animations
  useChain([springRef, trailRef]); //For our first example

  /*
    If we want a spring or trail to follow a transition, without a trigger, we can re-write our
    our trail and spring config with 'to' and 'from'. Then we can supply our useChain a secound argument
    with a timestamp/delay for each spring as an array.

    EX: useChain([transitionRef, trailRef], [0, 1]) 
        - Where the transition will immediately run when triggered, and the trail will run after a delay of 1 second
  */
  useChain([transitionRef, trailRef]); //For our second example

  return (
    <>
      <HookExplanation>
        To use useChain we just need to configure 2 spring animations and attach
        a ref to each, and pass those refs to useChain in an array
      </HookExplanation>

      {/*--------------------------------------------------------------------EXAMPLE 1--------------------------------------------------------------------*/}
      <BoxContainer>
        <h1>Example 1: useChain (useSpring followed by useTrail)</h1>
        <Explanation>
          The first animation in our useChain hook is a useSpring to fade in our
          box. That box will be able to trigger our second animation. Notice how
          we can still trigger the second animation while our useSpring has not
          fired yet, remember useSpring does not unmount our element from the
          dom it is always there
        </Explanation>
        <AnimationContainter>
          <AnimatedBox
            className="clickable chain"
            style={spring}
            onClick={() => setSecondAnimationTriggered((state) => !state)}
          >
            {/* -- DO NOT UNCOMMENT --

                Now that our first animation is complete lets trigger our circles.
                We've declared that our trail will map 4 circles (the length of our dataset).
                Each time it will render an animated circle, but we want them to be spread evenly,
                so we'll add a second transformation to shift each circle by the defined offset value we 
                gave it above along with the base transition. 

                -- DO NOT UNCOMMENT -- */}

            <h2>Trigger 2nd animation</h2>
            {trail.map((animation, i) => (
              <AnimatedCircle
                style={{
                  x: `${elements[i].offset}`,
                  ...animation
                }}
              >
                <span style={{ fontSize: '3rem' }}>{elements[i].message}</span>
              </AnimatedCircle>
            ))}
          </AnimatedBox>
        </AnimationContainter>
        <ToggleButton
          onClick={() => setFirstAnimationTriggered((state) => !state)}
        >
          Trigger 1st animation
        </ToggleButton>
      </BoxContainer>

      {/*--------------------------------------------------------------------EXAMPLE 2--------------------------------------------------------------------*/}
      {/* <BoxContainer>
        <h1>Example 2: useChain (useTransition followed by useTrail)</h1>
        <Explanation>
          The first animation in our useChain hook is a useTrail to mount our
          box. That box will be able to trigger our second animation which is
          the same useTrail as in example 1.
        </Explanation>
        <AnimationContainter>
          {transition(
            (spring, item) =>
              item && (
                <AnimatedBox
                  className="clickable chain"
                  style={spring}
                  onClick={() => setSecondAnimationTriggered((state) => !state)}
                >
                  <h2>Trigger 2nd animation</h2>
                  {trail.map((animation, i) => (
                    <AnimatedCircle
                      style={{
                        x: `${elements[i].offset}`,
                        ...animation
                      }}
                    >
                      <h2>{elements[i].message}</h2>
                    </AnimatedCircle>
                  ))}
                </AnimatedBox>
              )
          )}
        </AnimationContainter>
        <ToggleButton
          onClick={() => setFirstAnimationTriggered((state) => !state)}
        >
          Trigger 1st animation
        </ToggleButton>
      </BoxContainer> */}
    </>
  );
};

export default UseChain;
