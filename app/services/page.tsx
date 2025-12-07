'use client';

import Link from 'next/link';
import { ArrowRight, Code, Cloud, Zap, Briefcase, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
    const services = [
        {
            id: 'web-mobile',
            title: 'Web & Mobile App Development',
            icon: '🌐',
            items: ['Custom Web Apps', 'Mobile Apps (iOS / Android)', 'Cross-platform solutions', 'UI/UX Design', 'Maintenance'],
            description: 'Build fast, secure, and scalable digital products designed for performance and long-term growth.'
        },
        {
            id: 'cloud',
            title: 'Cloud & Infrastructure Solutions',
            icon: '☁️',
            items: ['Cloud Migration', 'DevOps Services', 'Server Management', 'Cloud Security', 'Infrastructure Automation'],
            description: 'Optimize your operations with robust cloud architecture and secure infrastructure built to handle scale.'
        },
        {
            id: 'ai',
            title: 'AI & Automation Services',
            icon: '🤖',
            items: ['AI-powered Applications', 'Chatbots & Virtual Assistants', 'Automation Solutions', 'Data Analytics', 'Machine Learning Models'],
            description: 'Transform workflows with intelligent automation and AI-driven tools that improve accuracy and reduce manual work.'
        },
        {
            id: 'advisory',
            title: 'IT Advisory & Consulting',
            icon: '💼',
            items: ['System Architecture Planning', 'Digital Transformation', 'Technology Roadmaps', 'IT Audits', 'Enterprise Solutions'],
            description: 'Make smart technology decisions with expert guidance, solution design, and digital transformation planning.'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
                <div className="container-custom">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-primary-100 max-w-3xl">
                        Comprehensive digital solutions tailored to transform your business and drive growth.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div key={service.id} className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                                <div className="text-5xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-primary-900 mb-3">{service.title}</h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {service.items.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-16 bg-primary-900">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Approach</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Advisory',
                                icon: '📊',
                                items: ['Business Needs Assessment', 'Technical Recommendations', 'Risk & Feasibility Analysis']
                            },
                            {
                                title: 'Build',
                                icon: '⚙️',
                                items: ['Product Development', 'Custom APIs', 'Integrations', 'Deployment']
                            },
                            {
                                title: 'Operate',
                                icon: '🚀',
                                items: ['Monitoring & Optimization', 'Long-term Support', 'Performance Tuning', 'Security & Compliance']
                            }
                        ].map((solution, index) => (
                            <div key={index} className="bg-white rounded-xl p-8">
                                <div className="text-4xl mb-4">{solution.icon}</div>
                                <h3 className="text-2xl font-bold text-primary-900 mb-4">{solution.title}</h3>
                                <ul className="space-y-2">
                                    {solution.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700">
                                            <span className="text-primary-500 font-bold">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold text-primary-900 mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how our services can help you achieve your digital goals.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                            Get a Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
