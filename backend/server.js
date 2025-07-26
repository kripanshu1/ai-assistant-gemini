const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for animations
const sampleData = {
  hero: {
    title: "Welcome to Our Animated Website",
    subtitle: "Experience smooth animations and beautiful design",
    description: "Built with modern libraries and cutting-edge animation technologies"
  },
  features: [
    {
      id: 1,
      title: "Smooth Animations",
      description: "Framer Motion powered animations for seamless user experience",
      icon: "✨"
    },
    {
      id: 2,
      title: "Lottie Integration",
      description: "Beautiful Lottie animations for enhanced visual appeal",
      icon: "🎨"
    },
    {
      id: 3,
      title: "Responsive Design",
      description: "Perfectly optimized for all devices and screen sizes",
      icon: "📱"
    },
    {
      id: 4,
      title: "Modern Stack",
      description: "Built with React, Node.js, and the latest web technologies",
      icon: "🚀"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "John Doe",
      role: "Web Developer",
      message: "Amazing animations and smooth user experience!",
      rating: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX Designer",
      message: "Beautiful design with perfect animation timing.",
      rating: 5
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Product Manager",
      message: "This website sets a new standard for modern web design.",
      rating: 5
    }
  ]
};

// Routes
// Base API route
app.get('/api', (req, res) => {
  res.json({
    message: '🚀 AnimatedSite API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api/health': 'Server health check',
      'GET /api/hero': 'Hero section data',
      'GET /api/features': 'Features section data', 
      'GET /api/testimonials': 'Testimonials data',
      'POST /api/contact': 'Contact form submission'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hero', (req, res) => {
  res.json(sampleData.hero);
});

app.get('/api/features', (req, res) => {
  res.json(sampleData.features);
});

app.get('/api/testimonials', (req, res) => {
  res.json(sampleData.testimonials);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // In a real application, you would save this to a database
  console.log('Contact form submission:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Thank you for your message! We will get back to you soon.',
    data: { name, email, message }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
