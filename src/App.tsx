import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, User, ShoppingBag, Truck, Calendar, Star, Gift, 
  ChevronRight, ChevronLeft, Info, Leaf, Menu, Phone, ChevronDown
} from 'lucide-react';

// --- Data ---
const NAV_CATEGORIES = [
  { name: 'E Liquids', hasDropdown: true },
  { name: 'Vape Kits', hasDropdown: true },
  { name: 'Replacements', hasDropdown: true },
  { name: 'Nic Pouches', hasDropdown: false },
  { name: 'Brands', hasDropdown: true },
  { name: 'Sale', hasDropdown: false },
];

const TOP_SELLERS = [
  {
    id: 1,
    category: 'DISPOSABLE PODS',
    title: 'Hayati Pro Max Plus 6000 Prefilled Pods Pack of 5',
    price: '£16.68',
    flavors: ['Summer Dream', 'Berry Lemonade', 'Blue Razz Watermelon'],
  },
  {
    id: 2,
    category: 'PODS',
    title: 'Crystal Prime Aura Bar 10000 Replacement Pods - Box of 5',
    price: '£13.75',
    flavors: ['Strawberry Raspberry Ice', 'Kiwi Passionfruit Guava'],
  },
  {
    id: 3,
    category: 'PODS',
    title: 'Vylo Duo 35k Prefilled Pods Box of 5',
    price: '£17.50',
    flavors: ['Blue Razz Cherry/Blue Sour Rasp', 'Watermelon Ice'],
  },
  {
    id: 4,
    category: 'PODS',
    title: 'Crystal Bling Nero 10k Prefilled Pods Box of 5',
    price: '£12.49',
    flavors: ['Blackberry Raspberry', 'Cherry Cola'],
  },
  {
    id: 5,
    category: 'PODS',
    title: 'SKE 30k Pro Max Replacement Pods Box of 5',
    price: '£22.99',
    flavors: ['Lemon Lime', 'Pink Lemonade'],
  },
  {
    id: 6,
    category: 'PODS',
    title: 'Big Bar 15000 Pro Prefilled Replacement Pods Pack of 5',
    price: '£17.99',
    flavors: ['Banana Ice', 'Gummy Bear'],
  }
];

// --- Components ---

function AgeVerificationModal({ onVerify }: { onVerify: () => void }) {
  const [error, setError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm p-4">
      <div className="w-[400px] bg-white shadow-2xl rounded-3xl p-10 border border-zinc-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <span className="font-bold text-sm">18+</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">Age Verification</h2>
        <div className="space-y-3 mb-8">
          <p className="text-zinc-500 text-sm leading-relaxed">
            The products on this website are intended for adults only. By entering this website, you certify that you are of legal smoking age in the jurisdiction in which you reside.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium animate-pulse border border-red-200 w-full mb-6">
            Access Denied: You must be 18 or older to enter.
          </div>
        )}

        <div className="w-full flex flex-col space-y-3">
          <button 
            onClick={onVerify}
            className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-md"
          >
            I am 18 or older
          </button>
          <button 
            onClick={() => setError(true)}
            className="w-full bg-zinc-100 text-zinc-600 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors"
          >
            I am under 18
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full relative z-10 bg-white border-b border-zinc-200">
      {/* Main Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-5 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <div className="text-3xl font-black text-black tracking-tighter flex items-center italic">
             UK Vape Store
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative px-8">
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            className="w-full py-2.5 pl-4 pr-12 rounded bg-white text-zinc-900 border border-zinc-200 placeholder:text-zinc-400 text-sm focus:outline-none focus:border-zinc-400"
          />
          <button className="absolute right-12 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-black transition-colors">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 shrink-0 text-xs font-bold tracking-widest uppercase text-zinc-900 ml-auto">
          <button className="hidden sm:block border border-zinc-200 px-6 py-2 rounded hover:bg-zinc-50 transition-colors">
            Sign In
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors">
            <ShoppingBag className="w-6 h-6 shrink-0" strokeWidth={1.5} />
          </div>
          <button className="md:hidden text-zinc-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Nav Pills & Secondary Links */}
      <nav className="max-w-[1440px] mx-auto px-4 lg:px-8 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 min-w-max">
          {NAV_CATEGORIES.map((cat, i) => (
            <a key={i} href="#" className="relative flex items-center gap-1 group text-xs font-bold uppercase tracking-widest text-zinc-800 hover:text-black transition-colors">
              {cat.name}
              {cat.hasDropdown && <ChevronDown className="w-3 h-3 text-zinc-400 transition-transform group-hover:rotate-180" />}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
           <a href="#" className="hover:text-zinc-800">Delivery</a>
           <a href="#" className="hover:text-zinc-800">Returns</a>
           <a href="#" className="hover:text-zinc-800">Contact</a>
        </div>
      </nav>

      {/* Trust Bar (88vape specific) */}
      <div className="border-t border-zinc-200 bg-zinc-50">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
            <div className="flex flex-col min-w-max cursor-pointer">
               <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-green-500 text-green-500"/><Star className="w-4 h-4 fill-green-500 text-green-500"/><Star className="w-4 h-4 fill-green-500 text-green-500"/><Star className="w-4 h-4 fill-green-500 text-green-500"/><Star className="w-4 h-4 fill-green-500 text-green-500"/>
               </div>
               <span className="text-xs font-medium text-zinc-800 mt-1">Rated 4.8/5</span>
               <span className="text-[10px] text-zinc-500">60,000+ Reviews</span>
            </div>
            
            <div className="flex items-center gap-3 min-w-max">
               <Truck className="w-8 h-8 text-zinc-700 stroke-1" />
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800">Free UK Delivery</span>
                  <span className="text-[10px] text-zinc-500">Spend Just £15*</span>
               </div>
            </div>

            <div className="flex items-center gap-3 min-w-max">
               <Leaf className="w-8 h-8 text-zinc-700 stroke-1" />
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800">UK Made E-Liquids</span>
                  <span className="text-[10px] text-zinc-500">Mixed in Manchester</span>
               </div>
            </div>

            <div className="flex items-center gap-3 min-w-max">
               <Info className="w-8 h-8 text-zinc-700 stroke-1" />
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800">UK Support Team</span>
                  <span className="text-[10px] text-zinc-500">Exceptionally Friendly</span>
               </div>
            </div>
         </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-[#fcb045] via-[#fd961f] to-[#fd1d1d] relative overflow-hidden">
       {/* content */}
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-20 flex flex-col md:flex-row items-center min-h-[400px]">
          <div className="w-full md:w-1/2 flex flex-col items-start z-10 text-white">
             <div className="text-3xl font-black mb-0 opacity-90 tracking-wide">AVOMI</div>
             <div className="text-7xl font-black mb-4 tracking-tighter">PRO</div>
             <div className="text-lg font-medium mb-1 opacity-90 uppercase tracking-widest text-[#ffe600]">NEW 2ml prefilled pod device</div>
             <div className="text-4xl font-bold mb-2">PRO Kits & Pods</div>
             <div className="text-4xl font-bold mb-8">£5.99 each / 2 for £10</div>
             <button className="bg-[#2a303c] text-white px-8 py-4 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-2xl">
               Shop Now <ChevronRight className="w-4 h-4"/>
             </button>
          </div>
          {/* Simulated Image area */}
          <div className="hidden md:flex w-full md:w-1/2 relative h-full items-center justify-center mt-12 md:mt-0">
             <div className="w-56 h-[24rem] bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] rounded-xl shadow-2xl skew-y-3 transform relative z-10 border-4 border-black/10">
                <div className="absolute top-8 -right-8 bg-white text-black text-xs font-bold px-3 py-1.5 rounded shadow-lg">NEW</div>
                <div className="absolute top-4 -left-10 bg-white text-black text-xs font-bold px-3 py-1.5 rounded shadow-lg">6 Kits</div>
             </div>
             <div className="w-28 h-48 bg-zinc-900 rounded-xl shadow-2xl -ml-16 mt-32 z-20 absolute border-2 border-zinc-700"></div>
             <div className="absolute bottom-4 left-16 bg-white text-black text-xs font-bold px-3 py-1.5 rounded shadow-xl z-30">12 Pod Flavours</div>
             
             {/* Features list side */}
             <div className="absolute right-0 top-10 flex flex-col gap-6">
                <div className="flex items-center gap-3 bg-black/20 rounded-full pr-4 p-1 backdrop-blur-sm">
                   <div className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center font-bold text-[9px] text-[#0494df] text-center leading-tight shadow-inner">UP TO<br/><span className="text-base leading-none">1000</span></div>
                   <div className="text-white text-xs font-bold">PUFFS</div>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-full pr-4 p-1 backdrop-blur-sm">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner"><Search className="w-6 h-6 text-[#0494df]"/></div>
                   <div className="text-white text-xs font-bold leading-tight">METALLIC<br/>SOFT TOUCH</div>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-full pr-4 p-1 backdrop-blur-sm">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner"><Search className="w-6 h-6 text-[#0494df]"/></div>
                   <div className="text-white text-xs font-bold leading-tight">FAST CHARGE<br/>INDICATOR</div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}

function CategoryTiles() {
  const categories = [
    { title: 'Prefilled Pod Kits', bg: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]', icon: 'bg-red-500' },
    { title: 'E-Liquids', bg: 'bg-gradient-to-br from-[#f6d365] to-[#fda085]', icon: 'bg-amber-700' },
    { title: 'Vape Kits', bg: 'bg-gradient-to-br from-[#ff0844] to-[#ffb199]', icon: 'bg-pink-600' },
    { title: 'Vape Coils', bg: 'bg-gradient-to-br from-[#30cfd0] to-[#330867]', icon: 'bg-orange-500' }
  ];

  return (
    <section className="bg-[#f2f5f8] pt-16 pb-8">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Vapestore – Online Vape Shop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
             {categories.map((cat, i) => (
                <div key={i} className="flex flex-col group cursor-pointer">
                   <div className={`w-full h-40 lg:h-48 ${cat.bg} rounded-2xl relative overflow-hidden mb-4 hover:shadow-lg transition-all duration-300`}>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-40 bg-zinc-800/10 rounded-xl shadow-xl rotate-12 blur-[1px]"></div>
                      <div className={`absolute bottom-4 right-4 w-12 h-20 ${cat.icon} rounded-md shadow-2xl rotate-6 border border-white/20`}></div>
                   </div>
                   <h3 className="text-black font-bold text-[15px]">{cat.title}</h3>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function TrendingProducts() {
  const tabs = ['Trending', 'E-liquids', 'Prefilled Pod Kits', 'Vape Kits'];
  return (
    <section className="bg-[#f2f5f8] py-12">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-black mb-6 tracking-tight">Trending Vape Products</h2>
          
          <div className="flex items-center justify-between border-b border-zinc-300 pb-0 mb-8">
             <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                {tabs.map((tab, i) => (
                   <button key={i} className={`text-[14px] font-bold whitespace-nowrap px-1 pb-4 border-b-[3px] transition-colors ${i === 0 ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'}`}>
                      {tab}
                   </button>
                ))}
             </div>
             <div className="flex items-center gap-2 hidden md:flex pb-3">
                <button className="w-9 h-9 rounded bg-[#dcfce7] border border-green-200 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"><ChevronLeft className="w-5 h-5 stroke-[2]"/></button>
                <button className="w-9 h-9 rounded bg-[#dcfce7] border border-green-200 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"><ChevronRight className="w-5 h-5 stroke-[2]"/></button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {[
               { badge: '4 for £10', badgeColor: 'bg-[#3b4b9b]', isNew: true, title: 'Vampire Vape MAX Blueberry Sour Raspberry Nic Salt E-Liquid 10ml', desc: 'An intensely sweet and tangy blend combining rich Blueberry with a sharp, electrifying Sour...', rating: 5.0 },
               { badge: '2 for £10', badgeColor: 'bg-[#d84ed2]', isNew: false, title: 'Avomi CLIQ Mini Prefilled Pod Vape Kit', desc: 'Choose From 14 Flavours. Compact prefilled pod kit featuring a smart 2ml pod + 4...', rating: 4.7 },
               { badge: '4 for £10', badgeColor: 'bg-[#98a6eb]', isNew: true, title: 'DojoLiq Apple Pear 10ml Nic Salt E-Liquid by Vaporesso', desc: 'A crisp and refreshing fruit mix blending sweet Apple and juicy Pear, delivering an authentic...', rating: 0 },
               { badge: 'Kit + 3 x E-Liquids', badgeColor: 'bg-[#d84ed2]', isNew: false, title: 'Vaporesso Xros 5 Pod Vape Kit', desc: 'Feature-rich MTL & RDL pod vape kit with 1500mAh battery, 0.88" HD screen, adjustable...', rating: 4.5 },
               { badge: 'From £2.75 per Can', badgeColor: 'bg-[#a75dc8]', isNew: false, title: 'Nordic Spirit Spearmint Nic Pouches', desc: 'A light, herbal Mint flavour with gentle sweetness. Available in 6mg, 9mg and 11mg strengths.', rating: 5.0 }
             ].map((product, i) => (
                <div key={i} className="bg-white rounded-xl border border-zinc-200 flex flex-col overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow h-[430px]">
                   <div className={`w-full py-2 text-center text-white text-[11px] font-bold tracking-wider ${product.badgeColor}`}>{product.badge}</div>
                   
                   <div className="p-5 relative flex-1 flex flex-col">
                      {product.isNew && (
                         <div className="absolute top-4 left-4 border border-[#3b4b9b] text-[#3b4b9b] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">New</div>
                      )}
                      
                      <div className="w-full h-36 bg-transparent flex items-center justify-center mb-6">
                         {/* Placeholder product image */}
                         <div className="w-20 h-32 bg-zinc-100 rounded-lg shadow-inner border border-zinc-200"></div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-1 text-[9px] text-zinc-500 border border-zinc-200 px-1.5 py-0.5 rounded font-bold uppercase">
                            MTL/RDL <Info className="w-3 h-3"/>
                         </div>
                         {product.rating > 0 &&(
                         <div className="flex items-center gap-1 text-xs font-bold text-zinc-700">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400"/> {product.rating}
                         </div>
                         )}
                      </div>

                      <h4 className="text-[14px] font-bold text-black leading-snug mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">{product.title}</h4>
                      <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-3 mb-4">{product.desc}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function PopularBrandsCarousel() {
  const brands = ['AVOMI', 'VAMPIRE VAPE', 'VAPORESSO', 'ELFBAR', 'LOST MARY', 'SKE CRYSTAL', 'IVG', 'RIOT SQUAD'];
  return (
    <section className="bg-white py-8 border-y border-zinc-200 overflow-hidden">
       <div className="w-full flex items-center relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="flex items-center animate-marquee whitespace-nowrap py-2">
             {/* Use 6 copies so 50% translation equals exactly 3 copies (seamless loop) */}
             {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, i) => (
                <div key={i} className="text-2xl lg:text-3xl font-black text-zinc-300 hover:text-[#0494df] transition-colors cursor-pointer shrink-0 italic tracking-tighter hover:scale-105 transform pr-16 lg:pr-24">
                  {brand}
                </div>
             ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
       </div>
    </section>
  )
}

function InfoSection() {
  const links = [
    { text: 'Easy-to-use kits with prefilled pods. Pair with your favourite compatible refill pod flavours for a flexible alternative to disposable vapes.' },
    { text: 'Explore our large range of premium vape e-liquids and find your favourite. We offer a huge variety of flavours in different strengths.' },
    { text: 'We offer vape kits, from sub ohm, to pen and pod kits with free e-liquids, for both beginners and advanced vapers from popular brands.' },
    { text: 'Replacement vape coils from leading brands, to maintain a high-quality vaping experience and ensure your e-liquids taste their best.' }
  ];

  return (
    <section className="bg-white pt-16 pb-8">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 mb-16 border-b border-zinc-100 pb-16">
             {links.map((link, i) => (
                <div key={i} className="flex flex-col">
                   <p className="text-[13.5px] text-zinc-600 leading-relaxed mb-4">{link.text}</p>
                   <a href="#" className="text-black font-bold text-sm flex items-center gap-1 hover:underline group">Shop Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></a>
                </div>
             ))}
          </div>

          <div>
             <h2 className="text-2xl font-bold text-black mb-5 tracking-tight">Your Trusted Source for All Vaping Needs</h2>
             <p className="text-[14px] text-zinc-700 leading-relaxed max-w-5xl">
               Welcome to Vapestore, one of the UK's most popular online vape shops. As a trusted vape supplier, we offer everything a beginner or experienced vaper could possibly need, from <a href="#" className="underline hover:text-blue-600">Vape Kits</a> to Vape Pens, Vape Mods, Vape Pods, <a href="#" className="underline hover:text-blue-600">Prefilled Pod Vape Kits</a>, <a href="#" className="underline hover:text-blue-600">Vape Coils</a>, Tanks and an extensive range of premium quality <a href="#" className="underline hover:text-blue-600">E-liquids</a> from the most popular brands, at the best prices. We provide promotional and <a href="#" className="underline hover:text-blue-600">multi-buy deals</a> to help you mix and match your flavours at minimal cost.
             </p>
          </div>
       </div>
    </section>
  )
}

function PromoGrid() {
  return (
    <section className="bg-white py-16 lg:py-24">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:h-[450px]">
             {/* Left Banner */}
             <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] relative overflow-hidden flex items-end p-8 cursor-pointer hover:opacity-95 transition-opacity h-80 lg:h-auto shadow-sm">
                <div className="absolute top-1/4 -right-12 w-64 h-64 bg-white/20 rounded-full blur-[40px]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wLDUwIEMzMCw0MCA2MCw2MCAxMDAsNTAiIHN0cm9rZT0NCiIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] opacity-10 bg-cover"></div>
                
                <h3 className="text-white text-4xl font-black relative z-10 tracking-widest uppercase mb-12">ELFBAR</h3>
                {/* Simulated product images */}
                <div className="absolute bottom-4 right-4 flex gap-1 items-end">
                   <div className="w-8 h-40 bg-zinc-800 rounded-md border-t-4 border-emerald-400 border-l border-white/10"></div>
                   <div className="w-8 h-44 bg-zinc-800 rounded-md border-t-4 border-purple-400 shadow-2xl z-10 border-l border-white/10"></div>
                   <div className="w-8 h-36 bg-zinc-800 rounded-md border-t-4 border-pink-400 border-l border-white/10"></div>
                   <div className="w-8 h-32 bg-zinc-800 rounded-md border-t-4 border-sky-400 border-l border-white/10"></div>
                </div>
             </div>

             {/* Right Column */}
             <div className="md:col-span-2 grid grid-rows-2 gap-6">
                <div className="rounded-2xl bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] relative overflow-hidden flex items-center p-8 cursor-pointer hover:opacity-95 transition-opacity shadow-sm">
                   <div className="flex flex-col z-20">
                      <h4 className="text-white font-bold text-2xl lg:text-3xl mb-3 w-3/4 leading-tight">NEW Elf Bar Plus 12 Pod Kit</h4>
                      <p className="text-blue-700 bg-white/95 font-bold text-[11px] uppercase tracking-wide px-3 py-1.5 rounded w-max mb-6">2ml & 8ml pods included</p>
                      <button className="bg-transparent border border-white/50 text-white font-bold px-6 py-2.5 rounded shadow-sm hover:bg-white/10 transition-colors w-max text-sm">2 for £9.95</button>
                   </div>
                   <div className="absolute top-6 right-[40%] bg-[#4ade80] text-black font-bold text-[10px] px-3 py-1.5 rounded z-30 shadow-md">15 Flavours</div>
                   
                   <div className="absolute -bottom-8 right-0 flex gap-2 z-20 px-8">
                      <div className="w-10 h-32 bg-pink-500 rounded-lg shadow-xl border-t border-white/30"></div>
                      <div className="w-10 h-36 bg-red-500 rounded-lg shadow-2xl border-t border-white/30 z-10 scale-110 -translate-y-2"></div>
                      <div className="w-10 h-32 bg-blue-500 rounded-lg shadow-xl border-t border-white/30"></div>
                      <div className="w-10 h-28 bg-yellow-400 rounded-lg shadow-xl border-t border-white/30"></div>
                   </div>
                   <div className="absolute right-0 top-0 w-72 h-full bg-white/20 blur-[50px] z-10"></div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="rounded-2xl bg-[#3b82f6] p-6 relative flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-95 transition-opacity h-48 lg:h-auto shadow-sm">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-blue-600"></div>
                      <div className="absolute -bottom-6 right-1/4 w-16 h-40 bg-gradient-to-t from-red-600 to-red-400 rounded-xl rotate-12 shadow-2xl z-20 border border-white/20"></div>
                      <div className="absolute top-1/4 left-1/4 w-14 h-36 bg-gradient-to-t from-lime-600 to-lime-400 rounded-xl -rotate-12 shadow-2xl z-10 border border-white/20"></div>
                   </div>

                   <div className="rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-6 lg:p-8 relative flex flex-col justify-end overflow-hidden cursor-pointer hover:opacity-95 transition-opacity h-48 lg:h-auto shadow-sm">
                      <h4 className="text-white font-bold text-xl lg:text-[22px] mb-1 relative z-20 leading-tight w-2/3">Nordic Spirit Nicotine</h4>
                      <div className="absolute top-4 right-4 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex flex-col items-center justify-center text-white text-[10px] lg:text-[13px] font-black text-center border-[5px] border-white shadow-2xl skew-y-6 z-20 tracking-wide">
                         NORDIC<br/>SPIRIT<p className="font-bold text-[7px] tracking-widest mt-1 text-white/90">VOTED PRODUCT</p>
                      </div>
                      <div className="absolute top-6 left-6 bg-[#6366f1] text-white text-[10px] font-bold px-3 py-1.5 rounded shadow-lg z-30 uppercase tracking-wide">New Flavours<br/>Available</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="bg-[#0b1016] py-12 lg:py-20">
       <div className="max-w-[1062px] px-4 mx-auto flex justify-between gap-10">
          
          <div className="text-white text-center md:text-left flex flex-col gap-[33px] max-w-[664px] py-9 w-full relative z-10">
             <div>
                <h2 className="text-[#91f974] text-[26px] md:text-[28px] font-bold mb-3 tracking-tight">
                  Subscribe to our newsletter!
                </h2>
                <p className="text-white text-[15px] font-medium leading-relaxed">
                  Be the first to hear about all of our exciting new arrivals, offers, deals and more!
                </p>
             </div>
             
             <div>
                <form className="flex flex-col md:flex-row md:items-center md:gap-2 mb-4 rounded-lg md:bg-[#222e36] md:p-[5px] relative">
                   <div className="relative w-full mb-3 md:mb-0">
                      <svg className="absolute -translate-y-1/2 left-4 top-1/2 text-black" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3333 12.5L9.90474 8.49996M6.09522 8.49996L1.66667 12.5M1.33331 5.16663L6.77659 8.97692C7.21737 9.28547 7.43776 9.43974 7.67749 9.4995C7.88924 9.55228 8.11072 9.55228 8.32247 9.4995C8.5622 9.43974 8.78259 9.28547 9.22337 8.97692L14.6666 5.16663M4.53331 13.8333H11.4666C12.5868 13.8333 13.1468 13.8333 13.5746 13.6153C13.951 13.4236 14.2569 13.1176 14.4487 12.7413C14.6666 12.3135 14.6666 11.7534 14.6666 10.6333V6.36663C14.6666 5.24652 14.6666 4.68647 14.4487 4.25865C14.2569 3.88232 13.951 3.57636 13.5746 3.38461C13.1468 3.16663 12.5868 3.16663 11.4666 3.16663H4.53331C3.41321 3.16663 2.85316 3.16663 2.42533 3.38461C2.04901 3.57636 1.74305 3.88232 1.5513 4.25865C1.33331 4.68647 1.33331 5.24652 1.33331 6.36663V10.6333C1.33331 11.7534 1.33331 12.3135 1.5513 12.7413C1.74305 13.1176 2.04901 13.4236 2.42533 13.6153C2.85316 13.8333 3.41321 13.8333 4.53331 13.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <input type="email" placeholder="Email address" className="w-full block py-1 pr-1 pl-10 h-[46px] rounded-lg border border-[#e6e7e8] text-black placeholder:text-zinc-500 text-[14px] outline-none" />
                   </div>
                   <button type="button" className="bg-white hover:bg-zinc-200 cursor-pointer text-black text-[13px] hidden md:block border border-black py-0.5 px-6 md:absolute right-1.5 rounded-lg md:rounded top-1/2 md:-translate-y-1/2 h-10 md:h-[calc(100%-12px)] font-bold transition-colors">Sign Me Up</button>
                   <div className="p-1 rounded-lg md:hidden bg-[#222e36]">
                      <button type="button" className="bg-white text-[13px] text-black w-full block border border-black py-0.5 px-4 rounded-lg h-10 font-bold">Sign Me Up</button>
                   </div>
                </form>

                <p className="text-[12px] text-white/80 leading-relaxed font-medium">
                  Sign me up for marketing emails from Vapestore. It's optional & you can <a href="#" className="text-[#91f974] hover:underline">unsubscribe</a> anytime.
                  <br className="hidden md:block" /> See our <a href="#" className="text-[#91f974] hover:underline">Terms & Conditions</a>, <a href="#" className="text-[#91f974] hover:underline">Privacy Policy</a>, and <a href="#" className="text-[#91f974] hover:underline">Direct Marketing Policy</a>.
                </p>
             </div>
          </div>
          
          <div className="hidden md:flex h-[288px] w-[398px] relative shrink-0 mt-5 items-end justify-center">
             <div className="relative w-full h-full flex items-end justify-center">
                <div className="absolute right-16 bottom-0 w-20 h-56 bg-[#2a3028] rounded-t-xl rounded-b-md border-b-[8px] border-yellow-500 shadow-2xl relative translate-x-12 -rotate-12 z-0 overflow-hidden">
                  <div className="absolute top-1/3 w-full border-t-[8px] border-[#384235]"></div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-16 bg-black/40 rounded-md"></div>
                </div>
                <div className="w-24 h-72 bg-[#1b231c] rounded-t-xl rounded-b-md border-b-[10px] border-yellow-500 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-12 relative overflow-hidden">
                  <div className="absolute top-1/4 w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-20"></div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-black text-[#5df33d] rotate-90 tracking-widest opacity-80 text-xl whitespace-nowrap drop-shadow-[0_0_8px_rgba(93,243,61,0.8)]">DRIP SALT</div>
                </div>
             </div>
          </div>
          
       </div>
    </section>
  )
}

function ReviewsCarousel() {
  const reviews = [
    { date: 'May 2026', title: '"I\'ve never had a bad experience with this company, and I\'ve been using them for years. They have a great selection of vapes, e-liquids, vaping accessories, etc, and they..."', author: 'Adam' },
    { date: 'April 2026', title: '"Amazing company never had any issues. You can also choose which delivery to go with i personally always choose tracked with royal mail and i receive my order quickly..."', author: 'Nicky' },
    { date: 'May 2026', title: '"Reliable and helpful. Been using them for about eight years and only had a problem once when a delivery did not arrive. No dramas or arguing, a replacement batch..."', author: 'Paul' },
    { date: 'May 2026', title: '"Great selection great prices very quick delivery even on free postage when you spend more than £20 or more great loyalty points easy to redeem the only vape store I shop at 👍👍"', author: 'Andrew' }
  ];

  return (
    <section className="bg-white py-16 border-b border-zinc-200">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
             <h2 className="text-[26px] font-bold text-black tracking-tight">Latest Vapestore Reviews</h2>
             <div className="flex items-center gap-2 text-[14px] text-zinc-600">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500"/>
                <span>Rated <strong className="text-black">{'\'Excellent\''}</strong> by <strong className="text-black">15,600+</strong> happy customers on TrustPilot</span>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 relative">
             <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-50 z-10 shadow-lg hidden md:flex">
                <ChevronRight className="w-6 h-6 text-zinc-600 stroke-[1.5]"/>
             </button>
             
             {reviews.map((r, i) => (
                <div key={i} className="border border-zinc-200 rounded-[20px] p-8 flex flex-col min-h-[320px] hover:shadow-xl transition-shadow bg-white cursor-pointer">
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[13px] text-zinc-400 font-medium">{r.date}</span>
                      <div className="flex items-center gap-0.5 font-bold text-sm text-black">5.0 <Star className="w-4 h-4 fill-amber-500 text-amber-500 ml-1"/></div>
                   </div>
                   <p className="text-[14px] font-bold text-black mb-8 flex-1 leading-relaxed">
                     {r.title}
                   </p>
                   <div>
                      <div className="text-black font-bold text-[15px] mb-1.5">{r.author}</div>
                      <div className="flex items-center gap-1.5 text-[12px] text-green-600 font-medium"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Verified Customer</div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function NewsAndFaqs() {
  const posts = [
    { bg: 'bg-gradient-to-br from-orange-400 to-orange-600', title: 'Introducing the NEW Avomi Pro Prefilled Pod Kit', date: 'Yesterday', text: 'Finding a straightforward, highly capable daily vape does not need to be a complex process. The...', tags: ['Avomi', 'Prefilled Pod Kit'] },
    { bg: 'bg-gradient-to-br from-[#0f172a] to-[#334155]', title: 'Introducing the NEW Vaporesso Vibe SE 2 Pod Vape Kit', date: '3 weeks ago', text: 'Get a hands-on look at the new Vaporesso Vibe SE 2 Pod Vape Kit. Discover how the 1400mAh...', tags: ['Featured', 'Prefilled Pod Kit', 'Vaporesso'] },
    { bg: 'bg-[#0f172a]', title: 'Introducing Vampire Vape MAX: A New Era of Vibrant Nic Salts', date: '2 months ago', text: 'Discover the new Vampire Vape MAX Nic Salts collection featuring sweeter, bolder takes on iconic classics...', tags: ['Featured', 'Nic Salts', 'Vampire Vape'] },
    { bg: 'bg-gradient-to-br from-pink-500 to-rose-600', title: 'Avomi CLIQ Mini Review: Is 6ml the New Sweet Spot for "Big Puff" vapes?', date: '4 months ago', text: 'We go hands-on with the new Avomi CLIQ Mini Prefilled Pod Kit to see if this...', tags: ['Avomi', 'Prefilled Pod Kit'] }
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <h2 className="text-[26px] font-bold text-black mb-8 tracking-tight">Latest Vape News: Expert Tips & Advice</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
             {posts.map((post, i) => (
                <div key={i} className="border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow bg-white flex flex-col group cursor-pointer">
                   <div className={`h-40 ${post.bg} relative p-4 flex items-start overflow-hidden`}>
                      <div className="bg-zinc-900 text-[#4ade80] text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded relative z-10 border border-green-800/50 shadow-md">New Vaping And E-Cig Products</div>
                      <div className="absolute -bottom-8 -right-8 w-40 h-32 bg-white/20 blur-[30px] rounded-full"></div>
                      <div className="absolute right-6 bottom-4 w-12 h-20 bg-black/30 rounded-lg shadow-2xl rotate-12 backdrop-blur-md border border-white/20"></div>
                   </div>
                   <div className="p-6 flex-1 flex flex-col">
                      <div className="text-zinc-500 text-[12px] font-medium mb-3">{post.date}</div>
                      <h3 className="text-[16px] font-bold text-black mb-3 leading-snug group-hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-[13.5px] text-zinc-600 line-clamp-3 mb-6 flex-1 leading-relaxed">{post.text}</p>
                      <div className="flex flex-wrap gap-2">
                         {post.tags.map(tag => (
                            <span key={tag} className="border border-zinc-200 text-black font-semibold text-[11px] px-2.5 py-1.5 rounded-md flex items-center gap-1 hover:bg-zinc-50 transition-colors">
                               {tag} <ChevronRight className="w-3 h-3 text-zinc-400"/>
                            </span>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-8">
             <h2 className="text-[22px] font-bold text-black">FAQs</h2>
             <a href="#" className="font-bold text-[15px] text-black hover:underline flex items-center gap-1 group">Got a question? Contact Us <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl">
             <div className="flex flex-col border-b border-zinc-100 pb-6">
                <div className="flex items-center justify-between w-full font-bold text-[15px] text-black mb-3 cursor-pointer group">
                   How is Vaping an Alternative to Smoking? <span className="text-2xl leading-none text-zinc-400 group-hover:text-black transition-colors font-normal">+</span>
                </div>
                <p className="text-[14px] text-zinc-600 leading-relaxed font-medium">Vaping offers an alternative way to address the nicotine cravings associated with tobacco consumption without the numerous harmful chemicals present in traditional cigarettes. For individuals new to vaping, pen-style kits are recommended...</p>
             </div>
             <div className="flex flex-col border-b border-zinc-100 pb-6">
                <div className="flex items-center justify-between w-full font-bold text-[15px] text-black mb-3 cursor-pointer group">
                   Which Nicotine Strength is Right For Me? <span className="text-2xl leading-none text-zinc-400 group-hover:text-black transition-colors font-normal">+</span>
                </div>
                <p className="text-[14px] text-zinc-600 leading-relaxed font-medium">We recommend that the nicotine strength you choose should be largely based on the amount of cigarettes you previously smoked per day. For those that smoked 20+ cigarettes a day, we advise a stronger nicotine strength such as 18mg...</p>
             </div>
          </div>
       </div>
    </section>
  )
}


export default function App() {
  return (
    <>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
        display: flex;
        width: max-content;
      }
    `}</style>
    <div className="min-h-screen font-sans bg-white text-zinc-900 flex flex-col">
      <div className="flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 flex flex-col">
          <Hero />
          <CategoryTiles />
          <TrendingProducts />
          <PopularBrandsCarousel />
          <InfoSection />
          <PromoGrid />
          <Newsletter />
          <ReviewsCarousel />
          <NewsAndFaqs />
        </main>
        
        <footer className="bg-zinc-900 py-12 text-zinc-400 text-xs text-center border-t border-zinc-800">
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col items-center gap-4">
             <div className="text-2xl font-black text-white italic tracking-tighter opacity-50">UKVAPESTORE</div>
             <p>&copy; {new Date().getFullYear()} UK Vape Store. All rights reserved.</p>
           </div>
        </footer>

         {/* 88vape floating rewards button */}
        <div className="fixed bottom-6 right-6 flex items-end gap-2 z-50">
           <button className="bg-[#f42e31] px-5 py-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors text-white gap-2 font-bold text-sm">
              <Star className="w-5 h-5 fill-white text-white"/> Rewards
           </button>
        </div>
      </div>
    </div>
    </>
  );
}