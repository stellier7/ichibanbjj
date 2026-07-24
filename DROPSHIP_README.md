# Dropshipping Feature - Ichiban Store

## Overview

This feature adds full drop shipping support to the Ichiban e-commerce platform. Drop shipping products are manufactured on-demand by international suppliers (primarily from China) and shipped directly to customers.

## What's Included

### 4 Drop Shipping Products

1. **Rashguard Ichiban** - Logo Premium
   - Price: 1,200 HNL (~$48 USD)
   - Sizes: S, M, L, XL, XXL
   - Delivery: 15-25 days

2. **Shorts Ichiban** - Fight Shorts
   - Price: 950 HNL (~$38 USD)
   - Sizes: S, M, L, XL, XXL
   - Delivery: 15-25 days

3. **Combo Ichiban** - Rashguard + Shorts
   - Price: 1,850 HNL (~$75 USD) - Save 300 Lempiras!
   - Includes: Rashguard, Shorts, Free carrying bag
   - Sizes: S, M, L, XL, XXL
   - Delivery: 15-25 days

4. **Gi Ichiban** - Complete BJJ Kimono
   - Price: 2,800 HNL (~$113 USD)
   - Sizes: A0, A1, A2, A3, A4, A5
   - Includes: Jacket, Pants, White belt, Carrying bag
   - Colors available: White, Black, Blue
   - Delivery: 18-28 days

## Technical Implementation

### Database Schema Changes

Added the following fields to the `Product` model:

```prisma
isDropship            Boolean  @default(false)
supplierName          String?
supplierProductId     String?
fulfillmentNotes      String?  @db.Text
estimatedShippingDays Int?
```

### UI Enhancements

1. **Product Cards** - Display "Dropship" badge with truck icon
2. **Product Detail Page** - Show prominent dropship information banner
3. **Stock Display** - Show "Available by order" instead of stock count
4. **Shipping Estimates** - Display estimated delivery time
5. **Category Filter** - Added "Dropship" category option

### API Updates

- `POST /api/products` - Accepts drop ship fields
- `PUT /api/products/[id]` - Updates drop ship fields
- `GET /api/products` - Returns all product fields including drop ship data

## Setup Instructions

### 1. Run Database Migration

```bash
npx prisma migrate dev --name add_dropship_fields
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Seed Drop Shipping Products

```bash
npx tsx prisma/seed-dropship.ts
```

Or add to package.json:

```json
{
  "scripts": {
    "seed:dropship": "tsx prisma/seed-dropship.ts"
  }
}
```

Then run:

```bash
npm run seed:dropship
```

## Supplier Information

**Current Supplier**: China Sports Apparel Co.

### Product Specifications

- **Material Quality**: Premium athletic fabric
- **Customization**: Sublimated/embroidered Ichiban logo
- **Production Time**: 7-14 days
- **Shipping Time**: 8-14 days (international)
- **Total Time**: 15-28 days

### Order Fulfillment Process

1. Customer places order on Ichiban website
2. Payment processed through BAC Credomatic
3. Order details sent to supplier with Ichiban logo specifications
4. Supplier manufactures product with custom branding
5. Supplier ships directly to customer
6. Tracking number provided to customer
7. Customer receives product

## Managing Drop Ship Orders

### Admin Workflow

1. **Order Notification** - Receive order via email/admin dashboard
2. **Forward to Supplier** - Send order details to supplier portal/email
3. **Confirm Production** - Supplier confirms order and timeline
4. **Track Shipment** - Monitor production and shipping status
5. **Update Customer** - Provide tracking information
6. **Handle Issues** - Manage returns, exchanges, quality issues

### Important Notes

- **Stock Management**: Drop ship products have `stock: 0` but are always "available"
- **No Inventory Risk**: Products manufactured only after order
- **Custom Branding**: Each item includes Ichiban logo
- **Quality Control**: First order should be a sample to verify quality
- **Customer Communication**: Set clear expectations about delivery time

## Pricing Strategy

### Cost Breakdown (Estimated)

| Product | Supplier Cost | Shipping | Total Cost | Sell Price | Profit |
|---------|--------------|----------|------------|------------|---------|
| Rashguard | $20 | $8 | $28 | $48 | $20 (71%) |
| Shorts | $15 | $8 | $23 | $38 | $15 (65%) |
| Combo | $35 | $12 | $47 | $75 | $28 (60%) |
| Gi | $45 | $15 | $60 | $113 | $53 (88%) |

*Note: These are estimates. Actual supplier costs may vary.*

## Supplier Integration

### Recommended Platforms

1. **Alibaba** - Large suppliers, MOQ requirements
2. **AliExpress** - Smaller orders, easier dropship
3. **DHGate** - Good for sports apparel
4. **Direct Manufacturer** - Best pricing, requires relationship

### Setting Up Supplier

1. Find supplier on platform (search "BJJ rashguard custom logo")
2. Request samples with Ichiban logo
3. Negotiate pricing for orders
4. Set up payment terms (PayPal, Alipay, bank transfer)
5. Establish communication channel (WhatsApp, WeChat, Email)
6. Create order process/template
7. Test with 1-2 orders before promoting

## Marketing Recommendations

### Promote Drop Ship Products

1. **Clear Communication**
   - Show delivery estimates prominently
   - Explain custom production process
   - Highlight premium quality

2. **Visual Content**
   - Use mockups with Ichiban logo
   - Show size charts
   - Display different angles

3. **Pre-Orders**
   - Consider pre-order campaigns
   - Offer early-bird discounts
   - Build excitement before launch

4. **Social Proof**
   - Share customer photos
   - Post unboxing videos
   - Display reviews

## Customer Support

### Common Questions

**Q: Why does delivery take 15-25 days?**
A: These products are custom-made with the Ichiban logo just for you! They're manufactured on-demand and shipped internationally.

**Q: Can I customize the color/design?**
A: Currently we offer standard designs. Contact us for bulk custom orders.

**Q: What if it doesn't fit?**
A: Check our size chart carefully. We offer exchanges (customer pays return shipping).

**Q: Is the logo high quality?**
A: Yes! Logos are sublimated/embroidered professionally, not printed.

## Next Steps

1. ✅ Database schema updated
2. ✅ UI components created
3. ✅ Seed data ready
4. ⏳ Run migration and seed
5. ⏳ Find and vet supplier
6. ⏳ Order samples
7. ⏳ Add real product photos
8. ⏳ Set up supplier integration
9. ⏳ Test full order flow
10. ⏳ Launch to customers!

## Files Modified

- `prisma/schema.prisma` - Added drop ship fields
- `types/index.ts` - Updated Product type
- `app/(main)/store/page.tsx` - Added Dropship category
- `components/store/ProductCard.tsx` - Added dropship badge
- `app/(main)/store/[id]/page.tsx` - Added dropship info banner
- `app/api/products/route.ts` - Support dropship fields
- `app/api/products/[id]/route.ts` - Support dropship fields
- `prisma/seed-dropship.ts` - Seed script for products

## Support

For questions about the drop shipping implementation, contact your development team or refer to the Ichiban project documentation.

---

**Status**: Ready for testing
**Version**: 1.0
**Last Updated**: 2026-07-24
