import Product from "../models/productModel.js";


const fetchProducts = async (res, filter = {}, options = {}) => {
   try {
      const products = await Product.find(filter, null, options);
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json({ message: error.message || 'Error fetching products' })
   }

}


//get products /api/product

export const getAllProducts = async (req, res) => {

   const { category, inStock, minPrice, maxPrice } = req.query;

   const filter = {};

   if (category) {
      filter.category = category;
   }

   if (inStock) {
      filter.inStock = inStock === "true"
   }

   if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.currentPrice.$gte = Number(minPrice);
      if (maxPrice) filter.currentPrice.$lte = Number(maxPrice)
   }

   fetchProducts(res, filter)
}

//get features product /api/product/featured

export const getFeaturedProducts = async (req, res) => {
   fetchProducts(res, {}, { sort: { createAt: -1 }, limit: 10 })
}

//inStock product / api/product/inStock
export const getInStockProduct = async (req, res) => {
   fetchProducts(res, { inStock: true })
}

//get a single product /api/product/id

export const getSingleProduct = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return res.status(400).json({ message: 'Product not found!' });
      res.status(200).json(product)

   } catch (error) {
      res.status(500).json({ message: error.message })
   }
}




// create product /api/product

export const createProduct = async (req, res) => {
   try {
      const product = new Product(req.body);
      await product.save();
      res.status(200).json({ message: 'Product has been added successful' }, product)
   } catch (error) {
      res.status(400).json({ message: error.message || 'Error to crate a product.' })
   }
}


//delete product /api/product/:id


export const deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;
      const deleteProduct = await Product.findByIdAndDelete(id);

      if (!deleteProduct) {
         return res.status(400).json({ message: 'Product not found!' })
      }

      res.status(200).json({ message: 'Product has been deleted successfully!' })
   } catch (error) {
      res.status(500).json({ message: error.message || 'Error deleting the product.' })
   }
}



