// env.d.ts

// Tell TypeScript to merge this interface with the global one
declare global {
  interface CloudflareEnv {
    shoeworld_db: D1Database;
    PRODUCT_IMAGES: R2Bucket;
  }
}

export {};