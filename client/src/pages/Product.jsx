import { Add, AutorenewTwoTone, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { axiosPrivate } from "../Api/axios";
import { addProduct } from "../redux/cartRedux";
import useAuth from "../hooks/useAuth";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  ${mobile({
    fontSize: "30px",
    fontWeight: 200,
  })}
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 50px 0px;
  display: flex;
  justify-content: start;

  ${mobile({
    width: "100%",
    justifyContent: "space-between",
  })}
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  ${mobile({ width: "50%" })}
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  ${mobile({
    fontSize: "10px",
  })}
`;

const Button = styled.button`
  display: flex;
  margin-left: 50px;
  padding: 15px;
  border: 2px solid gray;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
  ${mobile({
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px",
  })}
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { auth } = useAuth();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosPrivate.get(`/api/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <FilterContainer>
            <Price>£ {product.price}</Price>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => handleQuantity("dec")}
                  style={{ cursor: "pointer" }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => handleQuantity("inc")}
                  style={{ cursor: "pointer" }}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </FilterContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};
export default Product;
