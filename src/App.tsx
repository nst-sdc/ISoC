import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Disc, Menu, X } from 'lucide-react';
import { AuthProvider } from './components/AuthContext';
import { AuthModal } from './components/AuthModal';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Students from './pages/Students';
import Organizations from './pages/Organizations';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Import forms
import { StudentForm } from './components/forms/StudentForm';
import { OrganizationForm } from './components/forms/OrganizationForm';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function App() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

const navItems = [
{ name: 'Home', href: '/' },
{ name: 'About', href: '/about' },
{ name: 'Students', href: '/students' },
{ name: 'Organizations', href: '/organizations' },
{ name: 'Projects', href: '/projects' },
{ name: 'Contact', href: '/contact' },
];

const footerLinks = {
social: [
{ name: 'GitHub', href: 'https://github.com/indian-summer-of-code', icon: Github },
{ name: 'Twitter', href: 'https://twitter.com/isoc_india', icon: Twitter },
{ name: 'LinkedIn', href: 'https://linkedin.com/company/indian-summer-of-code', icon: Linkedin },
{ name: 'Discord', href: 'https://discord.gg/isoc-community', icon: Disc },
],
legal: [
{ name: 'Code of Conduct', href: '/code-of-conduct' },
{ name: 'Privacy Policy', href: '/privacy' },
{ name: 'Contact Us', href: '/contact' },
],
};

return (
<AuthProvider>
<Router>
<div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
{/* Navigation */}
<nav className="bg-white shadow-sm fixed w-full top-0 z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex items-center">
<Link to="/" className="flex items-center">
<span className="text-2xl font-bold text-orange-600">ISoC</span>
<span className="ml-2 text-sm font-medium text-gray-500">2025</span>
</Link>
</div>

{/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-8">
{navItems.map((item) => (
<Link
key={item.name}
to={item.href}
className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
>
{item.name}
</Link>
))}
</div>

{/* Mobile menu button */}
<div className="md:hidden flex items-center">
<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
className="text-gray-600 hover:text-orange-600"
>
{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
</div>
</div>
</div>

{/* Mobile Navigation */}
{isMenuOpen && (
<div className="md:hidden">
<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
{navItems.map((item) => (
<Link
key={item.name}
to={item.href}
className="text-gray-600 hover:text-orange-600 block px-3 py-2 text-base font-medium"
onClick={() => setIsMenuOpen(false)}
>
{item.name}
</Link>
))}
</div>
</div>
)}
</nav>

{/* Main Content */}
<Routes>
<Route path="/" element={
<Home
onStudentClick={() => {
setAuthMode('signup');
setIsAuthModalOpen(true);
}}
onOrgClick={() => {
setAuthMode('signup');
setIsAuthModalOpen(true);
}}
/>
} />
<Route path="/about" element={<About />} />
<Route path="/students" element={<Students />} />
<Route path="/organizations" element={<Organizations />} />
<Route path="/projects" element={<Projects />} />
<Route path="/contact" element={<Contact />} />
<Route path="/student/apply" element={<StudentForm />} />
<Route path="/organization/register" element={<OrganizationForm />} />
</Routes>

{/* Footer */}
<footer className="bg-gray-900 text-white py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex flex-col md:flex-row justify-between items-center">
<div className="text-center md:text-left mb-6 md:mb-0">
<h3 className="text-xl font-bold mb-2">Indian Summer of Code</h3>
<p className="text-gray-400">Fostering open-source innovation in India</p>
</div>
<div className="flex gap-6">
{footerLinks.social.map((item) => (
<a
key={item.name}
href={item.href}
className="hover:text-orange-400 transition-colors"
target="_blank"
rel="noopener noreferrer"
>
<item.icon className="h-6 w-6" />
</a>
))}
</div>
</div>
<div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
<div className="flex justify-center gap-4">
{footerLinks.legal.map((item, index) => (
<React.Fragment key={item.name}>
<Link to={item.href} className="hover:text-white transition-colors">
{item.name}
</Link>
{index < footerLinks.legal.length - 1 && <span>|</span>}
</React.Fragment>
))}
</div>
</div>
</div>
</footer>

<AuthModal
isOpen={isAuthModalOpen}
onClose={() => setIsAuthModalOpen(false)}
mode={authMode}
/>
</div>
</Router>
</AuthProvider>
);
}

export default App;
