import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Mail, Lock, Eye, Trash2, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Account = () => {
  const { wishlist, toggleWishlist, products, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Authentication mock states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('bellemont_logged_in');
    return saved === 'true';
  });
  
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'register'
  const [activeDashboardTab, setActiveDashboardTab] = useState('orders'); // 'orders', 'wishlist', 'address', 'profile'
  
  // Form input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // User Profile details mock state
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('bellemont_user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Lady Beatrice Darcy',
      email: 'beatrice@darcyestates.co.uk',
      phone: '+44 7700 900077',
      membership: 'Signature Gold Club Member'
    };
  });

  // Mock Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Default Shipping Address',
      name: 'Lady Beatrice Darcy',
      address: 'Pemberley House, Estate Row 4',
      city: 'Derbyshire',
      zipCode: 'DE45 1PQ',
      country: 'United Kingdom'
    },
    {
      id: 2,
      type: 'Summer Residence',
      name: 'Lady Beatrice Darcy',
      address: 'Villa d\'Este, Lake Como side',
      city: 'Cernobbio',
      zipCode: '22012',
      country: 'Italy'
    }
  ]);

  // Mock Order history logs
  const [orders, setOrders] = useState([
    {
      orderId: 'BLM-982736',
      date: 'May 12, 2026',
      total: 304,
      status: 'Delivered',
      items: [
        { name: 'Verona Linen Dress', size: 'S', color: 'Camel', price: 109, qty: 1 },
        { name: 'St. Tropez Linen Blazer', size: 'S', color: 'Ivory Cream', price: 180, qty: 1 }
      ]
    },
    {
      orderId: 'BLM-481729',
      date: 'April 02, 2026',
      total: 120,
      status: 'Delivered',
      items: [
        { name: 'Riviera Woven Basket Bag', size: 'One Size', color: 'Natural Straw', price: 120, qty: 1 }
      ]
    }
  ]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('bellemont_logged_in', 'true');
    } else {
      setAuthError('Please fill out all login credentials.');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (regName && regEmail && regPassword) {
      const newProfile = {
        name: regName,
        email: regEmail,
        phone: '+1 (555) 012-3456',
        membership: 'Classic Member'
      };
      setUserProfile(newProfile);
      localStorage.setItem('bellemont_user_profile', JSON.stringify(newProfile));
      setIsLoggedIn(true);
      localStorage.setItem('bellemont_logged_in', 'true');
    } else {
      setAuthError('Please fill out all registration fields.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('bellemont_logged_in');
  };

  // Get Wishlist items details
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16 text-luxury-black font-sans font-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="border-b border-luxury-black/5 pb-6 mb-12">
          <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold block mb-2">My Account</span>
          <h1 className="font-editorial text-3xl font-light tracking-wide uppercase">
            {isLoggedIn ? `Welcome back, ${userProfile.name.split(' ')[0]}` : 'Customer Gateway'}
          </h1>
        </div>

        {/* 1. AUTHENTICATION PAGES (LOGIN / REGISTER FORM) */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-luxury-white border border-luxury-black/5 p-8 rounded-md shadow-xs space-y-6 text-left">
            
            {/* Tabs Toggle buttons */}
            <div className="flex border-b border-luxury-black/5 pb-4">
              <button
                onClick={() => {
                  setAuthTab('login');
                  setAuthError('');
                }}
                className={`flex-1 text-center text-xs tracking-widest uppercase font-semibold cursor-pointer py-2 ${
                  authTab === 'login' ? 'text-luxury-black border-b border-luxury-black' : 'text-luxury-grey hover:text-luxury-black'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthTab('register');
                  setAuthError('');
                }}
                className={`flex-1 text-center text-xs tracking-widest uppercase font-semibold cursor-pointer py-2 ${
                  authTab === 'register' ? 'text-luxury-black border-b border-luxury-black' : 'text-luxury-grey hover:text-luxury-black'
                }`}
              >
                Register
              </button>
            </div>

            {authError && (
              <p className="text-xs text-red-800 tracking-wider font-semibold text-center bg-red-50 p-2.5 rounded border border-red-100">{authError}</p>
            )}

            {/* A. Login Form */}
            {authTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="beatrice@darcyestates.co.uk"
                      className="bg-luxury-ivory border border-luxury-black/10 rounded pl-10 pr-3 py-2.5 text-xs font-light text-luxury-black w-full outline-none"
                    />
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-grey" />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="bg-luxury-ivory border border-luxury-black/10 rounded pl-10 pr-3 py-2.5 text-xs font-light text-luxury-black w-full outline-none"
                    />
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-grey" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-luxury-grey pt-1">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded text-luxury-black focus:ring-0 border-luxury-black/15" />
                    <span>Remember Me</span>
                  </label>
                  <a href="#" className="hover:text-luxury-black transition-colors underline">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-300 border border-luxury-black cursor-pointer shadow-xs mt-6"
                >
                  Access Dashboard
                </button>
              </form>
            ) : (
              /* B. Register Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Lady Beatrice Darcy"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3.5 py-2.5 text-xs font-light text-luxury-black w-full outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="beatrice@darcyestates.co.uk"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3.5 py-2.5 text-xs font-light text-luxury-black w-full outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="bg-luxury-ivory border border-luxury-black/10 rounded px-3.5 py-2.5 text-xs font-light text-luxury-black w-full outline-none"
                  />
                </div>

                <p className="text-[9px] text-luxury-grey leading-relaxed font-light">
                  By registering, you agree to receive private previews and fashion catalog updates. You can unsubscribe at any time.
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-300 border border-luxury-black cursor-pointer shadow-xs mt-6"
                >
                  Create Private Account
                </button>
              </form>
            )}

          </div>
        ) : (
          /* 2. LOGGED IN DASHBOARD VIEW */
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* LEFT SIDEBAR: TAB SWITCHER */}
            <div className="w-full lg:w-64 shrink-0 bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs h-fit text-left text-luxury-black">
              
              {/* Member card */}
              <div className="pb-6 border-b border-luxury-black/5 mb-6 flex items-center space-x-3">
                <div className="w-10 h-10 bg-luxury-gold text-luxury-ivory rounded-full flex items-center justify-center font-bold">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-editorial text-sm font-semibold tracking-wide truncate max-w-[150px]">{userProfile.name}</h4>
                  <span className="text-[8px] text-luxury-gold-dark font-semibold tracking-widest uppercase block mt-0.5">
                    {userProfile.membership}
                  </span>
                </div>
              </div>

              {/* Tab Navigation items */}
              <nav className="flex flex-col space-y-2 text-xs tracking-wider uppercase font-semibold">
                
                <button
                  onClick={() => setActiveDashboardTab('orders')}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer text-left focus:outline-none ${
                    activeDashboardTab === 'orders' ? 'bg-luxury-black text-luxury-ivory' : 'text-luxury-grey hover:bg-luxury-beige/30 hover:text-luxury-black'
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>Order History</span>
                </button>

                <button
                  onClick={() => setActiveDashboardTab('wishlist')}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer text-left focus:outline-none ${
                    activeDashboardTab === 'wishlist' ? 'bg-luxury-black text-luxury-ivory' : 'text-luxury-grey hover:bg-luxury-beige/30 hover:text-luxury-black'
                  }`}
                >
                  <Heart size={14} />
                  <span>My Wishlist ({wishlist.length})</span>
                </button>

                <button
                  onClick={() => setActiveDashboardTab('address')}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer text-left focus:outline-none ${
                    activeDashboardTab === 'address' ? 'bg-luxury-black text-luxury-ivory' : 'text-luxury-grey hover:bg-luxury-beige/30 hover:text-luxury-black'
                  }`}
                >
                  <MapPin size={14} />
                  <span>Saved Addresses</span>
                </button>

                <button
                  onClick={() => setActiveDashboardTab('profile')}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xs transition-colors cursor-pointer text-left focus:outline-none ${
                    activeDashboardTab === 'profile' ? 'bg-luxury-black text-luxury-ivory' : 'text-luxury-grey hover:bg-luxury-beige/30 hover:text-luxury-black'
                  }`}
                >
                  <Settings size={14} />
                  <span>Personal Details</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xs text-red-800 hover:bg-red-50 transition-colors cursor-pointer text-left focus:outline-none mt-8 border-t border-luxury-black/5 pt-4"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>

              </nav>

            </div>

            {/* RIGHT WORKPLACE CONTENT: SELECTED TAB */}
            <div className="flex-grow bg-luxury-white border border-luxury-black/5 p-6 md:p-8 rounded-md shadow-xs text-left">
              
              {/* A. ORDERS TAB CONTENT */}
              {activeDashboardTab === 'orders' && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="font-editorial text-lg tracking-widest uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                    Order Logs
                  </h3>

                  {orders.length === 0 ? (
                    <p className="text-xs text-luxury-grey font-light italic py-10 text-center">You have not placed any orders yet.</p>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order, idx) => (
                        <div key={idx} className="border border-luxury-black/10 rounded overflow-hidden">
                          {/* Order Header bar */}
                          <div className="bg-luxury-beige/30 px-4 py-3 flex flex-wrap justify-between items-center border-b border-luxury-black/10 text-xs">
                            <div className="flex space-x-6 py-1">
                              <div>
                                <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Order Reference</span>
                                <p className="font-semibold mt-0.5">{order.orderId}</p>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Date</span>
                                <p className="font-light mt-0.5">{order.date}</p>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Total</span>
                                <p className="font-semibold mt-0.5">${order.total}</p>
                              </div>
                            </div>
                            <span className="bg-luxury-gold text-luxury-ivory text-[9px] font-semibold uppercase px-2.5 py-0.5 tracking-wider rounded-xs">
                              {order.status}
                            </span>
                          </div>
                          {/* Order Items list */}
                          <div className="p-4 space-y-4">
                            {order.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex justify-between items-center text-xs">
                                <div>
                                  <h5 className="font-editorial font-medium">{item.name}</h5>
                                  <span className="text-[9px] text-luxury-grey font-light">
                                    Size {item.size} / Color {item.color} (Qty: {item.qty})
                                  </span>
                                </div>
                                <span className="font-light">${item.price * item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* B. WISHLIST TAB CONTENT */}
              {activeDashboardTab === 'wishlist' && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="font-editorial text-lg tracking-widest uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                    My Curated Wishlist ({wishlistProducts.length})
                  </h3>

                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <p className="text-xs text-luxury-grey font-light italic">Your wishlist is currently empty.</p>
                      <Link to="/" className="luxury-btn text-[10px] inline-block">Browse Boutique</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistProducts.map((p) => (
                        <div key={p.id} className="border border-luxury-black/5 bg-luxury-ivory p-4 rounded flex flex-col justify-between space-y-3 relative">
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="absolute top-2 right-2 text-luxury-grey hover:text-red-800 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={13} />
                          </button>
                          
                          <div className="flex space-x-3 items-center">
                            <div className="w-14 h-18 bg-luxury-beige rounded overflow-hidden flex-shrink-0">
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="text-xs leading-tight">
                              <h5 className="font-editorial font-medium">{p.name}</h5>
                              <p className="font-semibold mt-1">${p.price}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2 text-[10px] font-semibold tracking-wider uppercase">
                            <Link to={`/product/${p.id}`} className="flex-1 py-2 border border-luxury-black/20 hover:border-luxury-black rounded text-center transition-all">
                              View details
                            </Link>
                            <button
                              onClick={() => addToCart(p, 1, p.sizes ? p.sizes[0] : 'One Size', p.color)}
                              className="flex-1 py-2 bg-luxury-black text-luxury-ivory hover:bg-luxury-gold transition-all rounded"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* C. SAVED ADDRESS TAB CONTENT */}
              {activeDashboardTab === 'address' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex justify-between items-baseline border-b border-luxury-black/5 pb-3">
                    <h3 className="font-editorial text-lg tracking-widest uppercase font-semibold text-luxury-black">
                      Address Profile
                    </h3>
                    <button className="text-[10px] tracking-wider uppercase text-luxury-gold hover:text-luxury-black underline font-semibold cursor-pointer">
                      Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border border-luxury-black/10 p-5 rounded space-y-3 relative text-xs">
                        <span className="text-[9px] tracking-widest text-luxury-gold-dark font-semibold uppercase block border-b border-luxury-black/5 pb-2">
                          {addr.type}
                        </span>
                        <p className="font-semibold">{addr.name}</p>
                        <p className="text-luxury-grey font-light leading-relaxed">
                          {addr.address} <br />
                          {addr.city}, {addr.zipCode} <br />
                          {addr.country}
                        </p>
                        <div className="flex space-x-3 text-[10px] underline text-luxury-grey pt-2">
                          <button className="hover:text-luxury-black">Edit Address</button>
                          <button className="hover:text-red-800">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* D. PERSONAL PROFILE TAB CONTENT */}
              {activeDashboardTab === 'profile' && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="font-editorial text-lg tracking-widest uppercase font-semibold text-luxury-black border-b border-luxury-black/5 pb-3">
                    Personal Details
                  </h3>

                  <div className="max-w-md space-y-5 text-xs">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Account Holder</span>
                      <p className="font-semibold text-sm">{userProfile.name}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Private Email</span>
                      <p className="font-light">{userProfile.email}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Secure Phone</span>
                      <p className="font-light">{userProfile.phone}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-[9px] uppercase font-semibold text-luxury-grey tracking-wider">Membership Level</span>
                      <p className="font-semibold text-luxury-gold-dark">{userProfile.membership}</p>
                    </div>

                    <button className="luxury-btn text-[10px] w-full mt-4">
                      Modify Profile Settings
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Account;
