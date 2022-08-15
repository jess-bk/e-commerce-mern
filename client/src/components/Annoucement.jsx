import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: gray;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const Annoucement = () => {
  return (
    <Container>
      <>Super Deals On Lubricants And Filters 10% Discount</>
    </Container>
  );
};

export default Annoucement;
