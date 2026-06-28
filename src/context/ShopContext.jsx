import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  // Cart state: array of { product, quantity, size, color }
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('bellemont_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist state: array of productIds
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('bellemont_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); // in percent e.g. 10 for 10%

  // Checkout and Order details
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    paymentMethod: 'Credit Card',
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const [lastOrder, setLastOrder] = useState(() => {
    const savedOrder = localStorage.getItem('bellemont_last_order');
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  // Global Quick View state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('bellemont_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bellemont_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('bellemont_last_order', JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem('bellemont_last_order');
    }
  }, [lastOrder]);

  // Cart operations
  const addToCart = (product, quantity = 1, size = 'M', color = '') => {
    const selectedColor = color || (product.colors && product.colors[0]?.name) || '';
    
    setCart((prevCart) => {
      // Find if item already exists with same size & color
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, size, color: selectedColor }];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const normalizedCode = code.toUpperCase().trim();
    if (normalizedCode === 'BELLE10') {
      setCouponCode('BELLE10');
      setDiscountPercent(10);
      return { success: true, message: '10% discount applied.' };
    } else if (normalizedCode === 'LIVELUXURY') {
      setCouponCode('LIVELUXURY');
      setDiscountPercent(15);
      return { success: true, message: '15% discount applied.' };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = (cartSubtotal * discountPercent) / 100;
  const cartShipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15; // Free shipping over $150
  const cartTaxes = parseFloat(((cartSubtotal - cartDiscount) * 0.08).toFixed(2)); // 8% tax
  const cartTotal = parseFloat((cartSubtotal - cartDiscount + cartShipping + cartTaxes).toFixed(2));

  // Order Placement
  const placeOrder = () => {
    const orderNumber = 'BLM-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Delivery date calculation (approx 5-7 business days)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 6);
    const deliveryString = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const newOrder = {
      orderNumber,
      date: orderDate,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      taxes: cartTaxes,
      total: cartTotal,
      coupon: couponCode,
      shippingAddress: {
        name: checkoutDetails.fullName,
        address: checkoutDetails.address,
        city: checkoutDetails.city,
        zipCode: checkoutDetails.zipCode,
        country: checkoutDetails.country
      },
      estimatedDelivery: deliveryString
    };

    setLastOrder(newOrder);
    clearCart();
    return orderNumber;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        couponCode,
        discountPercent,
        checkoutDetails,
        lastOrder,
        setCheckoutDetails,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        setLastOrder,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTaxes,
        cartTotal,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
