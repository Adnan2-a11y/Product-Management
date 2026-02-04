import Product from "../models/Product.js";

/**
 * Service to handle product creation logic
 */

export const createProductServices = async (productData, userId) => {
    //1.  Logic: Link the product to the user who created it
    const product = new Product({
        ...productData,
        createdBy: userId
    });

    //2. Save the product to the database
    await product.save();
    return product;
};

export const getProductByIdServices = async (filter, options) =>  {
    const { page =1, limit = 10, sort = '-createdAt' } = options;
    const skip = (page -1) * limit;

    const products = await Product.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('category','name slug');
    
    const total = await Product.countDocuments(filters);

    return {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    };

};