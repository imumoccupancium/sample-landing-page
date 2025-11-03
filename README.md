# Sample Landing Page - Node.js & Vercel

A modern, responsive landing page built with Node.js and Express.js, designed for deployment on Vercel.

## Features

- 🚀 **Fast & Lightweight**: Built with Express.js for optimal performance
- 📱 **Responsive Design**: Mobile-first approach with modern CSS
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 🔧 **Easy Deployment**: Optimized for Vercel with zero configuration
- 📧 **Contact Form**: Functional contact form with API endpoint
- 🔍 **SEO Friendly**: Proper meta tags and semantic HTML

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Vercel
- **Styling**: Custom CSS with CSS Grid and Flexbox

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Local Development

1. **Clone or download the project**
   ```bash
   cd SampleProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the landing page.

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to configure your deployment.

### Option 2: GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

### Option 3: Drag & Drop

1. **Build your project** (if needed)
   ```bash
   npm run build
   ```

2. **Drag and drop** your project folder to [vercel.com/new](https://vercel.com/new)

## Project Structure

```
SampleProject/
├── public/
│   ├── index.html      # Main landing page
│   ├── styles.css      # CSS styles
│   ├── script.js       # JavaScript functionality
│   └── 404.html        # 404 error page
├── index.js            # Express.js server
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## API Endpoints

- `GET /` - Main landing page
- `POST /api/contact` - Contact form submission
- `GET /api/health` - Health check endpoint

## Customization

### Styling
- Edit `public/styles.css` to customize the appearance
- The CSS uses CSS custom properties for easy theming

### Content
- Modify `public/index.html` to update content
- Update the hero section, features, and contact information

### Functionality
- Add new routes in `index.js`
- Extend the contact form in `public/script.js`

## Environment Variables

For production deployment, you may want to set:

- `PORT` - Server port (automatically set by Vercel)
- `NODE_ENV` - Environment (development/production)

## Performance

- Optimized for Vercel's edge network
- Minimal dependencies for fast cold starts
- Responsive images and modern CSS techniques
- Lazy loading and intersection observers for animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you encounter any issues or have questions:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the [Express.js documentation](https://expressjs.com/)
3. Open an issue in the repository

---

**Happy coding!** 🚀