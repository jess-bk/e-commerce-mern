import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  background: linear-gradient(100deg, #f9f9f9 -5%, #dcdddf 22%, #f9f9f9 100%);
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} {...item} />
      ))}
    </Container>
  );
};

export default Categories;
