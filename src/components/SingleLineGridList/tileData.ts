const tileData = [
  {
    id: 1,
    name: 'Starbucks',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Offer goes for more than just doctors and nurses — police officers, firefighters, paramedics and other hospital or medical staffers are also eligible',
    notes:
      'Free tall hot or iced coffee to all health care workers through May 3',
    lat: '',
    lng: '',
    address: '',
    category: 'coffee',
    imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    distance: 2.2
  },
  {
    id: 2,
    name: 'Sweetgreen',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Free delivery of salads and bowls to NYC hospitals,Free lunch for hospitals and health facilities',
    notes: '',
    lat: '',
    lng: '',
    address: '',
    category: 'Food',
    imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png'
  },
  {
    id: 3,
    name: 'Krispy Kreme',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Free donuts on Mondays through May 11 to anyone who works in the medical sector who shows up with their employee badge.',
    'notes:':
      'Workets can go back for more each week, or even in the same day.',
    lat: '',
    lng: '',
    address: '',
    category: 'Food',
    imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png'
  },
  {
    id: 4,
    name: 'Four Seasons Hotel',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Free',
    dealDesc: 'Free rooms to frontline workers through April 15',
    notes:
      'The Four Seasons Hotel in Manhattan will provide free rooms to doctors, nurses and other medical personnel.',
    lat: 40.7376159,
    lng: -74.025165,
    address: '57 E 57th St, New York, NY 10022',
    category: 'Services',
    imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'
  },
  {
    id: 5,
    name: '&pizza',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Free',
    dealDesc: 'Hospital workers are invited to stop by &pizza for a free pizza',
    notes:
      "Show your hospital ID. If you're too busy to leave work, &Pizza will deliver it. Just text 200-03 #HERO",
    lat: 40.74526,
    lng: -73.98811,
    address: '15 W 28th St, New York, NY 10001',
    category: 'Food',
    imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png'
  },
  {
    id: 6,
    name: 'Crocs',
    dealName: '100% Amazing Deal',
    offer: 'Local',
    dealDesc: 'Free',
    notes:
      'Free pair of crocs for all healthcare workers,Healthcare workers can choose from Crocs Classic Clogs and Crocs At Work styles while supplies last',
    lat: 40.7569897,
    lng: -73.8576051,
    address: '152 W 34th St, New York, NY 10120',
    category: 'Other',
    imgUrl: ''
  },
  {
    id: 7,
    name: 'Hertz',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Discount',
    dealDesc: 'Hertz is offering free month-long car rentals through April 30',
    notes:
      "Cars can be booked for as short as a week and up to a month. To redeem, customers will need a valid medical ID, email address with healthcare domain and driver's license.",
    lat: 40.740769,
    lng: -73.986489,
    address: '403 Lafayette St, New York, NY 10003',
    category: 'Services',
    imgUrl: ''
  },
  {
    id: 8,
    name: 'Casa Organic Dry Cleaners',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Discount',
    dealDesc:
      'Casa Organic is offering all healthcare and frontline workers 50% off of laundry services for their uniforms',
    notes: 'Offer ends May 30, 2020',
    lat: 40.7431327,
    lng: -74.0105148,
    address: '155 W 21st St, New York, NY 10011',
    category: 'Services',
    imgUrl: ''
  },
  {
    id: 9,
    name: 'Bubbleology',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Discount',
    dealDesc: '50% off of all drinks for emergency service workers',
    notes: 'All drinks are discounted through April, 2020',
    lat: 40.7270286,
    lng: 73.9854043,
    address: '120 1/2 1st Avenue, New York, NY 10009',
    category: 'Food',
    imgUrl: ''
  },
  {
    id: 10,
    name: 'Paris Baguette',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'All Manhattan locations will give free coffee to all hospital workers, first responders, the NYPD, and FDNY. ',
    notes: 'This deal will be offered throughout the COVID-19 pandemic',
    lat: '',
    lng: '',
    address: '',
    category: 'Coffee',
    imgUrl: ''
  },
  {
    id: 11,
    name: 'Melt Shop',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'Melt Shop is offering a free sandwich for takeout to any hospital worker.',
    notes: '',
    lat: 40.7608163,
    lng: 73.9823423,
    address: '135 W 50th St, New York, NY 10019',
    category: 'Food',
    imgUrl: ''
  },
  {
    id: 12,
    name: 'All Birds',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Free',
    dealDesc: 'Free pair of wool or tree runners for all frontline workers',
    notes: 'This offer ends on June 15, 2020',
    lat: 40.7226354,
    lng: -73.9998318,
    address: '73 Spring St, New York, NY 10012',
    category: 'Other',
    imgUrl: ''
  },
  {
    id: 13,
    name: 'Tropical Smoothie Cafe',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Tropical Smoothie Cafe is donating 100,000 smoothies in NYC to local healthcare workers and first responders.',
    notes: '',
    lat: '',
    lng: '',
    address: '',
    category: 'Food',
    imgUrl: ''
  },
  {
    id: 14,
    name: 'Room Mate Grace Hotel',
    dealName: '100% Amazing Deal',
    type: 'Local',
    offer: 'Free',
    dealDesc:
      'The hotel is providing its facility to serve as free housing for nurses, doctors, and medical personnel.',
    notes: '',
    lat: 40.7574482,
    lng: -73.9860246,
    address: '125 W 45th St, New York, NY 10036',
    category: 'Services',
    imgUrl: ''
  },
  {
    id: 15,
    name: 'CitiBike',
    dealName: '100% Amazing Deal',
    type: 'Chain',
    offer: 'Free',
    dealDesc:
      'Free month of CitiBike service, Citi Bike launched its Critical Workforce Membership Program, which provides the first-responder, healthcare, and transit workforce with a free month of Citi Bike membership.',
    notes: '',
    lat: '',
    lng: '',
    address: '',
    category: 'Services',
    imgUrl: ''
  }
];

export default tileData;
