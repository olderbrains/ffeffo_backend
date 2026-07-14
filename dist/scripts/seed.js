"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const database_1 = require("../config/database");
const user_model_1 = require("../models/user.model");
const category_model_1 = require("../models/category.model");
const brand_model_1 = require("../models/brand.model");
const product_model_1 = require("../models/product.model");
const product_variant_model_1 = require("../models/product-variant.model");
const inventory_model_1 = require("../models/inventory.model");
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order-item.model");
const payment_model_1 = require("../models/payment.model");
const address_model_1 = require("../models/address.model");
const coupon_model_1 = require("../models/coupon.model");
const logger_1 = require("../shared/utils/logger");
/** Stable Unsplash apparel/lifestyle photos (verified 200). */
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PHOTOS = [
    '1521572163474-6864f9cf17ab',
    '1576566588028-4147f3842f27',
    '1620012253295-c15cc3e65df4',
    '1434389677669-e08b4cac3105',
    '1556905055-8f358a7a47b2',
    '1485462537746-965f33f7f6a7',
    '1551488831-00ddcb6c6bd3',
    '1542272604-787c3835535d',
    '1583743814966-8936f5b7be1a',
    '1596755094514-f87e34085b2c',
    '1490481651871-ab68de25d43d',
    '1487222477894-8943e31ef7b2',
    '1503341504253-dff4815485f1',
    '1441984904996-e0b6ba687e04',
    '1523381210434-271e8be1f52b',
    '1495121605193-b116b5b9c5fe',
    '1539533018447-63fcce2678e3',
    '1622445275576-721325763afe',
    '1620799140408-edc6dcb6d633',
    '1485231183945-fffde7cc051e',
];
/** Build a 3-image set for a product, cycling through the photo pool. */
function imagesFor(start, name) {
    return [0, 1, 2].map((k) => {
        const id = PHOTOS[(start + k) % PHOTOS.length];
        return { url: img(id), alt: `${name} — view ${k + 1}`, sortOrder: k, isDefault: k === 0 };
    });
}
const CATALOG = [
    { name: 'Re-Form Organic Cotton Tee', slug: 're-form-organic-cotton-tee', description: 'A wardrobe staple cut from soft, breathable organic cotton with a relaxed, lived-in feel. Pre-shrunk and built to hold its shape wash after wash.', shortDescription: 'Organic cotton | Relaxed fit | Everyday staple', sub: 0, brand: 0, basePrice: 2200, salePrice: 1760, featured: true, tags: ['tee', 'organic', 'womens', 'bestseller'], colors: ['Sage', 'Oatmeal', 'Black', 'Clay'], sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: { average: 4.6, count: 318 } },
    { name: 'Earthworks Wide Leg Crop Pant', slug: 'earthworks-wide-leg-crop-pant', description: 'A breezy wide-leg crop in lightweight hemp-cotton twill. Sits high on the waist with a flattering, fluid drape — equal parts comfort and ease.', shortDescription: 'Hemp-cotton twill | High rise | Wide leg', sub: 1, brand: 1, basePrice: 6900, featured: true, tags: ['pants', 'hemp', 'womens', 'crop'], colors: ['Charcoal', 'Olive', 'Sand'], sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: { average: 4.4, count: 142 } },
    { name: 'Marley Everyday Tee', slug: 'marley-everyday-tee', description: 'The tee you reach for on repeat. Featherweight TENCEL Lyocell blend with a soft hand and a clean, slightly fitted silhouette.', shortDescription: 'TENCEL Lyocell | Soft hand | Slim fit', sub: 0, brand: 2, basePrice: 2600, featured: true, tags: ['tee', 'tencel', 'womens'], colors: ['Dusty Rose', 'Ecru', 'Navy'], sizes: ['XS', 'S', 'M', 'L'], rating: { average: 4.5, count: 207 } },
    { name: 'Chaka Wide Leg Crop Pant', slug: 'chaka-wide-leg-crop-pant', description: 'Our beloved wide-leg crop in an airy printed weave. Elastic-back waistband for all-day comfort with a polished, put-together look.', shortDescription: 'Printed weave | Elastic-back waist | Wide leg', sub: 1, brand: 0, basePrice: 7400, salePrice: 5180, featured: true, tags: ['pants', 'womens', 'print', 'crop'], colors: ['Stone', 'Forest'], sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: { average: 4.3, count: 96 } },
    { name: 'Sunkissed Linen Midi Dress', slug: 'sunkissed-linen-midi-dress', description: 'Made for warm days — a UPF-rated, water-friendly linen-blend midi that packs small and wears beautifully from beach to bistro.', shortDescription: 'Linen blend | UPF 30 | Packable', sub: 2, brand: 3, basePrice: 8900, featured: true, tags: ['dress', 'linen', 'womens', 'summer'], colors: ['Mustard', 'Sky', 'Cream'], sizes: ['XS', 'S', 'M', 'L'], rating: { average: 4.7, count: 251 } },
    { name: 'Meadow Tiered Maxi Dress', slug: 'meadow-tiered-maxi-dress', description: 'An effortless tiered maxi in a fluid sustainable viscose. Easy to throw on, hard to take off — with deep side pockets you will love.', shortDescription: 'Sustainable viscose | Tiered | Side pockets', sub: 2, brand: 4, basePrice: 9800, featured: true, tags: ['dress', 'maxi', 'womens'], colors: ['Slate', 'Rust'], sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: { average: 4.5, count: 134 } },
    { name: 'Trailhead Hemp Pocket Tee', slug: 'trailhead-hemp-pocket-tee', description: 'A rugged everyday tee in durable hemp-organic cotton. Naturally odor-resistant and built to soften with every wear.', shortDescription: 'Hemp-organic cotton | Chest pocket | Durable', sub: 3, brand: 2, basePrice: 2800, featured: true, tags: ['tee', 'hemp', 'mens', 'bestseller'], colors: ['Olive', 'Charcoal', 'Sand', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.6, count: 412 } },
    { name: 'Riverbed Henley', slug: 'riverbed-henley', description: 'A weekend-ready henley in a waffle-knit organic cotton. Three-button placket and a trim-but-comfortable fit.', shortDescription: 'Waffle knit | Organic cotton | Trim fit', sub: 3, brand: 5, basePrice: 3900, salePrice: 2730, featured: true, tags: ['henley', 'mens', 'knit'], colors: ['Stone', 'Forest', 'Black'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.4, count: 168 } },
    { name: 'Mission Ridge Chino', slug: 'mission-ridge-chino', description: 'A do-everything chino in stretch organic cotton twill. Clean lines, comfortable give, and a versatile straight leg.', shortDescription: 'Stretch twill | Straight leg | Versatile', sub: 4, brand: 1, basePrice: 6500, featured: true, tags: ['chino', 'mens', 'pants'], colors: ['Khaki', 'Navy', 'Charcoal'], sizes: ['30', '32', '34', '36'], rating: { average: 4.5, count: 223 } },
    { name: 'Drifter 5-Pocket Pant', slug: 'drifter-5-pocket-pant', description: 'Denim-inspired comfort with a sustainable edge. Hardwearing hemp-cotton with the classic five-pocket layout you reach for daily.', shortDescription: 'Hemp-cotton | 5-pocket | Hardwearing', sub: 4, brand: 5, basePrice: 7200, tags: ['pants', 'mens', 'denim'], colors: ['Indigo', 'Black', 'Slate'], sizes: ['30', '32', '34', '36'], rating: { average: 4.3, count: 119 } },
    { name: 'Northbound Quilted Jacket', slug: 'northbound-quilted-jacket', description: 'A lightly insulated quilted jacket with recycled fill. Wind-resistant shell, snap front, and a packable build for shoulder-season layering.', shortDescription: 'Recycled fill | Wind-resistant | Packable', sub: 5, brand: 4, basePrice: 14900, salePrice: 11920, featured: true, tags: ['jacket', 'outerwear', 'quilted'], colors: ['Forest', 'Black', 'Clay'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.7, count: 89 } },
    { name: 'Cedar Field Overshirt', slug: 'cedar-field-overshirt', description: 'The shacket that does it all — heavyweight organic cotton with a brushed interior. Wear it open as a layer or buttoned as a light jacket.', shortDescription: 'Brushed organic cotton | Shacket | Layerable', sub: 5, brand: 0, basePrice: 9900, featured: true, tags: ['overshirt', 'outerwear', 'shacket'], colors: ['Olive', 'Rust', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.5, count: 76 } },
    { name: 'Wanderer Knit Beanie', slug: 'wanderer-knit-beanie', description: 'A cozy ribbed beanie in recycled wool blend. Warm, soft, and just slouchy enough.', shortDescription: 'Recycled wool blend | Ribbed | One size', sub: 6, brand: 6, basePrice: 1900, tags: ['beanie', 'accessories', 'knit'], colors: ['Oatmeal', 'Forest', 'Rust', 'Charcoal'], sizes: [], rating: { average: 4.4, count: 203 } },
    { name: 'Backcountry Canvas Tote', slug: 'backcountry-canvas-tote', description: 'A roomy everyday tote in heavyweight recycled canvas. Reinforced straps and an interior pocket for the essentials.', shortDescription: 'Recycled canvas | Reinforced straps | Roomy', sub: 6, brand: 6, basePrice: 3400, salePrice: 2380, featured: true, tags: ['tote', 'accessories', 'bag'], colors: ['Sand', 'Olive', 'Black'], sizes: [], rating: { average: 4.6, count: 158 } },
    { name: 'Summit Wool Scarf', slug: 'summit-wool-scarf', description: 'A generously sized scarf woven from soft responsible wool. The finishing layer for cooler days.', shortDescription: 'Responsible wool | Oversized | Soft weave', sub: 6, brand: 4, basePrice: 2900, tags: ['scarf', 'accessories', 'wool'], colors: ['Clay', 'Slate', 'Cream'], sizes: [], rating: { average: 4.5, count: 64 } },
    { name: 'Rover Trail Sneaker', slug: 'rover-trail-sneaker', description: 'A low-profile everyday sneaker with a recycled knit upper and a cushioned, grippy outsole. Goes the distance, looks good doing it.', shortDescription: 'Recycled knit | Cushioned | Grippy outsole', sub: 7, brand: 7, basePrice: 8400, featured: true, tags: ['sneaker', 'footwear', 'shoes'], colors: ['Stone', 'Black', 'Sage'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'], rating: { average: 4.4, count: 271 } },
    { name: 'Basecamp Slip-On', slug: 'basecamp-slip-on', description: 'An easy canvas slip-on with a natural rubber sole. Throw them on for the market, the boardwalk, or the backyard.', shortDescription: 'Organic canvas | Natural rubber sole | Easy on', sub: 7, brand: 7, basePrice: 5600, salePrice: 3920, tags: ['slip-on', 'footwear', 'shoes'], colors: ['Ecru', 'Navy', 'Olive'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'], rating: { average: 4.2, count: 98 } },
    { name: 'Willow Ribbed Tank', slug: 'willow-ribbed-tank', description: 'A fitted ribbed tank in stretchy organic cotton. The perfect layering piece, on its own or under everything.', shortDescription: 'Ribbed organic cotton | Fitted | Layerable', sub: 0, brand: 3, basePrice: 1800, tags: ['tank', 'womens', 'layer'], colors: ['White', 'Black', 'Sage', 'Clay'], sizes: ['XS', 'S', 'M', 'L'], rating: { average: 4.3, count: 145 } },
    { name: 'Juniper Linen Shirt', slug: 'juniper-linen-shirt', description: 'A breezy button-up in pure washed linen. Relaxed through the body with a soft collar — your warm-weather workhorse.', shortDescription: 'Washed linen | Relaxed | Button-up', sub: 3, brand: 1, basePrice: 5400, featured: true, tags: ['shirt', 'linen', 'mens'], colors: ['Sky', 'Sand', 'Cream'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.6, count: 187 } },
    { name: 'Aspen Fleece Pullover', slug: 'aspen-fleece-pullover', description: 'A midweight recycled-fleece pullover with a cozy stand collar and a half-zip. The campfire companion you will live in.', shortDescription: 'Recycled fleece | Half-zip | Midweight', sub: 5, brand: 5, basePrice: 8800, tags: ['fleece', 'outerwear', 'pullover'], colors: ['Oatmeal', 'Forest', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.5, count: 112 } },
    { name: 'Poppy Wrap Dress', slug: 'poppy-wrap-dress', description: 'A flattering true-wrap dress in fluid sustainable viscose. Adjustable tie, breezy three-quarter sleeves, and pockets — naturally.', shortDescription: 'Sustainable viscose | True wrap | Pockets', sub: 2, brand: 0, basePrice: 8600, salePrice: 6020, featured: true, tags: ['dress', 'wrap', 'womens'], colors: ['Rust', 'Navy', 'Olive'], sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: { average: 4.6, count: 176 } },
    { name: 'Granite Jogger', slug: 'granite-jogger', description: 'A refined jogger in brushed organic cotton with a tapered leg and zip pockets. Lounge-ready, street-approved.', shortDescription: 'Brushed organic cotton | Tapered | Zip pockets', sub: 4, brand: 2, basePrice: 5900, tags: ['jogger', 'mens', 'pants'], colors: ['Charcoal', 'Olive', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], rating: { average: 4.4, count: 134 } },
];
const COLOR_PRICE_BUMP = {}; // colors priced flat
async function seed() {
    (0, config_1.loadConfig)();
    await (0, database_1.connectDatabase)();
    logger_1.logger.info('Dropping existing collections...');
    const collections = await mongoose_1.default.connection.db.listCollections().toArray();
    for (const col of collections) {
        await mongoose_1.default.connection.db.dropCollection(col.name);
    }
    // --- Users ---
    logger_1.logger.info('Seeding users...');
    const users = await user_model_1.User.insertMany([
        { firebaseUid: 'firebase_super_admin_001', email: 'superadmin@speffo.com', firstName: 'Arjun', lastName: 'Mehta', role: 'super_admin', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919876543210', tokenVersion: 0, lastLoginAt: new Date('2026-06-20T10:00:00Z'), metadata: { loginCount: 245, totalOrders: 0, totalSpent: 0 } },
        { firebaseUid: 'firebase_admin_001', email: 'admin@speffo.com', firstName: 'Priya', lastName: 'Sharma', role: 'admin', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919876543211', tokenVersion: 0, lastLoginAt: new Date('2026-06-20T14:30:00Z'), metadata: { loginCount: 189, totalOrders: 0, totalSpent: 0 } },
        { firebaseUid: 'firebase_manager_001', email: 'manager@speffo.com', firstName: 'Rahul', lastName: 'Gupta', role: 'manager', status: 'active', emailVerified: true, phoneVerified: false, phone: '+919876543212', tokenVersion: 0, lastLoginAt: new Date('2026-06-19T09:00:00Z'), metadata: { loginCount: 97, totalOrders: 0, totalSpent: 0 } },
        { firebaseUid: 'firebase_support_001', email: 'support@speffo.com', firstName: 'Ananya', lastName: 'Patel', role: 'support_agent', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919876543213', tokenVersion: 0, lastLoginAt: new Date('2026-06-21T08:00:00Z'), metadata: { loginCount: 312, totalOrders: 0, totalSpent: 0 } },
        { firebaseUid: 'firebase_customer_001', email: 'vikas.kumar@gmail.com', firstName: 'Vikas', lastName: 'Kumar', role: 'customer', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919812345001', tokenVersion: 0, lastLoginAt: new Date('2026-06-21T07:30:00Z'), metadata: { loginCount: 34, lastOrderAt: new Date('2026-06-18T12:00:00Z'), totalOrders: 8, totalSpent: 47650 } },
        { firebaseUid: 'firebase_customer_002', email: 'sneha.reddy@gmail.com', firstName: 'Sneha', lastName: 'Reddy', role: 'customer', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919812345002', tokenVersion: 0, lastLoginAt: new Date('2026-06-20T19:45:00Z'), metadata: { loginCount: 21, lastOrderAt: new Date('2026-06-15T08:00:00Z'), totalOrders: 5, totalSpent: 32400 } },
        { firebaseUid: 'firebase_customer_003', email: 'aditya.joshi@outlook.com', firstName: 'Aditya', lastName: 'Joshi', role: 'customer', status: 'active', emailVerified: true, phoneVerified: false, phone: '+919812345003', tokenVersion: 0, lastLoginAt: new Date('2026-06-19T22:10:00Z'), metadata: { loginCount: 12, lastOrderAt: new Date('2026-06-10T14:00:00Z'), totalOrders: 3, totalSpent: 18900 } },
        { firebaseUid: 'firebase_customer_004', email: 'meera.nair@yahoo.com', firstName: 'Meera', lastName: 'Nair', role: 'customer', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919812345004', tokenVersion: 0, lastLoginAt: new Date('2026-06-21T06:00:00Z'), metadata: { loginCount: 56, lastOrderAt: new Date('2026-06-20T16:00:00Z'), totalOrders: 14, totalSpent: 89200 } },
        { firebaseUid: 'firebase_customer_005', email: 'rohan.singh@gmail.com', firstName: 'Rohan', lastName: 'Singh', role: 'customer', status: 'blocked', emailVerified: true, phoneVerified: true, phone: '+919812345005', tokenVersion: 1, lastLoginAt: new Date('2026-05-28T11:00:00Z'), metadata: { loginCount: 8, lastOrderAt: new Date('2026-05-20T10:00:00Z'), totalOrders: 2, totalSpent: 5400 } },
        { firebaseUid: 'firebase_customer_006', email: 'kavitha.raman@gmail.com', firstName: 'Kavitha', lastName: 'Raman', role: 'customer', status: 'active', emailVerified: true, phoneVerified: true, phone: '+919812345006', tokenVersion: 0, lastLoginAt: new Date('2026-06-21T09:15:00Z'), metadata: { loginCount: 42, lastOrderAt: new Date('2026-06-19T13:00:00Z'), totalOrders: 11, totalSpent: 67800 } },
    ]);
    const superAdmin = users[0];
    const admin = users[1];
    const customers = users.slice(4);
    // --- Addresses ---
    logger_1.logger.info('Seeding addresses...');
    await address_model_1.Address.insertMany([
        { userId: customers[0]._id, fullName: 'Vikas Kumar', phone: '+919812345001', addressLine1: '42 MG Road, Sector 15', city: 'Gurugram', state: 'Haryana', postalCode: '122001', country: 'IN', type: 'home', isDefault: true },
        { userId: customers[0]._id, fullName: 'Vikas Kumar', phone: '+919812345001', addressLine1: 'Tower B, DLF Cyber City', addressLine2: 'Floor 8, Unit 802', city: 'Gurugram', state: 'Haryana', postalCode: '122002', country: 'IN', type: 'work', isDefault: false },
        { userId: customers[1]._id, fullName: 'Sneha Reddy', phone: '+919812345002', addressLine1: '156 Jubilee Hills', addressLine2: 'Road No. 10', city: 'Hyderabad', state: 'Telangana', postalCode: '500033', country: 'IN', type: 'home', isDefault: true },
        { userId: customers[2]._id, fullName: 'Aditya Joshi', phone: '+919812345003', addressLine1: '78 Koregaon Park', city: 'Pune', state: 'Maharashtra', postalCode: '411001', country: 'IN', type: 'home', isDefault: true },
        { userId: customers[3]._id, fullName: 'Meera Nair', phone: '+919812345004', addressLine1: '23 Indiranagar', addressLine2: '100 Feet Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560038', country: 'IN', type: 'home', isDefault: true },
        { userId: customers[5]._id, fullName: 'Kavitha Raman', phone: '+919812345006', addressLine1: '89 Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', postalCode: '600040', country: 'IN', type: 'home', isDefault: true },
    ]);
    // --- Categories ---
    logger_1.logger.info('Seeding categories...');
    const parentCategories = await category_model_1.Category.insertMany([
        { name: "Women's", slug: 'womens', description: 'Considered, durable womenswear for every kind of trip', level: 0, sortOrder: 1, isActive: true, productCount: 0, image: img('1490481651871-ab68de25d43d', 900), seo: { title: "Women's — Speffo", description: "Shop women's apparel", keywords: ['womens', 'apparel', 'sustainable'] } },
        { name: "Men's", slug: 'mens', description: 'Built-to-last menswear made responsibly', level: 0, sortOrder: 2, isActive: true, productCount: 0, image: img('1521572163474-6864f9cf17ab', 900), seo: { title: "Men's — Speffo", description: "Shop men's apparel", keywords: ['mens', 'apparel', 'sustainable'] } },
        { name: 'Accessories', slug: 'accessories-top', description: 'Finishing pieces — bags, hats, and more', level: 0, sortOrder: 3, isActive: true, productCount: 0, image: img('1523381210434-271e8be1f52b', 900), seo: { title: 'Accessories — Speffo', description: 'Shop accessories', keywords: ['accessories', 'bags', 'hats'] } },
        { name: 'Collections', slug: 'collections', description: 'Seasonal edits and curated capsules', level: 0, sortOrder: 4, isActive: true, productCount: 0, image: img('1441984904996-e0b6ba687e04', 900), seo: { title: 'Collections — Speffo', description: 'Shop our collections', keywords: ['collections', 'edits'] } },
    ]);
    const subCategories = await category_model_1.Category.insertMany([
        { name: 'Tops & Tees', slug: 'womens-tops', description: "Women's tops, tees and tanks", parentId: parentCategories[0]._id, ancestors: [parentCategories[0]._id], level: 1, sortOrder: 1, isActive: true, productCount: 3, image: img('1485462537746-965f33f7f6a7', 900), seo: { title: "Women's Tops — Speffo" } },
        { name: 'Pants & Bottoms', slug: 'womens-bottoms', description: "Women's pants, shorts and skirts", parentId: parentCategories[0]._id, ancestors: [parentCategories[0]._id], level: 1, sortOrder: 2, isActive: true, productCount: 2, image: img('1542272604-787c3835535d', 900), seo: { title: "Women's Bottoms — Speffo" } },
        { name: 'Dresses', slug: 'dresses', description: 'Dresses and jumpsuits', parentId: parentCategories[0]._id, ancestors: [parentCategories[0]._id], level: 1, sortOrder: 3, isActive: true, productCount: 3, image: img('1596755094514-f87e34085b2c', 900), seo: { title: 'Dresses — Speffo' } },
        { name: 'Tops & Shirts', slug: 'mens-tops', description: "Men's tees, henleys and shirts", parentId: parentCategories[1]._id, ancestors: [parentCategories[1]._id], level: 1, sortOrder: 1, isActive: true, productCount: 3, image: img('1576566588028-4147f3842f27', 900), seo: { title: "Men's Tops — Speffo" } },
        { name: 'Pants & Bottoms', slug: 'mens-bottoms', description: "Men's pants, chinos and joggers", parentId: parentCategories[1]._id, ancestors: [parentCategories[1]._id], level: 1, sortOrder: 2, isActive: true, productCount: 3, image: img('1551488831-00ddcb6c6bd3', 900), seo: { title: "Men's Bottoms — Speffo" } },
        { name: 'Outerwear', slug: 'outerwear', description: 'Jackets, shackets and fleece', parentId: parentCategories[1]._id, ancestors: [parentCategories[1]._id], level: 1, sortOrder: 3, isActive: true, productCount: 3, image: img('1434389677669-e08b4cac3105', 900), seo: { title: 'Outerwear — Speffo' } },
        { name: 'Accessories', slug: 'accessories', description: 'Bags, hats and scarves', parentId: parentCategories[2]._id, ancestors: [parentCategories[2]._id], level: 1, sortOrder: 1, isActive: true, productCount: 3, image: img('1523381210434-271e8be1f52b', 900), seo: { title: 'Accessories — Speffo' } },
        { name: 'Footwear', slug: 'footwear', description: 'Sneakers and slip-ons', parentId: parentCategories[2]._id, ancestors: [parentCategories[2]._id], level: 1, sortOrder: 2, isActive: true, productCount: 2, image: img('1539533018447-63fcce2678e3', 900), seo: { title: 'Footwear — Speffo' } },
    ]);
    // --- Brands ---
    logger_1.logger.info('Seeding brands...');
    const brands = await brand_model_1.Brand.insertMany([
        { name: 'Wildwood', slug: 'wildwood', description: 'Considered staples, made to last', logo: img('1441984904996-e0b6ba687e04', 200), website: 'https://example.com', isActive: true, sortOrder: 1, productCount: 0 },
        { name: 'Riverstone', slug: 'riverstone', description: 'Easy, durable everyday wear', logo: img('1503341504253-dff4815485f1', 200), website: 'https://example.com', isActive: true, sortOrder: 2, productCount: 0 },
        { name: 'Trailhead', slug: 'trailhead', description: 'Built for the long way round', logo: img('1521572163474-6864f9cf17ab', 200), website: 'https://example.com', isActive: true, sortOrder: 3, productCount: 0 },
        { name: 'Meadowlark', slug: 'meadowlark', description: 'Soft, sustainable, effortless', logo: img('1490481651871-ab68de25d43d', 200), website: 'https://example.com', isActive: true, sortOrder: 4, productCount: 0 },
        { name: 'Northbound', slug: 'northbound', description: 'Layers for shoulder season', logo: img('1434389677669-e08b4cac3105', 200), website: 'https://example.com', isActive: true, sortOrder: 5, productCount: 0 },
        { name: 'Driftwood', slug: 'driftwood', description: 'Weekend-ready essentials', logo: img('1556905055-8f358a7a47b2', 200), website: 'https://example.com', isActive: true, sortOrder: 6, productCount: 0 },
        { name: 'Sundara', slug: 'sundara', description: 'Accessories with intention', logo: img('1523381210434-271e8be1f52b', 200), website: 'https://example.com', isActive: true, sortOrder: 7, productCount: 0 },
        { name: 'Speffo Basics', slug: 'speffo-basics', description: 'Our house line of everyday goods', logo: img('1495121605193-b116b5b9c5fe', 200), website: 'https://example.com', isActive: true, sortOrder: 8, productCount: 0 },
    ]);
    // --- Products & Variants ---
    logger_1.logger.info('Seeding products and variants...');
    const createdProducts = [];
    const createdVariants = [];
    for (let p = 0; p < CATALOG.length; p++) {
        const item = CATALOG[p];
        const variantAttributes = item.sizes.length > 0 ? ['Color', 'Size'] : ['Color'];
        let totalStock = 0;
        const createdProduct = await product_model_1.Product.create({
            name: item.name,
            slug: item.slug,
            description: item.description,
            shortDescription: item.shortDescription,
            categoryId: subCategories[item.sub]._id,
            brandId: brands[item.brand]._id,
            images: imagesFor(p * 3, item.name),
            attributes: [
                { name: 'Material', value: 'Sustainable fibers' },
                { name: 'Care', value: 'Machine wash cold, line dry' },
                { name: 'Origin', value: 'Ethically made' },
            ],
            variantAttributes,
            tags: item.tags,
            status: 'active',
            basePrice: item.basePrice,
            ...(item.salePrice ? { salePrice: item.salePrice } : {}),
            hasVariants: true,
            totalStock: 0,
            seo: { title: `${item.name} — Speffo`, description: item.shortDescription, keywords: item.tags },
            ratings: item.rating,
            metadata: { views: 1000 + p * 137, purchases: 50 + p * 11, wishlistCount: 80 + p * 7 },
            isFeatured: Boolean(item.featured),
            publishedAt: new Date('2026-05-01T00:00:00Z'),
        });
        createdProducts.push(createdProduct);
        let sortOrder = 0;
        const sizeList = item.sizes.length > 0 ? item.sizes : ['One Size'];
        for (const color of item.colors) {
            for (const size of sizeList) {
                const stock = 12 + ((p + sortOrder) % 9) * 6;
                const reservedStock = sortOrder % 3;
                const colorCode = color.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
                const sizeCode = size.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase();
                const attributes = item.sizes.length > 0
                    ? [{ name: 'Color', value: color }, { name: 'Size', value: size }]
                    : [{ name: 'Color', value: color }];
                const price = item.basePrice + (COLOR_PRICE_BUMP[color] ?? 0);
                const createdVariant = await product_variant_model_1.ProductVariant.create({
                    productId: createdProduct._id,
                    sku: `${item.slug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${colorCode}-${sizeCode}-${sortOrder}`,
                    attributes,
                    price,
                    ...(item.salePrice ? { salePrice: item.salePrice } : {}),
                    costPrice: Math.round(price * 0.55),
                    stock,
                    reservedStock,
                    images: [],
                    isActive: true,
                    sortOrder,
                });
                createdVariants.push(createdVariant);
                totalStock += stock;
                await inventory_model_1.Inventory.create({
                    productId: createdProduct._id,
                    variantId: createdVariant._id,
                    sku: createdVariant.get('sku'),
                    stock,
                    reservedStock,
                    availableStock: stock - reservedStock,
                    lowStockThreshold: 10,
                    isLowStock: stock - reservedStock <= 10,
                    warehouse: 'WH-MUM-01',
                    logs: [{ type: 'restock', quantity: stock, previousStock: 0, newStock: stock, note: 'Initial stock', performedBy: admin._id, createdAt: new Date('2026-05-01T00:00:00Z') }],
                    version: 1,
                });
                sortOrder++;
            }
        }
        await product_model_1.Product.updateOne({ _id: createdProduct._id }, { totalStock });
    }
    // --- Coupons ---
    logger_1.logger.info('Seeding coupons...');
    await coupon_model_1.Coupon.insertMany([
        { code: 'WELCOME20', description: '20% off your first order', type: 'percentage', value: 20, minOrderAmount: 1999, maxDiscount: 3000, applicableTo: { type: 'all', ids: [] }, usageLimit: 10000, usagePerUser: 1, usedCount: 3456, validFrom: new Date('2026-01-01'), validUntil: new Date('2026-12-31'), status: 'active', createdBy: admin._id },
        { code: 'FLAT500', description: 'Flat ₹500 off on orders above ₹3000', type: 'fixed_amount', value: 500, minOrderAmount: 3000, applicableTo: { type: 'all', ids: [] }, usageLimit: 5000, usagePerUser: 3, usedCount: 1890, validFrom: new Date('2026-03-01'), validUntil: new Date('2026-09-30'), status: 'active', createdBy: admin._id },
        { code: 'SUMMER10', description: "10% off women's styles", type: 'percentage', value: 10, minOrderAmount: 2500, maxDiscount: 4000, applicableTo: { type: 'categories', ids: [parentCategories[0]._id] }, usageLimit: 2000, usagePerUser: 2, usedCount: 780, validFrom: new Date('2026-04-01'), validUntil: new Date('2026-08-31'), status: 'active', createdBy: superAdmin._id },
        { code: 'FREESHIP', description: 'Free shipping on all orders', type: 'free_shipping', value: 0, minOrderAmount: 1499, applicableTo: { type: 'all', ids: [] }, usageLimit: 20000, usagePerUser: 5, usedCount: 8920, validFrom: new Date('2026-01-01'), validUntil: new Date('2026-12-31'), status: 'active', createdBy: admin._id },
    ]);
    // --- Orders ---
    logger_1.logger.info('Seeding orders...');
    const orderConfigs = [
        { user: customers[0], status: 'delivered', createdAt: new Date('2026-06-10T09:30:00Z'), variantIdx: 0, qty: 1 },
        { user: customers[0], status: 'shipped', createdAt: new Date('2026-06-18T12:00:00Z'), variantIdx: 7, qty: 2 },
        { user: customers[1], status: 'delivered', createdAt: new Date('2026-06-08T14:20:00Z'), variantIdx: 14, qty: 1 },
        { user: customers[1], status: 'processing', createdAt: new Date('2026-06-15T08:00:00Z'), variantIdx: 22, qty: 1 },
        { user: customers[2], status: 'delivered', createdAt: new Date('2026-06-05T18:45:00Z'), variantIdx: 31, qty: 1 },
        { user: customers[2], status: 'cancelled', createdAt: new Date('2026-06-10T14:00:00Z'), variantIdx: 40, qty: 1 },
        { user: customers[3], status: 'delivered', createdAt: new Date('2026-06-12T10:15:00Z'), variantIdx: 18, qty: 2 },
        { user: customers[3], status: 'delivered', createdAt: new Date('2026-06-16T16:30:00Z'), variantIdx: 55, qty: 1 },
        { user: customers[3], status: 'confirmed', createdAt: new Date('2026-06-20T16:00:00Z'), variantIdx: 60, qty: 1 },
        { user: customers[5], status: 'delivered', createdAt: new Date('2026-06-14T11:00:00Z'), variantIdx: 48, qty: 1 },
        { user: customers[5], status: 'shipped', createdAt: new Date('2026-06-19T13:00:00Z'), variantIdx: 5, qty: 3 },
        { user: customers[0], status: 'pending', createdAt: new Date('2026-06-21T07:00:00Z'), variantIdx: 70, qty: 1 },
    ];
    for (let i = 0; i < orderConfigs.length; i++) {
        const cfg = orderConfigs[i];
        const safeIdx = cfg.variantIdx % createdVariants.length;
        const variant = createdVariants[safeIdx];
        const unitPrice = variant.price;
        const subtotal = unitPrice * cfg.qty;
        const tax = Math.round(subtotal * 0.18);
        const shippingCharge = subtotal >= 1499 ? 0 : 99;
        const total = subtotal + tax + shippingCharge;
        const orderItem = await order_item_model_1.OrderItem.create({
            orderId: new mongoose_1.default.Types.ObjectId(),
            productId: variant.productId,
            variantId: variant._id,
            productName: `Item ${safeIdx}`,
            variantName: variant.attributes.map((a) => a.value).join(' / '),
            sku: variant.sku,
            image: img(PHOTOS[safeIdx % PHOTOS.length], 400),
            quantity: cfg.qty,
            unitPrice,
            salePrice: unitPrice,
            discount: 0,
            total: unitPrice * cfg.qty,
            attributes: variant.attributes,
        });
        const timeline = [
            { status: 'pending', timestamp: cfg.createdAt, note: 'Order placed' },
        ];
        const statusFlow = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'delivered'];
        const targetIdx = cfg.status === 'cancelled' ? 1 : statusFlow.indexOf(cfg.status);
        for (let s = 1; s <= targetIdx; s++) {
            timeline.push({ status: statusFlow[s], timestamp: new Date(cfg.createdAt.getTime() + s * 86400000), note: `Order ${statusFlow[s]}`, updatedBy: admin._id });
        }
        if (cfg.status === 'cancelled') {
            timeline.push({ status: 'cancelled', timestamp: new Date(cfg.createdAt.getTime() + 2 * 86400000), note: 'Customer requested cancellation', updatedBy: cfg.user._id });
        }
        const payment = await payment_model_1.Payment.create({
            orderId: orderItem.orderId,
            userId: cfg.user._id,
            razorpayOrderId: `order_speffo_${cfg.createdAt.getTime()}_${i}`,
            razorpayPaymentId: cfg.status !== 'pending' ? `pay_speffo_${cfg.createdAt.getTime()}_${i}` : undefined,
            amount: total,
            currency: 'INR',
            status: cfg.status === 'pending' ? 'pending' : cfg.status === 'cancelled' ? 'refunded' : 'captured',
            method: 'upi',
            vpa: `${cfg.user.firstName.toLowerCase()}@upi`,
            refundedAmount: cfg.status === 'cancelled' ? total : 0,
            attempts: 1,
            verifiedAt: cfg.status !== 'pending' ? new Date(cfg.createdAt.getTime() + 60000) : undefined,
        });
        const orderNumber = `SPF202606${String(i + 1).padStart(5, '0')}`;
        const order = await order_model_1.Order.create({
            orderNumber,
            userId: cfg.user._id,
            items: [orderItem._id],
            shippingAddress: { fullName: `${cfg.user.firstName} ${cfg.user.lastName}`, phone: cfg.user.phone || '+919800000000', addressLine1: `${100 + i} Sample Street`, city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', country: 'IN' },
            billingAddress: { fullName: `${cfg.user.firstName} ${cfg.user.lastName}`, phone: cfg.user.phone || '+919800000000', addressLine1: `${100 + i} Sample Street`, city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', country: 'IN' },
            status: cfg.status,
            subtotal,
            shippingCharge,
            discount: 0,
            tax,
            total,
            couponCode: i === 0 ? 'WELCOME20' : undefined,
            couponDiscount: i === 0 ? Math.min(subtotal * 0.2, 3000) : 0,
            paymentId: payment._id,
            paymentMethod: 'upi',
            shippingMethod: 'standard',
            trackingNumber: cfg.status === 'shipped' || cfg.status === 'delivered' ? `TRACK${String(i + 1).padStart(8, '0')}` : undefined,
            deliveredAt: cfg.status === 'delivered' ? new Date(cfg.createdAt.getTime() + 5 * 86400000) : undefined,
            cancelledAt: cfg.status === 'cancelled' ? new Date(cfg.createdAt.getTime() + 2 * 86400000) : undefined,
            cancelReason: cfg.status === 'cancelled' ? 'Changed my mind' : undefined,
            timeline,
            metadata: { source: 'web' },
            createdAt: cfg.createdAt,
        });
        await order_item_model_1.OrderItem.updateOne({ _id: orderItem._id }, { orderId: order._id });
    }
    logger_1.logger.info('Seed completed successfully!');
    logger_1.logger.info(`  Users: ${users.length}`);
    logger_1.logger.info(`  Categories: ${parentCategories.length + subCategories.length}`);
    logger_1.logger.info(`  Brands: ${brands.length}`);
    logger_1.logger.info(`  Products: ${createdProducts.length}`);
    logger_1.logger.info(`  Variants: ${createdVariants.length}`);
    logger_1.logger.info(`  Orders: ${orderConfigs.length}`);
    logger_1.logger.info(`  Coupons: 4`);
    await (0, database_1.disconnectDatabase)();
    process.exit(0);
}
seed().catch((err) => {
    logger_1.logger.error({ err }, 'Seed failed');
    process.exit(1);
});
//# sourceMappingURL=seed.js.map