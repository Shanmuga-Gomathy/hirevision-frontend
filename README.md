# Job Referral App - Frontend

A modern React.js frontend for the Job Referral App, built with Vite and Bootstrap.

## 🚀 Features

- **Modern React 18** with hooks and functional components
- **Vite** for fast development and building
- **Bootstrap 5** for responsive design
- **React Router** for navigation
- **Axios** for API communication
- **Email confirmation** flow
- **Role-based registration** (User, Recruiter, Admin)
- **Responsive design** for all devices

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

## 🛠️ Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd JobReferralApp-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── HowItWorks.jsx  # How it works page
│   ├── Register.jsx    # Registration form
│   ├── EmailConfirmation.jsx # Email confirmation
│   └── ComingSoon.jsx  # Coming soon pages
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── App.css             # App-specific styles
└── index.css           # Global styles
```

## 🎨 Design Features

- **Professional color scheme** with primary blue (#1E40AF)
- **Responsive design** that works on all devices
- **Modern UI** with hover effects and animations
- **Bootstrap components** for consistency
- **Custom CSS** for enhanced styling

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Pages

1. **Home** (`/`) - Landing page with hero section and features
2. **About** (`/about`) - Company information and mission
3. **How It Works** (`/how-it-works`) - Process explanation
4. **Register** (`/register`) - User registration with role selection
5. **Email Confirmation** (`/confirm`) - Email verification
6. **Coming Soon** - Placeholder pages for future features

## 🔌 API Integration

The frontend connects to the Spring Boot backend:

- **Registration**: `POST /api/v1/registration`
- **Email Confirmation**: `GET /api/v1/registration/confirm?token={token}`

### Registration Request Format:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "USER"
}
```

## 🎯 User Roles

1. **USER** - Job seekers looking for opportunities
2. **RECRUITER** - Companies posting jobs and finding candidates
3. **ADMIN** - Platform administrators managing the system

## 🚀 Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The built files will be in the `dist/` directory**

3. **Deploy the `dist/` folder to your web server**

## 🔧 Configuration

### Vite Configuration
- **Port**: 3000 (development)
- **Proxy**: `/api` requests are proxied to `http://localhost:8080`
- **Hot reload**: Enabled for development

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=http://localhost:8080
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for better job opportunities** 