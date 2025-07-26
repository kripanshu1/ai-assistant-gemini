# 🚀 Full-Stack Animated Website

A modern, full-stack website featuring stunning animations built with React, Node.js, Framer Motion, and Lottie animations.

## ✨ Features

- **🎭 Smooth Animations**: Powered by Framer Motion for seamless user interactions
- **🎨 Lottie Integration**: Beautiful Lottie animations for enhanced visual appeal
- **📱 Responsive Design**: Perfect on all devices and screen sizes
- **🚀 Modern Stack**: Built with React, Node.js, Express, and modern web technologies
- **💅 Styled Components**: CSS-in-JS styling for maintainable code
- **🎯 Intersection Observer**: Scroll-triggered animations
- **📡 RESTful API**: Full backend with contact form and data endpoints

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Framer Motion** - Animation library
- **Lottie React** - Lottie animation support
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Intersection Observer** - Scroll-based animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd fullstack-animated-website
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Environment**
   
   **Option 1: Using PowerShell Script (Recommended)**
   ```powershell
   .\start-dev.ps1
   ```
   
   **Option 2: Manual Start**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/hero` | Hero section data |
| GET | `/api/features` | Features section data |
| GET | `/api/testimonials` | Testimonials data |
| POST | `/api/contact` | Contact form submission |

## 🎨 Animation Features

### Framer Motion Animations
- **Page transitions** with smooth opacity and scale effects
- **Staggered animations** for lists and cards
- **Hover effects** with scale and color transitions
- **Scroll-triggered animations** using Intersection Observer
- **Custom variants** for consistent animation patterns

### Lottie Animations
- Support for Lottie JSON animations
- Custom circular animations in hero section
- Floating elements with continuous motion

### Interactive Elements
- **Navbar** with scroll-based styling changes
- **Carousel** testimonials with smooth transitions
- **Form animations** with focus states
- **Button hover effects** with subtle transformations

## 📂 Project Structure

```
fullstack-animated-website/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   └── node_modules/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── HeroSection.js
│   │   │   ├── FeaturesSection.js
│   │   │   ├── TestimonialsSection.js
│   │   │   ├── ContactSection.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── node_modules/
│
├── start-dev.ps1
└── README.md
```

## 🎯 Component Overview

### Navbar
- Fixed navigation with blur effect
- Smooth scroll to sections
- Responsive mobile menu button
- Logo with hover animations

### Hero Section
- Large title with staggered text animations
- Rotating geometric animations
- Floating background elements
- Call-to-action buttons with hover effects

### Features Section
- Grid layout with hover effects
- Icon animations on hover
- Staggered entrance animations
- Intersection Observer triggers

### Testimonials Section
- Carousel with smooth transitions
- Star ratings display
- Automatic slideshow
- Manual navigation controls

### Contact Section
- Animated form with focus states
- Real-time form validation
- Success/error message animations
- Contact information with hover effects

### Footer
- Multi-column layout
- Social media links with hover effects
- Newsletter subscription
- Responsive design

## 🔧 Customization

### Adding New Animations
1. Import Framer Motion components
2. Define animation variants
3. Apply to components with `variants` prop
4. Use `whileHover`, `whileTap` for interactions

### Modifying Styles
- Edit styled-components in each component file
- Update global styles in `App.css`
- Modify color schemes in gradient definitions

### Adding API Endpoints
1. Add new routes in `backend/server.js`
2. Update frontend components to fetch data
3. Handle loading and error states

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
- Ensure backend CORS is configured correctly
- Check API URLs in frontend components
- Verify both servers are running

## 📝 Development Tips

1. **Use React DevTools** for debugging components
2. **Chrome DevTools** for performance monitoring
3. **Test animations** on different devices and browsers
4. **Optimize images** for better performance
5. **Use environment variables** for API URLs in production

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables
# Deploy to chosen platform
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the component documentation

---

**Happy coding! 🚀✨**

*Built with ❤️ and lots of animations*
