/**
 * Homepage
 * Main landing page with hero section and services overview
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Truck, Package, ChevronLeft, ChevronRight, Star, MessageCircle, Phone, Briefcase, Clock, Users, Award, Globe, Code, Megaphone, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useRef, useState, useEffect } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

// Add CSS animations for page flip effect
const flipAnimationStyle = `
  @keyframes pageFlip {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
      opacity: 1;
    }
    50% {
      transform: rotateY(90deg) rotateX(5deg);
      opacity: 0.5;
    }
    100% {
      transform: rotateY(0deg) rotateX(0deg);
      opacity: 1;
    }
  }

  @keyframes colorWave {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .flip-text {
    animation: pageFlip 0.8s ease-in-out;
    perspective: 1000px;
  }

  .color-wave {
    background: linear-gradient(90deg, #ffffff, #5a6ea0, #3a4b73, #ffffff);
    background-size: 200% auto;
    animation: colorWave 1.5s ease-in-out;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export default function HomePage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentHeroText, setCurrentHeroText] = useState(0);
    const [heroTexts, setHeroTexts] = useState([
        {
            title: 'Build Future-Ready Platforms',
            subtitle: 'We create smart applications, AI-powered tools, and seamless cloud infrastructure that help brands grow faster.'
        },
    ]);
    const [testimonials, setTestimonials] = useState([
        {
            name: 'CEO, Digital Venture',
            email: 'digital-venture.com',
            rating: 5,
            text: '"DrivePixel delivered a flawless system that scaled our operations instantly. Their technical expertise and attention to detail made all the difference in our success."',
        },
    ]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const [heroRes, testimonialsRes, servicesRes] = await Promise.all([
                publicApiClient.getHeroTexts() as Promise<{ success: boolean; data: any[] }>,
                publicApiClient.getTestimonials() as Promise<{ success: boolean; data: any[] }>,
                publicApiClient.getServices() as Promise<{ success: boolean; data: any[] }>,
            ]);

            if (heroRes.success && heroRes.data && heroRes.data.length > 0) {
                setHeroTexts(heroRes.data.map((ht: any) => ({
                    title: ht.title,
                    subtitle: ht.subtitle,
                })));
            }

            if (testimonialsRes.success && testimonialsRes.data && testimonialsRes.data.length > 0) {
                setTestimonials(testimonialsRes.data.map((t: any) => ({
                    name: t.name,
                    email: t.email,
                    rating: t.rating,
                    text: t.text,
                })));
            }

            if (servicesRes.success && servicesRes.data) {
                setServices(servicesRes.data as any[]);
            }
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-rotate hero text every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroText((prev) => (prev + 1) % heroTexts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroTexts.length]);

    return (
        <div className="min-h-screen flex flex-col" suppressHydrationWarning>
            <style>{flipAnimationStyle}</style>
            <TopBar />
            <Navbar />

            {/* Hero Section with Image Background */}
            <section
                className="relative text-white hero-padding overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/transportvideo.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="container-custom relative z-10 flex justify-center">
                    <div className="max-w-5xl w-full">
                        {/* Hero Text with Navigation */}
                        <div className="flex items-center justify-between gap-8 mb-8">
                            {/* Left Arrow */}
                            <button
                                onClick={() => setCurrentHeroText((prev) => (prev - 1 + heroTexts.length) % heroTexts.length)}
                                className="flex-shrink-0 text-white hover:text-primary-300 transition-colors duration-300"
                                aria-label="Previous text"
                            >
                                <ChevronLeft className="h-10 w-10" />
                            </button>

                            {/* Text Content */}
                            <div className="flex-1 text-center">
                                <h1
                                    key={`title-${currentHeroText}`}
                                    className="flip-text text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                                >
                                    {heroTexts[currentHeroText].title}
                                </h1>
                                <p
                                    key={`subtitle-${currentHeroText}`}
                                    className="flip-text text-xl md:text-2xl lg:text-3xl mb-8 text-primary-100 leading-relaxed"
                                >
                                    {heroTexts[currentHeroText].subtitle}
                                </p>
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={() => setCurrentHeroText((prev) => (prev + 1) % heroTexts.length)}
                                className="flex-shrink-0 text-white hover:text-primary-300 transition-colors duration-300"
                                aria-label="Next text"
                            >
                                <ChevronRight className="h-10 w-10" />
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto bg-cta hover:bg-cta-600 text-white transition-all duration-300 transform hover:scale-105">
                                    Get a Free Consultation
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-primary-900 transition-all duration-300 transform hover:scale-105"
                                >
                                    Request a Project Quote
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Services Overview Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-primary-500 mb-2">KEY SERVICES OVERVIEW</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                            We Build Future-Ready Digital Solutions
                        </h2>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            <div className="col-span-4 text-center py-8">Loading services...</div>
                        ) : services.length > 0 ? (
                            services.map((service) => (
                                <div key={service.id} className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-bold text-primary-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-8 text-gray-500">No services available</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Solutions Overview Section - Advisory / Build / Operate */}
            <section className="py-16 bg-primary-900">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-primary-300 mb-2">OUR APPROACH</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Advisory • Build • Operate
                        </h2>
                        <p className="text-lg text-primary-100 max-w-3xl mx-auto">
                            A complete end-to-end partnership from strategy to deployment to ongoing optimization.
                        </p>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Advisory */}
                        <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all">
                            <div className="w-14 h-14 bg-primary-300 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-primary-900 mb-4">Advisory</h3>
                            <p className="text-gray-700 leading-relaxed">
                                We analyze your business needs, assess opportunities, and design the right technical strategy to match your goals.
                            </p>
                        </div>

                        {/* Build */}
                        <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all">
                            <div className="w-14 h-14 bg-primary-300 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">⚙️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-primary-900 mb-4">Build</h3>
                            <p className="text-gray-700 leading-relaxed">
                                From concept to deployment—our team develops world-class applications, APIs, platforms, and integrated systems using cutting-edge technologies.
                            </p>
                        </div>

                        {/* Operate */}
                        <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all">
                            <div className="w-14 h-14 bg-primary-300 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold text-primary-900 mb-4">Operate</h3>
                            <p className="text-gray-700 leading-relaxed">
                                We ensure your product stays fast, secure, monitored, and continuously optimized with long-term support and proactive improvements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies & Tools Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-primary-500 mb-2">TECHNOLOGIES & TOOLS</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                            Modern, Reliable Technology Stacks
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We work with modern, reliable technology stacks to deliver solutions that are stable, scalable, and future-proof.
                        </p>
                    </div>

                    {/* Tech Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['React.js / Next.js', 'Node.js / Express', 'Python / Django / FastAPI', 'Flutter / React Native', 'AWS / Google Cloud / Azure', 'Docker / Kubernetes', 'CI/CD & DevOps Automation', 'PostgreSQL / MongoDB / Redis'].map((tech, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-gray-200">
                                <p className="font-semibold text-primary-900">{tech}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Highlights Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-primary-500 mb-2">PORTFOLIO HIGHLIGHTS</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                            Digital Solutions We've Built
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            A look at some of the digital solutions we've built for clients across different industries.
                        </p>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Smart Booking Platform */}
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">Smart Booking Platform</h3>
                            <p className="text-sm text-gray-600 mb-2 font-semibold">SaaS</p>
                            <p className="text-gray-700 leading-relaxed">
                                Modern booking engine with real-time availability, secure payments, and an optimized dashboard.
                            </p>
                        </div>

                        {/* AI Workflow Automation */}
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">AI Workflow Automation</h3>
                            <p className="text-sm text-gray-600 mb-2 font-semibold">Enterprise</p>
                            <p className="text-gray-700 leading-relaxed">
                                Automated data processing system powered by machine learning, reducing manual tasks by 60%.
                            </p>
                        </div>

                        {/* E-Commerce PWA */}
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                            <div className="text-4xl mb-4">🛍️</div>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">E-Commerce PWA</h3>
                            <p className="text-sm text-gray-600 mb-2 font-semibold">Retail</p>
                            <p className="text-gray-700 leading-relaxed">
                                Lightning-fast shopping experience with a modern UI and high conversion performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloud Solutions Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-primary-500 mb-2">END-TO-END MANAGED SOLUTIONS</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                            Cloud Solutions That Scale With Your Business
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            From planning to continuous optimization, we handle everything — architecture design, seamless migration,
                            proactive monitoring, and managed services across AWS, Azure, GCP, and hybrid infrastructures — helping you
                            innovate faster while reducing operational complexity.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <Briefcase className="h-12 w-12 text-primary-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">4000+</div>
                            <div className="text-gray-600 text-sm">Successful Projects</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Clock className="h-12 w-12 text-primary-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">11+ Year</div>
                            <div className="text-gray-600 text-sm">Experience</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Users className="h-12 w-12 text-primary-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">500+</div>
                            <div className="text-gray-600 text-sm">Clients</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Award className="h-12 w-12 text-primary-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">80+</div>
                            <div className="text-gray-600 text-sm">From Reference</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-primary-300 mb-3 tracking-widest uppercase">CLIENT TESTIMONIALS</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">What Our Clients Say</h2>
                        <p className="text-lg text-primary-100 max-w-3xl mx-auto leading-relaxed">
                            Trusted by leading companies worldwide for delivering exceptional digital solutions
                        </p>
                    </div>

                    {/* Testimonial Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 md:p-16 border border-white/20 shadow-2xl">
                            <div className="text-center">
                                {/* Quote Icon */}
                                {/* Stars */}
                                <div className="flex gap-2 justify-center mb-8">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="h-6 w-6 fill-highlight text-highlight drop-shadow-lg" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-xl md:text-2xl italic text-white mb-10 leading-relaxed font-light">
                                    {testimonials[currentTestimonial].text}
                                </p>

                                {/* Author Info */}
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold text-white">{testimonials[currentTestimonial].name}</h3>
                                    <div className="h-1 w-16 bg-gradient-to-r from-primary-300 to-primary-400 mx-auto mt-3 rounded-full"></div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex gap-6 justify-center">
                                    <button
                                        onClick={prevTestimonial}
                                        className="bg-white text-primary-900 rounded-full p-4 hover:bg-primary-300 transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="bg-white text-primary-900 rounded-full p-4 hover:bg-primary-300 transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                        Ready to Build Something Powerful?
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Let's discuss your goals and create a technology strategy that drives real results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-cta hover:bg-cta-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 px-8">
                                Get a Free Consultation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-primary-900 hover:bg-primary-700 text-white font-semibold border-2 border-primary-900 transition-all duration-300 transform hover:scale-105 px-8"
                            >
                                Request a Project Quote
                            </Button>
                        </Link>
                    </div>
                    <p className="text-gray-600 mt-8">
                        Or speak directly with one of our specialists to discuss your goals.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
