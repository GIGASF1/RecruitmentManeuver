/**
 * Stripe Integration Placeholder
 *
 * TODO: Install stripe package: npm install stripe
 * TODO: Set up Stripe webhook endpoint
 * TODO: Create products and prices in Stripe dashboard
 * TODO: Implement subscription management
 */

// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-12-18.acacia',
// });

export const PLANS = {
  passive: {
    name: "Passive",
    price: 0,
    interval: null,
    features: [
      "Track up to 5 opportunities",
      "Manual fit scoring",
      "Basic comparison",
      "Notes & tasks",
    ],
    // TODO: stripeProductId: 'prod_xxx',
    // TODO: stripePriceId: 'price_xxx',
  },
  active: {
    name: "Active",
    price: 29,
    interval: "month" as const,
    features: [
      "Unlimited opportunities",
      "AI-powered fit scoring",
      "Advanced comparison & analytics",
      "Interview question generation",
      "Negotiation email drafting",
      "Note summarization",
      "Priority support",
    ],
    // TODO: stripeProductId: 'prod_xxx',
    // TODO: stripePriceId: 'price_xxx',
  },
} as const;

// TODO: Implement these functions

export async function createCheckoutSession(_userId: string, _plan: "active") {
  // TODO: Create Stripe checkout session
  // const session = await stripe.checkout.sessions.create({
  //   customer_email: userEmail,
  //   line_items: [{ price: PLANS.active.stripePriceId, quantity: 1 }],
  //   mode: 'subscription',
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
  // });
  // return session.url;
  return null;
}

export async function createPortalSession(_customerId: string) {
  // TODO: Create Stripe billing portal session
  // const session = await stripe.billingPortal.sessions.create({
  //   customer: customerId,
  //   return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  // });
  // return session.url;
  return null;
}

export async function handleWebhookEvent(_event: unknown) {
  // TODO: Handle Stripe webhook events
  // switch (event.type) {
  //   case 'checkout.session.completed':
  //     // Update user subscription status
  //     break;
  //   case 'customer.subscription.deleted':
  //     // Downgrade user
  //     break;
  // }
}
