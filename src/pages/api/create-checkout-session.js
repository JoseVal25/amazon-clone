const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body
    // console.log(items)
    // console.log(email)
    const transformedItems = items.map(item => ({
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image]
            }
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {allowed_countries: ['US', 'CA', 'AR', 'MX']},
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 699, currency: 'usd'},
                    display_name: "Next Day Shipping",
                    delivery_estimate: {
                        minimum: {unit: 'business_day', value: 1},
                        maximum: {unit: 'business_day', value: 3},
                    },
                    type: 'fixed_amount',
                    fixed_amount: {amount: 0, currency: 'usd'},
                    display_name: "Free Shipping",
                    delivery_estimate: {
                        minimum: {unit: 'business_day', value: 4},
                        maximum: {unit: 'business_day', value: 7},
                    }
                }
            }
        ],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    })
    res.status(200).json({ id: session.id })
}