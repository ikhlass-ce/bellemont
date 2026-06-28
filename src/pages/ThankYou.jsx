import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Mail, Calendar, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const ThankYou = () => {
  const navigate = useNavigate();
  const { lastOrder, setLastOrder } = useContext(ShopContext);

  useEffect(() => {
    // If no order exists in state, redirect to home page
    if (!lastOrder) {
      navigate('/');
    }

    // Cleanup order state on unmount optionally, or keep it for refreshing.
    // We keep it so they can see the confirmation details on reload, but we clear it if they navigate away.
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16 text-luxury-black font-sans font-light text-center">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* CHECKMARK ICON ANIMATED */}
        <div className="w-20 h-20 bg-luxury-beige rounded-full flex items-center justify-center mx-auto text-luxury-gold mb-8 animate-scale-up border border-luxury-gold/10">
          <CheckCircle2 size={36} strokeWidth={1.5} />
        </div>

        {/* HEADER BRAND MESSAGE */}
        <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold block mb-3">CONGRATULATIONS</span>
        <h1 className="font-editorial text-4xl font-light tracking-wide uppercase mb-4">Thank You For Your Order</h1>
        <p className="text-xs text-luxury-grey max-w-lg mx-auto leading-relaxed font-light mb-12">
          Your order has been received and is currently being processed by our packaging craftsmen. A secure confirmation invoice has been sent to your registered email.
        </p>

        {/* ORDER SPECS CARD */}
        <div className="bg-luxury-white border border-luxury-black/5 rounded-md shadow-xs p-6 md:p-8 text-left space-y-6 max-w-2xl mx-auto mb-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-luxury-black/5 pb-4 space-y-2 sm:space-y-0 text-xs">
            <div>
              <span className="text-[9px] tracking-widest text-luxury-grey uppercase font-semibold">Order Number</span>
              <p className="font-semibold text-luxury-black text-sm tracking-wider mt-0.5">{lastOrder.orderNumber}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-[9px] tracking-widest text-luxury-grey uppercase font-semibold">Order Date</span>
              <p className="text-luxury-black font-medium mt-0.5">{lastOrder.date}</p>
            </div>
          </div>

          {/* Delivery Estimation */}
          <div className="flex items-start space-x-3 bg-luxury-beige/40 p-4 rounded border border-luxury-gold/15 text-xs text-luxury-black">
            <Calendar size={18} className="text-luxury-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] tracking-widest text-luxury-gold-dark uppercase font-semibold block">Estimated Delivery</span>
              <p className="font-semibold mt-0.5">{lastOrder.estimatedDelivery}</p>
              <p className="text-[10px] text-luxury-grey font-light mt-1">Complimentary courier signature shipping is enabled.</p>
            </div>
          </div>

          {/* Ordered items summary list */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Purchased Items</h4>
            <div className="space-y-3.5">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-13 bg-luxury-beige rounded overflow-hidden flex-shrink-0 border border-luxury-black/5">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-editorial font-medium">{item.product.name}</h5>
                      <span className="text-[9px] text-luxury-grey font-light">
                        {item.color} / Size {item.size} (Qty: {item.quantity})
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-luxury-black/5 pt-4 space-y-2 text-xs text-luxury-grey font-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-luxury-black font-medium">${lastOrder.subtotal}</span>
            </div>
            
            {lastOrder.discount > 0 && (
              <div className="flex justify-between text-luxury-gold-dark font-medium">
                <span>Promo Discount ({lastOrder.coupon})</span>
                <span>-${lastOrder.discount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              {lastOrder.shipping === 0 ? (
                <span className="text-luxury-gold font-semibold uppercase text-[10px] tracking-wider">Complimentary</span>
              ) : (
                <span className="text-luxury-black font-medium">${lastOrder.shipping}</span>
              )}
            </div>

            <div className="flex justify-between">
              <span>Sales Taxes</span>
              <span className="text-luxury-black font-medium">${lastOrder.taxes}</span>
            </div>

            <div className="border-t border-luxury-black/5 pt-3 flex justify-between items-baseline font-semibold text-sm tracking-wide text-luxury-black">
              <span>TOTAL PAID</span>
              <span className="text-base font-bold tracking-wider">${lastOrder.total}</span>
            </div>
          </div>

          {/* Secure transaction check */}
          <div className="flex items-center space-x-2 border-t border-luxury-black/5 pt-4 text-[10px] text-luxury-grey font-light">
            <ShieldCheck size={14} className="text-luxury-gold" />
            <span>Authorized via Mock Merchant Platform. No actual billing occurred.</span>
          </div>

        </div>

        {/* ACTION CTA */}
        <div className="space-y-4">
          <Link
            to="/"
            onClick={() => setLastOrder(null)} // Clear order from state on click to allow future shopping cleanly
            className="luxury-btn text-xs max-w-xs mx-auto flex items-center justify-center space-x-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ThankYou;
