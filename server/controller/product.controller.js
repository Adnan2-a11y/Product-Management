import * as productService from '../services/product.services.js';

//CatchAsync wrapper to handle errors globally
const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};

export const createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProductService(req.body, req.user.id);

    res.status(201).json({
        status: 'success',
        data: { product }
    });
});

export const getAllProducts = catchAsync(async (req, res) => {
    // Professional Filtering logic
    const { page, limit, sort, ...filters } = req.query;
    
    // Convert string filters to MongoDB queries (e.g., price[gte]=100)
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const result = await productService.getProductsService(
        JSON.parse(filterString), 
        { page, limit, sort }
    );

    res.status(200).json({
        status: 'success',
        results: result.products.length,
        total: result.total,
        data: result.products
    });
});