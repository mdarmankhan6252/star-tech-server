import Product from "../models/productModel.js";


//get products /api/product

export const getProducts = async (req, res) => {
   try {
      const products = await Product.find();
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json({ message: error.message || 'Error fetching products' })
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
      res.status(500).json({message: error.message || 'Error deleting the product.'})
   }
}



