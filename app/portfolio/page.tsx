'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

export default function PortfolioPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const response = await publicApiClient.getPortfolio();
            if (response.success && response.data) {
                setProjects(response.data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    techStack: item.tech_stack || [],
                    results: item.results,
                })));
            }
        } catch (error) {
            console.error('Failed to load portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'SaaS', 'Enterprise', 'Retail', 'Healthcare'];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
                <div className="container-custom">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
                    <p className="text-xl text-primary-100 max-w-3xl">
                        Explore some of the digital solutions we've built for clients across different industries.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === 'All' ? 'default' : 'outline'}
                                className={category === 'All' ? 'bg-primary-500 hover:bg-primary-600' : ''}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-8">Loading portfolio...</div>
                    ) : projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-primary-900 mb-2">{project.title}</h3>
                                                <span className="inline-block bg-primary-300 text-primary-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">{project.description}</p>
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-primary-900 mb-2">Tech Stack:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech: string) => (
                                                    <span key={tech} className="bg-white px-3 py-1 rounded text-sm text-gray-700 border border-gray-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 mb-4">
                                            <p className="text-sm text-gray-600">Key Result</p>
                                            <p className="text-lg font-bold text-primary-500">{project.results}</p>
                                        </div>
                                        <Link href="/contact">
                                            <Button variant="outline" className="w-full border-primary-500 text-primary-500 hover:bg-primary-50">
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No portfolio items available</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white text-primary-900">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-6 text-primary-900">Ready to Start Your Project?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can bring your vision to life with our proven expertise.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" variant="secondary">
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
