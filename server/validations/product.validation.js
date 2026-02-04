import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" })
      .min(3, "Name must be at least 3 characters")
      .max(200, "Name is too long"),
      
    description: z.string().min(10, "Description should be more detailed"),
    
    price: z.preprocess((val) => Number(val), z.number().positive("Price must be positive")),
    
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID format"),
    
    brand: z.string().nonempty("Brand is required"),
    
    stock: z.number().int().nonnegative("Stock cannot be negative"),
    
    // Validate images array
    images: z.array(
      z.object({
        url: z.string().url("Invalid image URL"),
        public_id: z.string().nonempty("Cloudinary public_id is required")
      })
    ).min(1, "At least one image is required"),
    
    // Optional variants
    variants: z.array(
      z.object({
        size: z.string().optional(),
        color: z.string().optional(),
        sku: z.string().nonempty("SKU is required for variants")
      })
    ).optional()
  })
});
