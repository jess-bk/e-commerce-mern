import styled from "styled-components";
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({
    width: "0px 20px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: -20px;
  ${mobile({ marginRight: "0px", fontSize: "16px" })};
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })};
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="partsFilter" onChange={handleFilters}>
            <Option disabled defaultValue>
              Parts
            </Option>
            <Option>Service Parts</Option>
            <Option>Engine Parts</Option>
            <Option>Suspension & Steering</Option>
            <Option>Transmission</Option>
            <Option>Lubricants & Fluids</Option>
            <Option>Batteries</Option>
          </Select>
          <Select name="subPartsFilter" onChange={handleFilters}>
            <Option disabled defaultValue>
              Parts
            </Option>
            <Option>Engine Oil</Option>
            <Option>Brake Discs</Option>
            <Option>Brake Pads</Option>
            <Option>Oil Filter</Option>
            <Option>Air Filters</Option>
            <Option>Clutch</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
