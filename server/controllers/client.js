import Product from "../models/Product.js";
import ProductStat from "../models/ProductStats.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          ProductId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
      );
      res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
