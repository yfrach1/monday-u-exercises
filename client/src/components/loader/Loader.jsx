import React from "react";
import styled from "styled-components";
import spinner from "../../assets/images/spinner 2.svg";
const AnimationContainer = styled.div`
  height: 100%;
  max-height: 100vh;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.background ? props.background : "rgba(0,0,0,0.35)"};
`;

const OpacityLoading = ({ background }) => {
  return (
    <AnimationContainer background={background}>
      <img src={spinner} width="350" alt="spinner" />
    </AnimationContainer>
  );
};

export default OpacityLoading;
