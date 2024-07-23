import Stripe from 'stripe';
import User from '../models/user.js';
const stripe = Stripe(process.env.STRIPE_TEST_KEY);

const createCustomer  = async (req, res) => {
  try {
    const { name } = req.body;
    const email = req.user.email;
    const customer = await stripe.customers.create({
      name, email
    });
    
    await User.update(req.user, { stripeId: customer.id })

    res.send({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create a customer" });
  }
};

const updateCustomer =  async (req, res) => {
  const { customerId, name } = req.body;
  try {
    const customer = await stripe.customers.update(
      customerId,
      {
        name: name
      }
    );
    res.send({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update a customer" });
  }
};


const createSetupIntent = async (req, res) => {
  try {
    const { customerId } = req.body;
    const setupPaymentIntents = await stripe.setupIntents.create({
      customer: customerId,
    });

    res.json({ clientSecret: setupPaymentIntents.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};


const confirmSetupIntent = async (req, res) => {
  try {
    const { setupIntentId, paymentMethodId } = req.body;
    const confirmedIntent = await stripe.setupIntents.confirm(setupIntentId, {
      payment_method: paymentMethodId,
      return_url: 'http://localhost:5000/',
    });

    res.json({ confirmedIntent });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const readyForPayment = async (req, res) => {
  try {
    const { customerId, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ paymentId: paymentIntent.id, paymentAmount: paymentIntent.amount });
  } catch (error) {
    res.status(500).json(error);
  }
};

const confirmAndMakePayment =  async (req, res) => {
  try {
    const { paymentId, customerId, paymentMethodId } = req.body;

    const paymentSuccess = await stripe.paymentIntents.confirm(
      paymentId, {
      payment_method: paymentMethodId,
      return_url: 'http://localhost:5000/',
    });

    res.json({ paymentSuccess });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCardInfo =  async (req, res) => {
  const { customerId } = req.body;
  try {
    const { data } = await stripe.paymentMethods.list({
      type: 'card',
      customer: customerId,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'NO CARDS ADDED' });
  }
};


const deleteUserCard = async (req, res) => {
  const { paymentMethodId } = req.body;
  try {
    const paymentMethodDelete = await stripe.paymentMethods.detach(
      paymentMethodId
    );
    res.json({ paymentMethodDelete });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createCustomer, updateCustomer, createSetupIntent, deleteUserCard, getCardInfo, confirmAndMakePayment, readyForPayment, confirmSetupIntent }
