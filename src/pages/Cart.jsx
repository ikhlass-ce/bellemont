import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Tag, X } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTaxes,
    cartTotal
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    if (!promoInput.trim()) return;

    const res = applyCoupon(promoInput);
    if (res.success) {
      setPromoSuccess(res.message);
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setPromoSuccess('');
    setPromoError('');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16 text-luxury-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="border-b border-luxury-black/5 pb-6 mb-12">
          <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold block mb-2">Shopping Cart</span>
          <h1 className="font-editorial text-3xl font-light tracking-wide uppercase">Your Shopping Bag</h1>
        </div>

        {cart.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20 bg-luxury-white border border-luxury-black/5 rounded-md shadow-xs max-w-xl mx-auto px-6 space-y-6">
            <div className="w-16 h-16 bg-luxury-beige rounded-full flex items-center justify-center mx-auto text-luxury-gold">
              <ShoppingBag size={24} strokeWidth={1.5} />
            </div>
            <h2 className="font-editorial text-xl italic text-luxury-grey">Your shopping bag is empty.</h2>
            <p className="text-xs text-luxury-grey leading-relaxed font-light">
              Explore our new arrivals and timeless silhouettes to find the perfect piece.
            </p>
            <Link to="/" className="luxury-btn text-xs w-full block text-center">
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* CART CONTENT */
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT COLUMN: ITEMS LIST */}
            <div className="flex-grow space-y-6 lg:max-w-4.5xl">
              
              {/* Desktop Headers */}
              <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-luxury-black/5 text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">
                <span className="col-span-3">Product Description</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Unit Price</span>
                <span className="text-right">Total Price</span>
              </div>

              {/* Items listing */}
              <div className="space-y-6">
                {cart.map((item) => {
                  const itemKey = `${item.product.id}-${item.size}-${item.color}`;
                  return (
                    <div 
                      key={itemKey}
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center bg-luxury-white border border-luxury-black/5 p-4 sm:p-6 rounded-md shadow-xs"
                    >
                      {/* Product details (column span 3) */}
                      <div className="col-span-1 md:col-span-3 flex space-x-4">
                        <div className="w-20 h-26 bg-luxury-beige rounded overflow-hidden flex-shrink-0 border border-luxury-black/5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-between py-1 text-left">
                          <div>
                            <h4 className="font-editorial text-[13px] tracking-wide font-medium">
                              <Link to={`/product/${item.product.id}`} className="hover:text-luxury-gold transition-colors">
                                {item.product.name}
                              </Link>
                            </h4>
                            <p className="text-[11px] text-luxury-grey font-light tracking-wide mt-1">
                              Color: {item.color}
                            </p>
                            <p className="text-[11px] text-luxury-grey font-light tracking-wide">
                              Size: {item.size}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-[10px] text-luxury-grey hover:text-red-800 transition-colors tracking-widest uppercase font-light flex items-center space-x-1 mt-3 focus:outline-none cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity adjusting (column span 1) */}
                      <div className="flex justify-between md:justify-center items-center md:col-span-1 border-t md:border-none pt-3 md:pt-0 border-luxury-black/5">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey md:hidden">Quantity:</span>
                        <div className="inline-flex items-center border border-luxury-black/10 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-light">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-xs hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Unit Price (column span 1) */}
                      <div className="flex justify-between md:justify-center items-center md:col-span-1 border-t md:border-none pt-2 md:pt-0 border-luxury-black/5 text-xs">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey md:hidden">Unit Price:</span>
                        <span className="font-light">${item.product.price}</span>
                      </div>

                      {/* Total Price (column span 1) */}
                      <div className="flex justify-between md:justify-end items-center md:col-span-1 border-t md:border-none pt-2 md:pt-0 border-luxury-black/5 text-xs font-semibold">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey md:hidden">Total:</span>
                        <span className="tracking-wide">${item.product.price * item.quantity}</span>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping button */}
              <div className="pt-4">
                <Link to="/" className="text-xs tracking-widest uppercase text-luxury-black hover:text-luxury-gold transition-colors duration-300 flex items-center font-semibold">
                  <ArrowLeft size={14} className="mr-1.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY & PROMO */}
            <div className="w-full lg:w-96 shrink-0 space-y-6">
              
              {/* Promo code input form */}
              <div className="bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs space-y-4">
                <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-luxury-gold flex items-center space-x-2">
                  <Tag size={13} />
                  <span>Apply Promotional Code</span>
                </h4>
                
                {couponCode ? (
                  /* Applied Coupon State */
                  <div className="bg-luxury-beige/40 p-3 rounded flex items-center justify-between border border-luxury-gold/20 animate-fade-in">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-luxury-gold-dark">{couponCode}</p>
                      <p className="text-[10px] text-luxury-grey font-light">Promo applied: {discountPercent}% discount</p>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="p-1 hover:text-red-800 transition-colors cursor-pointer"
                      aria-label="Remove promo code"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  /* Form Input */
                  <form onSubmit={handlePromoSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Try BELLE10 or LIVELUXURY"
                      className="bg-luxury-ivory border border-luxury-black/10 rounded px-3 py-2.5 text-xs font-light text-luxury-black outline-none w-full placeholder:text-luxury-grey uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs px-4 py-2.5 tracking-wider uppercase font-semibold transition-all duration-300 rounded-sm cursor-pointer border border-luxury-black"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <p className="text-[10px] text-red-800 tracking-wider font-medium animate-fade-in">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-[10px] text-luxury-gold-dark tracking-wider font-semibold animate-fade-in">{promoSuccess}</p>
                )}
              </div>

              {/* Order total breakdown panel */}
              <div className="bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs space-y-4">
                <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                  Order Summary
                </h4>

                <div className="space-y-3.5 text-xs text-luxury-grey font-light">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} Item{cartCount !== 1 ? 's' : ''})</span>
                    <span className="text-luxury-black font-medium">${cartSubtotal}</span>
                  </div>
                  
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-luxury-gold-dark font-medium animate-fade-in">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-${cartDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    {cartShipping === 0 ? (
                      <span className="text-luxury-gold font-semibold tracking-wider uppercase text-[10px]">Complimentary</span>
                    ) : (
                      <span className="text-luxury-black font-medium">${cartShipping}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Sales Taxes (8%)</span>
                    <span className="text-luxury-black font-medium">${cartTaxes}</span>
                  </div>

                  {cartShipping > 0 && (
                    <p className="text-[9px] text-luxury-grey leading-tight italic bg-luxury-beige/30 p-2.5 rounded border border-luxury-black/5">
                      Tip: Spend <strong>${150 - cartSubtotal}</strong> more to qualify for complimentary premium shipping.
                    </p>
                  )}
                </div>

                <div className="border-t border-luxury-black/5 pt-4 flex justify-between items-baseline font-semibold text-sm tracking-wide">
                  <span>TOTAL ESTIMATED</span>
                  <span className="text-base font-bold text-luxury-black tracking-wider">${cartTotal}</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-4 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-500 rounded-sm cursor-pointer border border-luxury-black shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
