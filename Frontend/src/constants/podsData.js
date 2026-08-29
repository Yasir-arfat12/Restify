export const podsData = [
  {
    id: 1,
    name: 'Luxury Sleep Pod Bengaluru',
    location: 'Whitefield, Bangalore',
    rating: 4.5,
    reviews: 128,
    price: 499,
    oldPrice: 1499,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    amenities: ['149-per/hr', '349-3/hr', '499-6/hr', '999-per/hr'],
  },
  {
    id: 2,
    name: 'Premium Nap Pod Hyderabad',
    location: 'Hitech City, Hyderabad',
    rating: 4.2,
    reviews: 96,
    price: 599,
    oldPrice: 1299,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    amenities: ['Blanket', 'WiFi', 'Air Purifier', 'Power Backup'],
  },
  {
    id: 3,
    name: 'Airport Sleep Pod Chennai',
    location: 'Kilacheri, Chennai',
    rating: 4.7,
    reviews: 221,
    price: 799,
    oldPrice: 1899,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    amenities: ['Reception', 'Free WiFi', 'Geyser', '24/7 Access'],
  },
  {
    id: 4,
    name: 'Premium Nap Pod Hyderabad',
    location: 'Hitech City, Hyderabad',
    rating: 4.2,
    reviews: 96,
    price: 599,
    oldPrice: 1299,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    amenities: ['Blanket', 'WiFi', 'Air Purifier', 'Power Backup'],
  },
];

export const podDetails = {
  address: `22/A, Airport Tech Park Road,
Near Kempegowda Metro Station,
Whitefield, Bangalore,
Karnataka 560048`,

  amenities: [
    'Safe Lockers',
    'Separate Men Washroom',
    'Separate Ladies Washroom',
    'Free WiFi',
    'Charging Ports',
    'Air Conditioning',
    'Smart Lighting',
    '24/7 Security',
  ],

  pricing: [
    { duration: '1 Hour', price: '₹149' },
    { duration: '3 Hours', price: '₹299' },
    { duration: '6 Hours', price: '₹499' },
    { duration: '12 Hours', price: '₹799' },
  ],
};

export const SERVICE_TAX = 10;

export const parsePrice = (priceStr) =>
  parseInt(priceStr.replace('₹', ''), 10);

export const OrderDetails = [
  {
    id: 1,
    OrderId: 'RST-2401',
    OrderAdress: 'Whitefield, Bangalore',
    isPaid: 'Paid',
    CreatedAt: '14 May 2026',
    Image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    OrderId: 'RST-2402',
    OrderAdress: 'Hitech City, Hyderabad',
    isPaid: 'Pending',
    CreatedAt: '12 May 2026',
    Image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
  },
];

export const FEATURES = [
  {
    icon: 'clock',
    title: 'Hourly Stays',
    description: 'Book for just a few hours when you need a break',
  },
  {
    icon: 'snowflake',
    title: 'AC Pods',
    description: 'Climate-controlled comfort year round',
  },
  {
    icon: 'wifi',
    title: 'Free WiFi',
    description: 'Stay connected during your rest',
  },
  {
    icon: 'lock',
    title: 'Secure Lockers',
    description: 'Safe storage for your belongings',
  },
  {
    icon: 'navigation',
    title: '24×7 Access',
    description: 'Rest anytime, day or night',
  },
];
