# 📄 DocuMorph - Ultimate Document Converter

<div align="center">
  <h3>Transform your documents between PDF, DOCX, PPTX, XLSX, and 20+ other formats</h3>
  <p><strong>Fast • Secure • Private • No Server Upload Required</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## ✨ Features

### 🚀 **Core Functionality**
- **Multi-format Support**: Convert between 20+ document formats including PDF, DOCX, PPTX, XLSX, TXT, HTML, CSV, JSON, and more
- **Batch Processing**: Upload and convert multiple files simultaneously
- **Real-time Progress**: Live conversion progress tracking with detailed status updates
- **Client-side Processing**: All conversions happen in your browser - no files uploaded to servers
- **Download Management**: One-click download of converted files with proper naming

### 🎨 **User Experience**
- **Modern UI**: Clean, responsive design with smooth animations
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Drag & Drop**: Intuitive file upload with drag-and-drop support
- **Progress Tracking**: Visual progress bars and status indicators
- **Error Handling**: Comprehensive error messages and retry functionality
- **Accessibility**: Fully accessible with keyboard navigation and screen reader support

### 🛡️ **Security & Privacy**
- **100% Private**: No server uploads - all processing happens locally
- **Secure**: Client-side only processing ensures your documents never leave your device
- **No Data Collection**: Zero tracking or data collection

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and enhanced development experience
- **React 18**: Modern React with hooks and functional components
- **Vite**: Lightning-fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **ESLint**: Code quality and consistency enforcement
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🏗️ Project Structure

```
documorph-converter/
├── src/
│   ├── components/          # React components
│   │   ├── ConversionProgress.tsx    # Progress tracking UI
│   │   ├── FileUpload.tsx           # File upload interface
│   │   ├── FormatSelector.tsx       # Format selection UI
│   │   ├── Header.tsx               # App header with navigation
│   │   └── Hero.tsx                 # Landing page hero section
│   ├── constants/
│   │   └── formats.ts               # Supported conversion formats
│   ├── hooks/
│   │   ├── useFileUpload.ts         # File upload logic
│   │   └── useTheme.ts              # Theme management
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── utils/
│   │   ├── conversionService.ts     # File conversion logic
│   │   └── fileUtils.ts             # File handling utilities
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/documorph-converter.git
   cd documorph-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎯 Usage

### Basic Conversion Flow

1. **Start**: Click "Start Converting" on the homepage
2. **Upload**: Drag and drop files or click to select documents
3. **Choose Format**: Select your desired output format from the available options
4. **Convert**: Watch real-time progress as files are converted
5. **Download**: Download your converted files instantly

### Supported Formats

#### Input Formats
- **Documents**: PDF, DOCX, DOC, TXT, RTF, ODT
- **Presentations**: PPTX, PPT, ODP
- **Spreadsheets**: XLSX, XLS, CSV, ODS
- **Images**: JPG, PNG, GIF, BMP, TIFF
- **Web**: HTML, XML, JSON
- **And more...**

#### Output Formats
- **PDF**: Universal document format
- **DOCX**: Microsoft Word format
- **PPTX**: Microsoft PowerPoint format
- **XLSX**: Microsoft Excel format
- **TXT**: Plain text format
- **HTML**: Web format
- **CSV**: Comma-separated values
- **JSON**: JavaScript Object Notation
- **And more...**

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript with enhanced IDE support
- **Vite**: Next-generation frontend build tool
- **Tailwind CSS**: Utility-first CSS framework

### Libraries & Tools
- **Lucide React**: Beautiful, customizable icons
- **PDF-lib**: PDF processing library
- **XLSX**: Excel file processing
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefix automation

### Development Tools
- **Vite**: Development server and build tool
- **TypeScript**: Static type checking
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Rapid UI development

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Quality

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- **No Server Uploads**: All file processing happens locally in your browser
- **Privacy First**: No data collection, tracking, or analytics
- **Secure Processing**: Files never leave your device
- **No Storage**: Converted files are temporarily stored in browser memory only

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/documorph-converter/issues) page
2. Create a new issue with detailed information
3. For general questions, use the [Discussions](https://github.com/yourusername/documorph-converter/discussions) tab

## 🎉 Acknowledgments

- [React](https://reactjs.org/) for the awesome framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [PDF-lib](https://pdf-lib.js.org/) for PDF processing capabilities

---

<div align="center">
  <p>Made with ❤️ by <strong>DocuMorph Team</strong></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
