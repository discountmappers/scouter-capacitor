const tileData = [
  {
    name: 'Starbucks',
    dealName: 'Free Starbucks Coffee',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Free tall hot or iced coffee to all health care workers through May 3',
    notes:
      'Offer goes for more than just doctors and nurses‚ police officers, firefighters, paramedics and other hospital or medical staffers are also eligible',
    lat: null,
    lng: null,
    address: '',
    category: 'Coffee',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
  },
  {
    name: 'Sweetgreen',
    dealName: 'Free Salad Delivery',
    type: 'Chain',
    offer: 'Free',
    dealDesc: 'Free delivery of salads and bowls to NYC hospitals',
    notes: 'Free lunch for hospitals and health facilities',
    lat: null,
    lng: null,
    address: '',
    category: 'Food',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png'
  },
  {
    name: 'Krispy Kreme',
    dealName: 'Free Donut Mondays',
    type: 'Chain',
    offer: 'Free',
    dealDesc: 'Free dozen donuts on Mondays',
    notes:
      'Free donuts on Mondays through May 11 to anyone who works in the medical sector who shows up with their employee badge. Workets can go back for more each week, or even in the same day.',
    lat: null,
    lng: null,
    address: '',
    category: 'Food',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'
  },
  {
    name: 'Four Seasons Hotel',
    dealName: 'Free Hotel Stay',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'The Four Seasons Hotel in Manhattan will provide free rooms to doctors, nurses and other medical personnel.',
    notes: 'Free rooms to frontline workers through April 15',
    lat: 40.7376159,
    lng: -74.025165,
    address: '57 E 57th St, New York, NY 10022',
    category: 'Services',
    imageUrl: ''
  },
  {
    name: '&pizza',
    dealName: 'Free Pizza',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'Hospital workers are invited to stop by &pizza for a free pizza ',
    notes:
      "Show your hospital ID. If you're too busy to leave work, &Pizza will deliver it. Just text 200-03 #HERO",
    lat: 40.74526,
    lng: -73.98811,
    address: '15 W 28th St, New York, NY 10001',
    category: 'Food',
    imageUrl: ''
  },
  {
    name: 'Crocs',
    dealName: 'Free Crocs',
    type: 'Local',
    offer: 'Free',
    dealDesc: 'Free pair of crocs for all healthcare workers',
    notes:
      'Healthcare workers can choose from Crocs Classic Clogs and Crocs At Work styles while supplies last',
    lat: 40.7569897,
    lng: -73.8576051,
    address: '152 W 34th St, New York, NY 10120',
    category: 'Other',
    imageUrl: ''
  },
  {
    name: 'Hertz',
    dealName: 'Free Car Rental',
    type: 'Local',
    offer: '',
    dealDesc: 'Hertz is offering free month-long car rentals through April 30',
    notes:
      'Cars can be booked for as short as a week and up to a month. To redeem, customers will need a valid medical ID, email address with healthcare domain and driver‚Äôs license.',
    lat: 40.740769,
    lng: -73.986489,
    address: '403 Lafayette St, New York, NY 10003',
    category: 'Services',
    imageUrl: ''
  },
  {
    name: 'Casa Organic Dry Cleaners',
    dealName: '50% Off Laundry',
    type: 'Local',
    offer: 'Discount',
    dealDesc:
      'Casa Organic is offering all healthcare and frontline workers 50% off of laundry services for their uniforms',
    notes: 'Offer ends May 30, 2020',
    lat: 40.7431327,
    lng: -74.0105148,
    address: '155 W 21st St, New York, NY 10011',
    category: 'Services',
    imageUrl: ''
  },
  {
    name: 'Bubbleology',
    dealName: '50% Off Drinks',
    type: 'Local',
    offer: 'Discount',
    dealDesc: '50% off of all drinks for emergency service workers',
    notes: 'All drinks are discounted through April, 2020',
    lat: 40.7270286,
    lng: 73.9854043,
    address: '120 1/2 1st Avenue, New York, NY 10009',
    category: 'Food',
    imageUrl: ''
  },
  {
    name: 'Paris Baguette',
    dealName: 'Free Coffee',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'All Manhattan locations will give free coffee to all hospital workers, first responders, the NYPD, and FDNY. ',
    notes: 'This deal will be offered throughout the COVID-19 pandemic',
    lat: null,
    lng: null,
    address: '',
    category: 'Coffee',
    imageUrl: ''
  },
  {
    name: 'Melt Shop',
    dealName: 'Free Sandwich',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'Melt Shop is offering a free sandwich for takeout to any hospital worker.',
    notes: '',
    lat: 40.7608163,
    lng: 73.9823423,
    address: '135 W 50th St, New York, NY 10019',
    category: 'Food',
    imageUrl: ''
  },
  {
    name: 'All Birds',
    dealName: 'Free Shoes',
    type: 'Local',
    offer: 'Free',
    dealDesc: 'Free pair of wool or tree runners for all frontline workers',
    notes: 'This offer ends on June 15, 2020',
    lat: 40.7226354,
    lng: -73.9998318,
    address: '73 Spring St, New York, NY 10012',
    category: 'Other',
    imageUrl: ''
  },
  {
    name: 'Tropical Smoothie Cafe',
    dealName: 'Free Smoothie',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Tropical Smoothie Cafe is donating 100,000 smoothies in NYC to local healthcare workers and first responders.',
    notes: '',
    lat: null,
    lng: null,
    address: '',
    category: 'Food',
    imageUrl: ''
  },
  {
    name: 'Room Mate Grace Hotel',
    dealName: 'Free Hotel Stay',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'The hotel is providing its facility to serve as free housing for nurses, doctors, and medical personnel.',
    notes: '',
    lat: 40.7574482,
    lng: -73.9860246,
    address: '125 W 45th St, New York, NY 10036',
    category: 'Services',
    imageUrl: ''
  },
  {
    name: 'CitiBike',
    dealName: 'Free CitiBike',
    type: 'Chain',
    offer: 'Free',
    dealDesc: 'Free month of CitiBike service',
    notes:
      'Citi Bike launched its Critical Workforce Membership Program, which provides the first-responder, healthcare, and transit workforce with a free month of Citi Bike membership. ',
    lat: null,
    lng: null,
    address: '',
    category: 'Services',
    imageUrl: ''
  }
];

export default tileData;
