import styled from "styled-components";
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ height: "50px" })}
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: -20px;
  ${mobile({ marginRight: "0px" })};
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })};
`;

const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Title>Car Parts</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Parts
            </Option>
            <Option>Service Parts</Option>
            <Option>Engine Parts</Option>
            <Option>Suspension & Steering</Option>
            <Option>Transmission</Option>
            <Option>Lubricants & Fluids</Option>
            <Option>Batteries</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Service Parts
            </Option>
            <Option>Engine Oil</Option>
            <Option>Brake Discs</Option>
            <Option>Brake Pads</Option>
            <Option>Oil Filter</Option>
            <Option>Air Filters</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
