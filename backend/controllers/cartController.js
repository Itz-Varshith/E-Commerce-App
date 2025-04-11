import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    console.log("Inside the try block");
    const { userId, itemId, size } = req.body;
    console.log(userId);

    const userData = await userModel.findById(userId);
    let cartData = { ...userData.cartData }; // Clone cartData to avoid direct mutation

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } }); // ✅ Use $set

    console.log(cartData);
    res.json({ sucess: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = { ...userData.cartData };

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } }); // ✅ Use $set

    return res.json({ sucess: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    res.json({ sucess: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
