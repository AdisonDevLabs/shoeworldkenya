-- ==========================================
-- 1. CATEGORIES SCHEMA & DATA
-- ==========================================
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    label TEXT,
    image TEXT NOT NULL, -- This will eventually store your Cloudflare R2 URL
    span TEXT
);

INSERT INTO categories (name, slug, label, image, span) VALUES
('Men''s Shoes', 'mens-shoes', 'Trending Now', '/Minimalist All-White Derbies.png', 'md:col-span-2'),
('Women''s Heels', 'womens-heels', 'Best Sellers', '/Pearl & Rhinestone Luxury Statement Heels.png', 'md:col-span-2'),
('SNEAKERS', 'sneakers', 'New Arrivals', '/Retro Low-Profile Trainers.png', 'md:col-span-2'),
('Men''s Clothing', 'mens-clothing', 'Everyday Comfort', '/FIFA World Cup 2026 Splash Graphic Tee.jpg', 'md:col-span-2');


-- ==========================================
-- 2. PRODUCTS SCHEMA & DATA
-- ==========================================
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    originalPrice INTEGER,
    image TEXT NOT NULL,         -- Cloudflare R2 URL
    images TEXT NOT NULL,        -- JSON Array of Cloudflare R2 URLs
    category TEXT NOT NULL,
    rating REAL DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    sizes TEXT NOT NULL,         -- JSON Array
    colors TEXT NOT NULL,        -- JSON Array
    isNewArrival INTEGER DEFAULT 0,
    isBestSeller INTEGER DEFAULT 0,
    isFlashDeal INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (id, name, price, originalPrice, image, images, category, rating, reviews, sizes, colors, isNewArrival, isBestSeller, isFlashDeal, description) VALUES
('p1', 'Minimalist All-White Derbies', 3200, 4500, '/Minimalist All-White Derbies.png', '["/Minimalist All-White Derbies.png"]', 'Men''s Shoes', 4.8, 24, '["40", "41", "42", "43", "44"]', '["White"]', 1, 0, 0, 'Clean, crisp, and effortless. These matte white lace-ups bring a sharp, contemporary edge to classic formal wear. Perfect for when you want to look polished without looking like you tried too hard.'),
('p2', 'Pearl & Rhinestone Luxury Statement Heels', 5500, 7500, '/Pearl & Rhinestone Luxury Statement Heels.png', '["/Pearl & Rhinestone Luxury Statement Heels.png", "/Pearl & Rhinestone Luxury Statement Heels1.png", "/Pearl & Rhinestone Luxury Statement Heels2.png"]', 'Women''s Heels', 5.0, 12, '["36", "37", "38", "39", "40"]', '["Cream/Silver"]', 1, 1, 0, 'Pure elegance for a special day. These stunning heels are heavily detailed with delicate pearls, tiny floral accents, and a show-stopping crystal peacock design along the side. Absolute head-turners for weddings or major events.'),
('p3', 'Rugged Terrain Adventure Sandals', 2400, 3500, '/Rugged Terrain Adventure Sandals.png', '["/Rugged Terrain Adventure Sandals.png"]', 'Unisex Sandals', 4.5, 42, '["38", "39", "40", "41", "42"]', '["Grey/Teal/Yellow"]', 0, 0, 1, 'Built for comfort on the move. These combine the breathability of a sandal with the tough, grippy sole of a sneaker. Featuring a bold teal-accented sole and adjustable straps, they''re ready for long walks or casual weekend hangs.'),
('p4', 'Retro Low-Profile Trainers', 2800, 4000, '/Retro Low-Profile Trainers.png', '["/Retro Low-Profile Trainers.png"]', 'Sneakers', 4.7, 88, '["39", "40", "41", "42", "43", "44"]', '["Black/Gum"]', 0, 1, 0, 'A timeless classic that goes with absolutely any outfit. They feature a sleek dark upper, a clean white midsole, and a grippy, serrated gum sole. Lightweight, comfortable, and perfect for daily wear.'),
('p5', 'Floral Embroidered Mesh Mules', 3000, 4200, '/Floral Embroidered Mesh Mules.png', '["/Floral Embroidered Mesh Mules.png"]', 'Women''s Heels', 4.6, 19, '["36", "37", "38", "39", "40"]', '["Beige/Orange"]', 1, 0, 0, 'Soft, feminine, and uniquely stylish. These pointed-toe mules pair delicate orange and white floral embroidery on a sheer mesh upper with a trendy clear strap for a secure fit. Perfect for brunch or outdoor afternoon events.'),
('p6', 'Mustard Yellow Knit Slip-Ons', 2500, 3800, '/Mustard Yellow Knit Slip-Ons.png', '["/Mustard Yellow Knit Slip-Ons.png"]', 'Sneakers', 4.9, 65, '["37", "38", "39", "40", "41", "42"]', '["Mustard Yellow"]', 0, 1, 0, 'Add a bold pop of color to your rotation. These ultra-lightweight, breathable knit sneakers hug your feet like a sock, while the chunky white cushioned sole keeps you comfortable from morning to night.'),
('p7', 'Metallic Cap-Toe White Oxfords', 3500, 5000, '/Metallic Cap-Toe White Oxfords.png', '["/Metallic Cap-Toe White Oxfords.png"]', 'Men''s Shoes', 4.4, 15, '["40", "41", "42", "43"]', '["White/Silver"]', 1, 0, 0, 'Classic tailoring meets a futuristic twist. These white smart shoes feature a brilliant metallic silver cap-toe with subtle brogue detailing along the seams. Ideal for anyone looking to stand out at a formal gathering.'),
('p8', 'Silver Mesh Casual Flats', 1800, 2500, '/Silver Mesh Casual Flats.png', '["/Silver Mesh Casual Flats.png", "/Silver Mesh Casual Flats1.png"]', 'Women''s Flats', 4.3, 31, '["36", "37", "38", "39", "40", "41"]', '["Grey/Silver"]', 0, 0, 1, 'Lightweight and flexible for busy days on your feet. These breathable mesh flats feature a secure top strap and a durable textured outsole, giving you a perfect blend of casual ease and reliable support.'),
('p9', 'Premium Black Leather Split-Toe Sandals', 4500, 6000, '/Premium Black Leather Split-Toe Sandals.png', '["/Premium Black Leather Split-Toe Sandals.png"]', 'Unisex Sandals', 4.8, 18, '["38", "39", "40", "41", "42", "43"]', '["Black"]', 1, 0, 0, 'Bold, high-fashion, and unmistakably unique. These premium black leather sandals feature a distinct split-toe design and thick cross-straps with a secure ankle buckle. Perfect if you like your style to stand out from the crowd.'),
('p10', 'FIFA World Cup 2026 Splash Graphic Tee', 1500, 2200, '/FIFA World Cup 2026 Splash Graphic Tee.jpg', '["/FIFA World Cup 2026 Splash Graphic Tee.jpg", "/FIFA World Cup 2026 Splash Graphic Tee1.jpg", ""]', 'Men''s Clothing', 4.7, 34, '["S", "M", "L", "XL", "XXL"]', '["White", "Black"]', 1, 1, 0, 'Celebrate the beautiful game with this tournament-ready graphic tee. Featuring a vibrant explosion of global flags and soccer elements around the official 2026 emblem, its soft cotton build keeps you cool from the stands to the streets.'),
('p11', 'FIFA World Cup 2026 Host Country Trio Tee', 1500, 2200, '/FIFA World Cup 2026 Host Country Trio Tee.jpg', '["/FIFA World Cup 2026 Host Country Trio Tee.jpg"]', 'Men''s Clothing', 4.6, 18, '["S", "M", "L", "XL"]', '["Black"]', 1, 0, 0, 'Rep the historic three-nation tournament with pride. This sleek black tee showcases brushed flag graphics of Mexico, the United States, and Canada underneath bold ''WORLD CUP 2026'' lettering. Perfect for dedicated football fans.'),
('p12', 'Slogan & Graphic Streetwear Tee Pack', 1200, 1800, '/Slogan & Graphic Streetwear Tee Pack.jpg', '["/Slogan & Graphic Streetwear Tee Pack.jpg"]', 'Men''s Clothing', 4.4, 56, '["M", "L", "XL", "XXL"]', '["Red", "White", "Black", "Yellow"]', 0, 1, 0, 'Make a bold statement with our collection of expressive graphic tees. From motivational self-growth quotes and faith-inspired prints to vintage Americana aesthetics, these crewnecks offer a comfortable fit with plenty of personality.'),
('p13', 'Nike Classic Core White T-Shirt', 2500, 3500, '/Nike Classic Core White T-Shirt.jpg', '["/Nike Classic Core White T-Shirt.jpg"]', 'Men''s Clothing', 4.9, 120, '["S", "M", "L", "XL", "XXL"]', '["White"]', 0, 1, 0, 'An absolute wardrobe essential. This premium Nike sportswear tee features a lightweight, breathable cotton blend decorated with the iconic embroidered Swoosh on the left chest. Built for effortless daily layering or gym sessions.');


-- ==========================================
-- 3. TESTIMONIALS & REVIEWS SCHEMA & DATA
-- ==========================================
DROP TABLE IF EXISTS testimonials;
CREATE TABLE testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    rating INTEGER NOT NULL DEFAULT 5,
    text TEXT NOT NULL,
    product TEXT,                -- Can link to product name or ID
    profile TEXT NOT NULL,       -- Cloudflare R2 URL for avatar
    date TEXT,                   -- E.g., '2 weeks ago'
    purchased INTEGER DEFAULT 0, -- Boolean: 1 if verified buyer
    is_global INTEGER DEFAULT 0  -- Boolean: 1 for homepage, 0 for specific products
);

INSERT INTO testimonials (name, location, rating, text, product, profile, date, purchased, is_global) VALUES
-- Global Testimonials (from testimonials array)
('Mary W. – Nairobi', 'Nairobi', 5, 'The shoes are exactly like the pictures. Very comfortable and delivery was fast.', 'Black Heels', 'https://picsum.photos/seed/mary/150/150', NULL, 0, 1),
('Grace M. – Mombasa', 'Mombasa', 5, 'I ordered via WhatsApp and received my pair the next day. Great service!', 'White Sneakers', 'https://picsum.photos/seed/grace/150/150', NULL, 0, 1),
('Faith K. – Kisumu', 'Kisumu', 5, 'Good quality and affordable. I will definitely order again. The sizing was perfect.', 'Office Loafers', 'https://picsum.photos/seed/faith/150/150', NULL, 0, 1),

-- Product Specific Reviews (from productReviews array)
('Mary W.', 'Nairobi', 5, 'The quality exceeded my expectations. So comfortable for office wear and they look exactly like the pictures.', NULL, 'https://picsum.photos/seed/mary/150/150', '2 weeks ago', 1, 0),
('Sarah J.', 'Mombasa', 4, 'Love the design and fast delivery. Fits perfectly.', NULL, 'https://picsum.photos/seed/sarah/150/150', '1 month ago', 1, 0);


-- ==========================================
-- 4. UTILITY TABLES (Size Guide & Color Map)
-- ==========================================
DROP TABLE IF EXISTS size_guide;
CREATE TABLE size_guide (
    eu INTEGER PRIMARY KEY,
    uk INTEGER NOT NULL,
    us INTEGER NOT NULL,
    cm REAL NOT NULL
);

INSERT INTO size_guide (eu, uk, us, cm) VALUES
(36, 3, 5, 22.5),
(37, 4, 6, 23.5),
(38, 5, 7, 24.0),
(39, 6, 8, 25.0),
(40, 7, 9, 25.5),
(41, 8, 10, 26.5),
(42, 9, 11, 27.0);

DROP TABLE IF EXISTS color_map;
CREATE TABLE color_map (
    color_name TEXT PRIMARY KEY,
    hex_code TEXT NOT NULL
);

INSERT INTO color_map (color_name, hex_code) VALUES
('Black', '#000000'), ('White', '#ffffff'), ('Red', '#ff0000'),
('Beige', '#f5f5dc'), ('Nude', '#e3bc9a'), ('Brown', '#8b4513'),
('Silver', '#c0c0c0'), ('Gold', '#ffd700'), ('Blue', '#0000ff'),
('Pink', '#ffc0cb');