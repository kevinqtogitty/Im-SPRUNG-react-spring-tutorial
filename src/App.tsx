import React from 'react';
import UseSpring from './animations/useSpring/UseSpring';
import UseSprings from './animations/useSprings/UseSprings';
import UseTransition from './animations/useTransition/UseTransition';
import UseTrail from './animations/useTrail/UseTrail';
import UseChain from './animations/useChain/UseChain';
import { MainContainer } from './styles/styles';

function App() {
  // Uncomment to see examples
  return (
    <MainContainer>
      <UseSpring />
      {/* <UseSprings /> */}
      {/* <UseTransition /> */}
      {/* <UseTrail /> */}
      {/* <UseChain /> */}
    </MainContainer>
  );
}

export default App;
