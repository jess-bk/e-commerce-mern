import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    background-color: lightgray;
  }
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
  width: 80%;
  margin: auto;
  padding: 50px;
  opacity: 90%;
  margin: 50px 50px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        <Slide bg="d3d3d3">
          <ImageContainer>
            <Image src="https://atozautoparts.net/userfiles-azab/images/banners/Autoparts.jpg" />
          </ImageContainer>
          <InfoContainer>
            <Title>Auto Parts Halifax</Title>
            <Description>trade parts at low cost prices</Description>
            <Button>Buy Now</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="e0e0e0">
          <ImageContainer>
            <Image src="https://atozautoparts.net/userfiles-azab/images/banners/Autoparts.jpg" />
          </ImageContainer>
          <InfoContainer>
            <Title>Auto Parts Halifax</Title>
            <Description>trade parts at low cost prices</Description>
            <Button>Buy Now</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="ececec">
          <ImageContainer>
            <Image src="https://atozautoparts.net/userfiles-azab/images/banners/Autoparts.jpg" />
          </ImageContainer>
          <InfoContainer>
            <Title>Auto Parts Halifax</Title>
            <Description>trade parts at low cost prices</Description>
            <Button>Buy Now</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
