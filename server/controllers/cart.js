const Cart = require("../models/Cart");

//CREATE CART
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({ message: "saved to cart successfully", savedCart });
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE CART
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE CART
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "cart deleted successfully", cart });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER CART
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({ message: "user cart retrieved", cart });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL CARTS
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
};
