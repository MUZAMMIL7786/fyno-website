import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { TrendingUp, Shield, FileText, Users, CheckCircle, ArrowRight, Sparkles, Target, Mail, Phone, MapPin, ChevronRight, BarChart3, Briefcase, FileCheck, AlertCircle, Smile } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo Component
const FynoLogo = ({ className = "" }) => (
  <div className={`fyno-logo ${className}`}>
    <span className="logo-text">fyn</span>
    <span className="logo-o-container">
      <span className="logo-o">o</span>
      <svg className="logo-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </div>
);

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-white/95'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" data-testid="nav-logo">
            <FynoLogo className="text-3xl" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link" data-testid="nav-home">Home</Link>
            <Link to="/services" className="nav-link" data-testid="nav-services">Services</Link>
            <Link to="/stories" className="nav-link" data-testid="nav-stories">Client Stories</Link>
            <Link to="/about" className="nav-link" data-testid="nav-about">About</Link>
            <Link to="/contact" data-testid="nav-contact">
              <Button className="btn-primary">Let's Talk</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Welcome to the Fyno family!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <FynoLogo className="text-3xl mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed">Turning financial complexity into clarity. One business story at a time.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/virtual-cfo" className="text-slate-400 hover:text-green-400 transition-colors">Virtual CFO</Link></li>
              <li><Link to="/services/gst" className="text-slate-400 hover:text-green-400 transition-colors">GST Filing</Link></li>
              <li><Link to="/services/registration" className="text-slate-400 hover:text-green-400 transition-colors">Company Registration</Link></li>
              <li><Link to="/services/income-tax" className="text-slate-400 hover:text-green-400 transition-colors">Income Tax & ITR</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-slate-400 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/stories" className="text-slate-400 hover:text-green-400 transition-colors">Client Stories</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Stay Connected</h4>
            <p className="text-slate-400 mb-4 text-sm">Financial insights that matter</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-700 text-white"
                data-testid="newsletter-email-input"
              />
              <Button type="submit" disabled={loading} className="btn-primary" data-testid="newsletter-submit-btn">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2025 Fyno Financial Services. Your growth is our story.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const Home = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${API}/stories`);
        setStories(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="home-page" data-testid="home-page">
      {/* Hero Section - The Story Begins */}
      <section className="hero-section pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <span>Does this sound familiar?</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  "I started a business to follow my <span className="text-green-500">passion</span>...
                </h1>
                <h2 className="text-2xl md:text-3xl text-slate-700 leading-relaxed font-medium">
                  ...not to drown in paperwork, taxes, and compliance."
                </h2>
              </div>
              
              <div className="bg-slate-50 border-l-4 border-red-500 p-6 rounded-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">The reality:</strong> You're brilliant at what you do. But GST deadlines? ROC filings? Cash flow forecasting? That's not why you became an entrepreneur.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">What if</strong> someone took care of all the financial complexity, compliance headaches, and strategic planning — so you could focus on <span className="font-semibold text-green-700">building your dream</span>?
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={() => navigate('/contact')} 
                  className="btn-primary btn-lg"
                  data-testid="hero-start-story-btn"
                >
                  Yes, I Need This <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/services')} 
                  variant="outline" 
                  className="btn-lg border-2 border-slate-800 text-slate-800 hover:bg-slate-50 font-semibold"
                  data-testid="hero-explore-services-btn"
                >
                  How It Works
                </Button>
              </div>
            </div>
            
            <div className="relative fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="story-hero-container">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1635859890085-ec8cb5466806?crop=entropy&cs=srgb&fm=jpg&q=85" 
                      alt="Overwhelmed with paperwork" 
                      className="rounded-xl shadow-xl w-full h-64 object-cover"
                    />
                    <div className="problem-badge">
                      <AlertCircle className="h-5 w-5" />
                      <span>Too many deadlines</span>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1758519288176-0cde8339e06f?crop=entropy&cs=srgb&fm=jpg&q=85" 
                      alt="Business confusion" 
                      className="rounded-xl shadow-xl w-full h-48 object-cover"
                    />
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1758876020604-656490027992?crop=entropy&cs=srgb&fm=jpg&q=85" 
                      alt="Finding clarity" 
                      className="rounded-xl shadow-xl w-full h-48 object-cover"
                    />
                    <div className="solution-badge">
                      <Smile className="h-5 w-5" />
                      <span>Peace of mind</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - Relatable Pain Points */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">You're Not Alone in This</h2>
            <p className="text-xl text-slate-600">These are the struggles we hear every single day from entrepreneurs like you:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="pain-point-card">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">😰</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"Tax season gives me anxiety"</h3>
                <p className="text-slate-600 leading-relaxed">You lose sleep for weeks. Did I save all receipts? Will I get a notice? Are my returns correct? The fear is real.</p>
              </CardContent>
            </Card>
            <Card className="pain-point-card">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"GST compliance feels like a maze"</h3>
                <p className="text-slate-600 leading-relaxed">GSTR-1, GSTR-3B, input credit reconciliation... it's confusing, time-consuming, and one mistake means penalties.</p>
              </CardContent>
            </Card>
            <Card className="pain-point-card">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">💸</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"I'm making money but where is it going?"</h3>
                <p className="text-slate-600 leading-relaxed">Revenue is up, but cash flow is unpredictable. You're flying blind without real financial visibility or planning.</p>
              </CardContent>
            </Card>
            <Card className="pain-point-card">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"I spend more time on compliance than customers"</h3>
                <p className="text-slate-600 leading-relaxed">You started this business to serve customers, not to file forms, track invoices, and chase regulatory deadlines.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Transformation */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 mb-6">
              <TrendingUp className="h-4 w-4" />
              <span>The Transformation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Imagine This Instead...</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">What if your financial story looked completely different?</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="transformation-card">
              <div className="transform-icon">
                <Smile className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">You Sleep Peacefully</h3>
              <p className="text-slate-600 leading-relaxed">No more 2 AM panic about tax deadlines or compliance notices. Everything is handled, on time, every time.</p>
            </div>
            <div className="transformation-card">
              <div className="transform-icon">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">You Make Confident Decisions</h3>
              <p className="text-slate-600 leading-relaxed">Clear financial insights. Cash flow forecasts. Strategic guidance. You know exactly where you stand and where you're going.</p>
            </div>
            <div className="transformation-card">
              <div className="transform-icon">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Your Business Actually Grows</h3>
              <p className="text-slate-600 leading-relaxed">With more time for customers and strategy, your revenue increases. On average, our clients see 3x growth.</p>
            </div>
          </div>

          <Card className="testimonial-card">
            <CardContent className="p-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-xl text-slate-700 italic leading-relaxed mb-4">
                    "I used to dread GST filing every month. Now? I don't even think about it. Fyno handles everything while I focus on scaling my business. Best decision I ever made."
                  </p>
                  <p className="font-bold text-slate-900">— Priya Sharma</p>
                  <p className="text-sm text-green-600">Founder, EcoBloom Organics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services as Solutions */}
      <section className="py-24 bg-slate-50 px-6" data-testid="services-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Here's How We Help</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">From registration to strategic CFO support, we handle every financial aspect so you don't have to.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="service-card group" data-testid="service-card-registration">
              <CardContent className="p-8">
                <div className="mb-6 service-icon-container">
                  <Sparkles className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Company Registration</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Start legally, start right. We handle all paperwork so you can focus on building from day one.</p>
                <Button variant="ghost" className="text-green-600 group-hover:translate-x-2 transition-transform font-semibold" onClick={() => navigate('/services/registration')} data-testid="learn-more-registration">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="service-card group" data-testid="service-card-virtual-cfo">
              <CardContent className="p-8">
                <div className="mb-6 service-icon-container">
                  <BarChart3 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Virtual CFO</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Strategic financial leadership without the full-time cost. Make data-driven decisions with confidence.</p>
                <Button variant="ghost" className="text-green-600 group-hover:translate-x-2 transition-transform font-semibold" onClick={() => navigate('/services/virtual-cfo')} data-testid="learn-more-virtual-cfo">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="service-card group" data-testid="service-card-gst">
              <CardContent className="p-8">
                <div className="mb-6 service-icon-container">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">GST & Compliance</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Never worry about deadlines or penalties again. We handle all GST filing, accurately and on time.</p>
                <Button variant="ghost" className="text-green-600 group-hover:translate-x-2 transition-transform font-semibold" onClick={() => navigate('/services/gst')} data-testid="learn-more-gst">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => navigate('/services')} className="btn-primary btn-lg" data-testid="view-all-services-btn">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Client Stories */}
      <section className="py-24 px-6 bg-white" data-testid="client-stories-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Real Entrepreneurs. Real Transformations.</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">They were where you are now. Here's how their story changed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="story-card" data-testid={`story-card-${index}`}>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{story.founder_name}</h3>
                    <p className="text-sm text-green-600 font-semibold">{story.company}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-red-600 mb-1">BEFORE</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{story.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-600 mb-1">AFTER</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{story.transformation}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Solution</p>
                    <p className="text-sm font-semibold text-green-600">{story.service_used}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => navigate('/stories')} className="btn-primary btn-lg" data-testid="read-more-stories-btn">
              Read More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Rewrite Your Financial Story?</h2>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">You didn't start a business to become an accountant.</p>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Let us handle the numbers, compliance, and strategy — so you can get back to doing what you love.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => navigate('/contact')} className="btn-primary btn-lg" data-testid="cta-start-story-btn">
              Yes, Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-slate-400">Free consultation • No commitment</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Services Page
const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 'virtual-cfo',
      icon: BarChart3,
      title: 'Virtual CFO Services',
      problem: 'Making financial decisions feels like guesswork',
      solution: 'Strategic clarity and expert guidance',
      description: 'Get C-suite financial leadership without the full-time cost. We provide strategic insights, forecasting, and decision support so you lead with confidence.',
      features: ['Financial forecasting & planning', 'Cash flow management', 'Strategic decision support', 'Investor relations', 'Growth strategy']
    },
    {
      id: 'gst',
      icon: Shield,
      title: 'GST Filing & Compliance',
      problem: 'GST deadlines and forms are overwhelming',
      solution: 'Accurate, timely filing — stress-free',
      description: 'Never worry about GST again. We handle all filing, reconciliation, and compliance so you can focus on customers, not paperwork.',
      features: ['Monthly/Quarterly GST returns', 'GST registration', 'Input tax credit optimization', 'Audit support', 'Notice handling']
    },
    {
      id: 'registration',
      icon: Sparkles,
      title: 'Company Registration',
      problem: 'Legal paperwork is delaying your launch',
      solution: 'Fast, hassle-free incorporation',
      description: 'Start your business the right way. We handle all registration, approvals, and compliance so you can launch faster.',
      features: ['Private Limited Company', 'LLP Registration', 'Sole Proprietorship', 'Partnership Firm', 'NGO/Trust Registration']
    },
    {
      id: 'income-tax',
      icon: FileText,
      title: 'Income Tax & ITR',
      problem: 'Tax season brings anxiety and confusion',
      solution: 'Expert filing, maximum savings, zero stress',
      description: 'Sleep soundly during tax season. We prepare and file your returns accurately, maximize deductions, and handle any notices.',
      features: ['Individual & Business ITR', 'Tax planning & optimization', 'TDS returns', 'Tax notice response', 'Refund assistance']
    },
    {
      id: 'roc-compliance',
      icon: FileCheck,
      title: 'ROC Compliance',
      problem: 'Missing deadlines means penalties and stress',
      solution: 'All filings handled, always on time',
      description: 'Stay compliant without the headache. We manage all ROC filings, resolutions, and statutory requirements so you never miss a deadline.',
      features: ['Annual filings', 'Board resolutions', 'Share transfer', 'Director changes', 'Statutory registers']
    },
    {
      id: 'audit',
      icon: Users,
      title: 'Audit & Assurance',
      problem: 'Audits feel invasive and stressful',
      solution: 'Professional audits that build credibility',
      description: 'Build trust with stakeholders through comprehensive audit services. We examine, verify, and provide assurance with integrity.',
      features: ['Statutory audit', 'Internal audit', 'Tax audit', 'GST audit', 'Due diligence']
    }
  ];

  return (
    <div className="services-page pt-32 pb-20 px-6" data-testid="services-page">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Solutions for Every Financial Challenge</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">From day one to scale, we're with you every step of the way.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="service-detail-card group" data-testid={`service-detail-${service.id}`}>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="service-icon-container mb-4">
                    <service.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 italic">{service.problem}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-700 font-semibold">{service.solution}</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate(`/services/${service.id}`)} className="btn-primary w-full" data-testid={`service-cta-${service.id}`}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ServiceDetail, Stories, About, Contact remain similar with updated styling...
// [Keeping remaining components the same for brevity - they follow the same story-driven approach]

const ServiceDetail = ({ serviceId }) => {
  const navigate = useNavigate();
  
  const serviceData = {
    'virtual-cfo': {
      title: 'Virtual CFO Services',
      hero: 'From gut feeling to strategic clarity',
      problem: 'You started with passion and vision. But as your business grows, financial decisions become complex. Cash flow feels unpredictable. You need strategic clarity, not just bookkeeping.',
      transformation: 'Our Virtual CFO service brings C-suite financial leadership to your business. We don\'t just track numbers—we interpret them, forecast outcomes, and guide strategic decisions.',
      outcome: 'Imagine making decisions with confidence. Forecasting growth with precision. Pitching investors with compelling financial narratives. That\'s the power of strategic financial leadership.',
      includes: ['Monthly financial analysis & reporting', 'Cash flow forecasting & management', 'Budgeting & financial planning', 'KPI tracking & insights', 'Strategic advisory', 'Investor presentation support', 'Growth strategy consulting', 'Risk assessment']
    },
    'gst': {
      title: 'GST Filing & Compliance',
      hero: 'From anxiety to peace of mind',
      problem: 'GST compliance feels like a maze. The deadlines, the forms, the fear of getting it wrong—it keeps you up at night. One mistake could mean penalties or audit notices.',
      transformation: 'We turn compliance from a burden into a strength. Accurate filing. Optimized input credit. Timely returns. You\'ll never worry about GST again.',
      outcome: 'Peace of mind. That\'s what we deliver. You focus on customers and growth. We ensure your GST story is clean, compliant, and audit-ready.',
      includes: ['GSTR-1, 3B filing', 'GST registration & cancellation', 'Input tax credit reconciliation', 'GST return amendments', 'Annual return filing', 'Notice handling & responses', 'Refund assistance', 'GST advisory']
    },
    'registration': {
      title: 'Company Registration',
      hero: 'From idea to legal reality',
      problem: 'You have a brilliant idea. But turning it into a legal entity feels overwhelming. The paperwork, the compliance, the jargon—it\'s enough to delay dreams.',
      transformation: 'We handle the entire registration process with care and expertise. From name approval to incorporation certificate, we make it smooth and simple.',
      outcome: 'Your business, officially recognized. Ready to open bank accounts, raise funding, hire talent, and grow. Your dream has a legal foundation.',
      includes: ['Name approval & reservation', 'Company incorporation', 'PAN & TAN application', 'Bank account opening support', 'Digital signature certificates', 'Memorandum & Articles drafting', 'Director identification number', 'Post-incorporation compliance']
    },
    'income-tax': {
      title: 'Income Tax & ITR',
      hero: 'From tax dread to tax confidence',
      problem: 'Tax season brings stress. Sorting through receipts, understanding deductions, filing correctly—it\'s time-consuming and confusing. And the fear of notices lingers.',
      transformation: 'We take the stress out of tax filing. Comprehensive ITR preparation, maximum legal deductions, and timely filing. We handle the complexity so you don\'t have to.',
      outcome: 'Sleep soundly during tax season. Know that your returns are accurate, optimized, and filed on time. We\'ve got you covered.',
      includes: ['Individual ITR filing', 'Business tax returns', 'Capital gains computation', 'Tax planning & advisory', 'TDS return filing', 'Notice handling', 'Tax refund assistance', 'Advance tax calculation']
    },
    'roc-compliance': {
      title: 'ROC Compliance',
      hero: 'From deadline stress to compliance ease',
      problem: 'Running a company means ongoing compliance with ROC. Miss a deadline, and penalties add up. The paperwork never seems to end.',
      transformation: 'We manage all your ROC compliance—from annual filings to board resolutions. Timely, accurate, and stress-free.',
      outcome: 'A clean compliance record. No penalties. No surprises. Just peace of mind knowing your regulatory obligations are handled professionally.',
      includes: ['Annual return filing', 'Financial statements filing', 'Board meeting minutes', 'Director appointment/resignation', 'Share transfer & transmission', 'Registered office change', 'Object clause amendment', 'Statutory register maintenance']
    },
    'audit': {
      title: 'Audit & Assurance',
      hero: 'From audit stress to stakeholder trust',
      problem: 'Whether it\'s for compliance, investors, or internal assurance, audits can feel invasive and stressful. You need someone who understands your business.',
      transformation: 'Our audit services bring clarity and credibility. We examine, verify, and assure—helping you build trust with stakeholders.',
      outcome: 'A clean audit report that opens doors. Investor confidence. Regulatory compliance. Internal control improvements. Your financial story, validated.',
      includes: ['Statutory audit', 'Tax audit under Income Tax Act', 'GST audit', 'Internal audit & controls', 'Due diligence for M&A', 'Stock audit', 'Forensic audit', 'Management advisory']
    }
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Button onClick={() => navigate('/services')} className="btn-primary">View All Services</Button>
      </div>
    );
  }

  return (
    <div className="service-detail-page pt-32 pb-20 px-6" data-testid={`service-detail-page-${serviceId}`}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">{service.title}</h1>
          <p className="text-2xl text-green-600 italic font-semibold">{service.hero}</p>
        </div>

        <div className="space-y-12">
          <Card className="story-progression-card">
            <CardContent className="p-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-red-600 mb-2">THE PROBLEM</h3>
                  <p className="text-lg text-slate-700 leading-relaxed">{service.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-green-600 mb-2">THE TRANSFORMATION</h3>
                  <p className="text-lg text-slate-700 leading-relaxed">{service.transformation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-600 mb-2">THE OUTCOME</h3>
                  <p className="text-lg text-slate-700 leading-relaxed">{service.outcome}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.includes.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-900 text-white border-none">
            <CardContent className="p-10 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Financial Story?</h3>
              <p className="text-slate-300 mb-6">Let's discuss how we can support your journey.</p>
              <Button onClick={() => navigate('/contact')} className="btn-primary btn-lg" data-testid="service-detail-cta-btn">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${API}/stories`);
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="stories-page pt-32 pb-20 px-6" data-testid="stories-page">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Real Entrepreneurs. Real Transformations.</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">They were where you are now. Stressed, overwhelmed, drowning in paperwork. Here's how their story changed.</p>
        </div>
        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-600">Loading stories...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="story-detail-card" data-testid={`full-story-card-${index}`}>
                <CardContent className="p-10">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">{story.founder_name}</h2>
                    <p className="text-lg text-green-600 font-semibold">{story.company}</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-red-600 mb-2">THE CHALLENGE</h3>
                      <p className="text-slate-700 leading-relaxed">{story.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-amber-600 mb-2">THE TURNING POINT</h3>
                      <p className="text-slate-700 leading-relaxed">{story.turning_point}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-green-600 mb-2">THE TRANSFORMATION</h3>
                      <p className="text-slate-700 leading-relaxed">{story.transformation}</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Solution Used</p>
                    <p className="text-sm font-semibold text-green-600">{story.service_used}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="about-page pt-32 pb-20 px-6" data-testid="about-page">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">We've Been Where You Are</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">We understand the stress, the overwhelm, the sleepless nights. That's why we exist — to take that burden off your shoulders.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img src="https://images.pexels.com/photos/7563665/pexels-photo-7563665.jpeg" alt="Our Team" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">To free entrepreneurs from financial overwhelm so they can focus on what they do best — building their dreams and serving their customers.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">A world where every entrepreneur has access to world-class financial guidance, regardless of business size or stage.</p>
            </div>
          </div>
        </div>

        <Card className="bg-slate-50 border-slate-200 mb-16">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What Drives Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Growth-Focused</h3>
                <p className="text-slate-600">Your success is our success. We measure ourselves by your growth.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Integrity</h3>
                <p className="text-slate-600">We build trust through transparency and ethical practice.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Excellence</h3>
                <p className="text-slate-600">We deliver quality that helps businesses thrive.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Rewrite Your Story?</h2>
          <Button onClick={() => navigate('/contact')} className="btn-primary btn-lg" data-testid="about-cta-btn">
            Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message received! We'll reach out within 24 hours.");
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page pt-32 pb-20 px-6 bg-slate-50" data-testid="contact-page">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Let's Start Your Transformation</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">No hard sell. No pressure. Just an honest conversation about your challenges and how we can help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    data-testid="contact-email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number (Optional)</label>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">What do you need help with?</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    data-testid="contact-service-select"
                  >
                    <option value="">Select your main challenge</option>
                    <option value="Virtual CFO">Strategic Financial Planning</option>
                    <option value="GST Filing">GST & Compliance</option>
                    <option value="Company Registration">Starting a New Business</option>
                    <option value="Income Tax">Tax Filing & Planning</option>
                    <option value="ROC Compliance">ROC Compliance</option>
                    <option value="Audit">Audit & Assurance</option>
                    <option value="Other">Not Sure / Multiple Areas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tell us about your situation</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What's keeping you up at night? What challenges are you facing?"
                    rows={5}
                    required
                    data-testid="contact-message-textarea"
                  />
                </div>
                <Button type="submit" disabled={loading} className="btn-primary w-full" data-testid="contact-submit-btn">
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
                <p className="text-xs text-slate-500 text-center">We typically respond within 24 hours</p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600">hello@fyno.in</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <p className="text-slate-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Office</p>
                      <p className="text-slate-600">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Free consultation call within 24 hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Honest assessment of your situation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Clear pricing, no hidden fees</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">No obligation to proceed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/virtual-cfo" element={<ServiceDetail serviceId="virtual-cfo" />} />
          <Route path="/services/gst" element={<ServiceDetail serviceId="gst" />} />
          <Route path="/services/registration" element={<ServiceDetail serviceId="registration" />} />
          <Route path="/services/income-tax" element={<ServiceDetail serviceId="income-tax" />} />
          <Route path="/services/roc-compliance" element={<ServiceDetail serviceId="roc-compliance" />} />
          <Route path="/services/audit" element={<ServiceDetail serviceId="audit" />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
