import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    checkoutDetails,
    setCheckoutDetails,
    placeOrder,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTaxes,
    cartTotal,
    couponCode
  } = useContext(ShopContext);

  // Form input states
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If cart is empty and no checkout was done, redirect to cart page
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  if (cart.length === 0) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Simple checkout form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!checkoutDetails.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!checkoutDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(checkoutDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!checkoutDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!checkoutDetails.country.trim()) newErrors.country = 'Country is required';
    if (!checkoutDetails.city.trim()) newErrors.city = 'City is required';
    if (!checkoutDetails.address.trim()) newErrors.address = 'Street address is required';
    if (!checkoutDetails.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    
    // Card fields
    if (!checkoutDetails.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    if (!checkoutDetails.cardNumber.trim() || checkoutDetails.cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!checkoutDetails.expirationDate.trim() || !checkoutDetails.expirationDate.includes('/')) {
      newErrors.expirationDate = 'Expiry date (MM/YY) is required';
    }
    if (!checkoutDetails.cvv.trim() || checkoutDetails.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderNo = placeOrder();
      navigate('/thank-you');
    } else {
      // Scroll to the top of the form or display alert
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16 text-luxury-black font-sans font-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="border-b border-luxury-black/5 pb-6 mb-12 flex justify-between items-center">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold block mb-2">Secure Gateway</span>
            <h1 className="font-editorial text-3xl font-light tracking-wide uppercase">Luxury Checkout</h1>
          </div>
          <Link to="/cart" className="text-xs text-luxury-grey hover:text-luxury-black transition-colors flex items-center">
            <ArrowLeft size={13} className="mr-1.5" />
            <span>Return to Bag</span>
          </Link>
        </div>

        {/* SECURE SUBTEXT */}
        <div className="flex items-center space-x-2 bg-luxury-beige/50 border border-luxury-gold/15 p-3 rounded mb-8 text-xs text-luxury-gold-dark font-medium max-w-sm">
          <ShieldCheck size={16} />
          <span>SSL Encrypted Connection. Your data is protected.</span>
        </div>

        {/* ROW LAYOUT */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: SHIPPING & BILLING ADDRESS */}
          <div className="flex-grow space-y-8 lg:max-w-4.5xl text-left">
            
            {/* Step 1: Customer Details */}
            <div className="bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs space-y-6">
              <h2 className="font-editorial text-lg tracking-wider uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                1. Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Full name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={checkoutDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="Lady Catherine de Bourgh"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-800">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={checkoutDetails.email}
                    onChange={handleInputChange}
                    placeholder="catherine@luxurymail.com"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.email && <p className="text-[10px] text-red-800">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-2">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={checkoutDetails.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 019-2834"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.phone && <p className="text-[10px] text-red-800">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-2">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={checkoutDetails.address}
                    onChange={handleInputChange}
                    placeholder="12 Rosings Park, Kent Estate"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.address && <p className="text-[10px] text-red-800">{errors.address}</p>}
                </div>

                {/* Country */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={checkoutDetails.country}
                    onChange={handleInputChange}
                    placeholder="United Kingdom"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.country && <p className="text-[10px] text-red-800">{errors.country}</p>}
                </div>

                {/* City */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">City</label>
                  <input
                    type="text"
                    name="city"
                    value={checkoutDetails.city}
                    onChange={handleInputChange}
                    placeholder="Pemberley"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.city && <p className="text-[10px] text-red-800">{errors.city}</p>}
                </div>

                {/* ZIP Code */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={checkoutDetails.zipCode}
                    onChange={handleInputChange}
                    placeholder="KT1 2AB"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors"
                  />
                  {errors.zipCode && <p className="text-[10px] text-red-800">{errors.zipCode}</p>}
                </div>

              </div>
            </div>

            {/* Step 2: Payment Details */}
            <div className="bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs space-y-6">
              <h2 className="font-editorial text-lg tracking-wider uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3 flex items-center space-x-2">
                <CreditCard size={18} />
                <span>2. Payment Details</span>
              </h2>

              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setCheckoutDetails(prev => ({ ...prev, paymentMethod: 'Credit Card' }))}
                  className={`flex-1 py-3 text-xs tracking-wider uppercase border rounded-sm font-semibold cursor-pointer transition-all ${
                    checkoutDetails.paymentMethod === 'Credit Card'
                      ? 'border-luxury-black bg-luxury-black text-luxury-ivory'
                      : 'border-luxury-black/10 hover:border-luxury-black/30'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutDetails(prev => ({ ...prev, paymentMethod: 'Debit Card' }))}
                  className={`flex-1 py-3 text-xs tracking-wider uppercase border rounded-sm font-semibold cursor-pointer transition-all ${
                    checkoutDetails.paymentMethod === 'Debit Card'
                      ? 'border-luxury-black bg-luxury-black text-luxury-ivory'
                      : 'border-luxury-black/10 hover:border-luxury-black/30'
                  }`}
                >
                  Debit Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Cardholder name */}
                <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-3">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={checkoutDetails.cardholderName}
                    onChange={handleInputChange}
                    placeholder="Lady Catherine de Bourgh"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors uppercase tracking-wider"
                  />
                  {errors.cardholderName && <p className="text-[10px] text-red-800">{errors.cardholderName}</p>}
                </div>

                {/* Card number */}
                <div className="flex flex-col space-y-1.5 col-span-1 md:col-span-3">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    maxLength={16}
                    value={checkoutDetails.cardNumber}
                    onChange={(e) => {
                      // Allow only digits
                      const val = e.target.value.replace(/\D/g, '');
                      e.target.value = val;
                      handleInputChange(e);
                    }}
                    placeholder="4111222233334444"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors tracking-[0.2em]"
                  />
                  {errors.cardNumber && <p className="text-[10px] text-red-800">{errors.cardNumber}</p>}
                </div>

                {/* Expiration date */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Expiry Date</label>
                  <input
                    type="text"
                    name="expirationDate"
                    maxLength={5}
                    value={checkoutDetails.expirationDate}
                    onChange={(e) => {
                      // format MM/YY automatically
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 2) {
                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                      }
                      e.target.value = val;
                      handleInputChange(e);
                    }}
                    placeholder="MM/YY"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors text-center tracking-widest"
                  />
                  {errors.expirationDate && <p className="text-[10px] text-red-800">{errors.expirationDate}</p>}
                </div>

                {/* CVV */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">CVV / Security Code</label>
                  <input
                    type="password"
                    name="cvv"
                    maxLength={4}
                    value={checkoutDetails.cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      e.target.value = val;
                      handleInputChange(e);
                    }}
                    placeholder="***"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none focus:border-luxury-gold transition-colors text-center tracking-widest"
                  />
                  {errors.cvv && <p className="text-[10px] text-red-800">{errors.cvv}</p>}
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="w-full lg:w-96 shrink-0 space-y-6 text-left">
            <div className="bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs space-y-6">
              <h3 className="font-editorial text-lg tracking-wider uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                Order Review
              </h3>

              {/* Items Summary list */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex space-x-3 items-center">
                    <div className="w-12 h-16 bg-luxury-beige rounded overflow-hidden flex-shrink-0 border border-luxury-black/5">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow text-xs leading-tight">
                      <h5 className="font-editorial font-medium">{item.product.name}</h5>
                      <p className="text-[10px] text-luxury-grey font-light mt-1">
                        Size {item.size} / {item.color}
                      </p>
                      <p className="text-[10px] text-luxury-grey mt-0.5 font-light">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold shrink-0">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="border-t border-luxury-black/5 pt-4 space-y-3 text-xs text-luxury-grey font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-luxury-black font-medium">${cartSubtotal}</span>
                </div>
                
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-luxury-gold-dark font-medium">
                    <span>Discount ({couponCode})</span>
                    <span>-${cartDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  {cartShipping === 0 ? (
                    <span className="text-luxury-gold font-semibold uppercase text-[10px] tracking-wider">Complimentary</span>
                  ) : (
                    <span className="text-luxury-black font-medium">${cartShipping}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Sales Taxes (8%)</span>
                  <span className="text-luxury-black font-medium">${cartTaxes}</span>
                </div>
              </div>

              {/* Total final */}
              <div className="border-t border-luxury-black/5 pt-4 flex justify-between items-baseline font-semibold text-sm tracking-wide">
                <span>ORDER TOTAL</span>
                <span className="text-lg font-bold text-luxury-black tracking-wider">${cartTotal}</span>
              </div>

              {/* Place Order CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-500 rounded-sm cursor-pointer border border-luxury-black shadow-sm"
                >
                  <span>Complete Secure Payment</span>
                </button>
              </div>

              <p className="text-[9px] text-luxury-grey text-center font-light leading-relaxed">
                By completing payment, you authorize this mock purchase. Orders are processed with sample credit profiles for demonstration.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;
