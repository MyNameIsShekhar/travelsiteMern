const sampleListings = [
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Cozy Apartment in the City Center",
    description: "A beautiful apartment in the heart of downtown.",
    image:
      "https://images.unsplash.com/photo-1600585153178-3b4c7a3ca6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "New York",
    country: "United States",
  },
  {
    title: "Beachfront Villa with Private Pool",
    description: "Enjoy the ultimate beachfront getaway with a private pool.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Cozy Apartment in the City Center",
    description: "A beautiful apartment in the heart of downtown.",
    image:
      "https://images.unsplash.com/photo-1600585153178-3b4c7a3ca6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "New York",
    country: "United States",
  },
  {
    title: "Beachfront Villa with Private Pool",
    description: "Enjoy the ultimate beachfront getaway with a private pool.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Modern Loft with Skyline View",
    description: "A stylish loft with breathtaking skyline views.",
    image:
      "https://images.unsplash.com/photo-1588854337236-6889c03d4b3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZnQlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Chicago",
    country: "United States",
  },
  {
    title: "Rustic Cabin in the Mountains",
    description: "Escape to a peaceful mountain retreat with stunning views.",
    image:
      "https://images.unsplash.com/photo-1590608897129-79da88c84a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW4lMjB3aXRoJTIwbW91bnRhaW4lMjB2aWV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Charming Cottage by the Lake",
    description: "A cozy lakefront cottage with serene surroundings.",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFrZXNpZGUlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1700,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Elegant Townhouse in Historic District",
    description: "A classic townhouse in a charming historic neighborhood.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG93bmhvdXNlJTIwaGlzdG9yaWMlMjBkaXN0cmljdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 3200,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Futuristic Smart Home",
    description: "A tech-savvy home with cutting-edge smart features.",
    image:
      "https://images.unsplash.com/photo-1613544693190-bc3f44ef58ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 4500,
    location: "San Francisco",
    country: "United States",
  },
];

  module.exports = { data: sampleListings };