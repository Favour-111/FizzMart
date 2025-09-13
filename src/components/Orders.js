const orders = [
  {
    id: 1,
    fullName: "John Doe",
    phoneNumbers: ["+2348012345678", "+2348098765432"],
    address: {
      street: "123 Main Street",
      city: "Lagos",
      state: "Lagos State",
      country: "Nigeria",
      zip: "100001",
    },
    products: [
      { name: "Wireless Headphones", quantity: 1, price: 25000 },
      { name: "Laptop Bag", quantity: 2, price: 15000 },
    ],
    orderStatus: "cancelled",
    shipping: 4000,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    phoneNumbers: ["+2348023456789", "+2348087654321"],
    address: {
      street: "45 Adeola Odeku",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      zip: "900001",
    },
    products: [
      { name: "Smartphone", quantity: 1, price: 120000 },
      { name: "Screen Protector", quantity: 3, price: 2000 },
    ],
    orderStatus: "shipped",
    shipping: 3200,
  },
  // {
  //   id: 3,
  //   fullName: "Michael Johnson",
  //   phoneNumbers: ["+2348031234567", "+2348091234567"],
  //   address: {
  //     street: "12 Herbert Macaulay Way",
  //     city: "Ibadan",
  //     state: "Oyo State",
  //     country: "Nigeria",
  //     zip: "200001",
  //   },
  //   products: [
  //     { name: "Bluetooth Speaker", quantity: 2, price: 18000 },
  //     { name: "USB-C Charger", quantity: 1, price: 5000 },
  //   ],
  //   orderStatus: "shipping",
  // },
  {
    id: 4,
    fullName: "Aisha Bello",
    phoneNumbers: ["+2348056781234", "+2348076543210"],
    address: {
      street: "78 Allen Avenue",
      city: "Kano",
      state: "Kano State",
      country: "Nigeria",
      zip: "700001",
    },
    products: [
      { name: "Air Conditioner", quantity: 1, price: 180000 },
      { name: "Extension Cord", quantity: 2, price: 7000 },
    ],
    orderStatus: "cancelled",
    shipping: 4390,
  },
];

module.exports = orders;
