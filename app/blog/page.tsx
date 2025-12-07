'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: 'The Future of AI in Business Automation',
            category: 'Industry Insights',
            author: 'John Smith',
            date: 'Dec 4, 2024',
            excerpt: 'Explore how artificial intelligence is transforming business processes and creating new opportunities for growth.',
            image: '🤖'
        },
        {
            id: 2,
            title: 'Cloud Migration: Best Practices & Strategies',
            category: 'Tutorials',
            author: 'Sarah Johnson',
            date: 'Dec 1, 2024',
            excerpt: 'A comprehensive guide to successfully migrating your infrastructure to the cloud with minimal downtime.',
            image: '☁️'
        },
        {
            id: 3,
            title: 'Case Study: 60% Efficiency Boost',
            category: 'Case Studies',
            author: 'Mike Chen',
            date: 'Nov 28, 2024',
            excerpt: 'How we helped an enterprise reduce manual work by 60% through intelligent automation.',
            image: '📊'
        },
        {
            id: 4,
            title: 'React.js Best Practices for 2024',
            category: 'Tutorials',
            author: 'Emily Davis',
            date: 'Nov 25, 2024',
            excerpt: 'Learn the latest React patterns and best practices to build scalable and maintainable applications.',
            image: '⚛️'
        },
        {
            id: 5,
            title: 'DevOps Automation: Streamline Your Pipeline',
            category: 'Industry Insights',
            author: 'Alex Kumar',
            date: 'Nov 22, 2024',
            excerpt: 'Discover how to automate your deployment pipeline and reduce release cycles significantly.',
            image: '🚀'
        },
        {
            id: 6,
            title: 'Security First: Protecting Your Digital Assets',
            category: 'Featured Posts',
            author: 'Lisa Wong',
            date: 'Nov 19, 2024',
            excerpt: 'Essential security practices to protect your applications and data from modern threats.',
            image: '🔒'
        }
    ];

    const categories = ['All', 'Featured Posts', 'Tutorials', 'Case Studies', 'Industry Insights'];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
                <div className="container-custom">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Blog</h1>
                    <p className="text-xl text-primary-100 max-w-3xl">
                        Insights, tutorials, and case studies from our team of experts.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-primary-50">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === 'All' ? 'default' : 'outline'}
                                className={category === 'All' ? 'bg-primary-500 hover:bg-primary-600 text-white font-semibold' : 'border-primary-300 text-primary-900 hover:bg-primary-100'}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200">
                                <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-8 flex items-center justify-center min-h-32">
                                    <div className="text-6xl">{post.image}</div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-3">
                                        <span className="inline-block bg-primary-300 text-primary-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                            {post.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-primary-500" />
                                            <span className="font-medium">{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="h-4 w-4 text-primary-500" />
                                            <span className="font-medium">{post.author}</span>
                                        </div>
                                    </div>
                                    <Link href="/blog">
                                        <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold transition-all duration-300 hover:shadow-lg py-2.5">
                                            Read More
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                    <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
                        Get the latest insights, tutorials, and case studies delivered to your inbox every week.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300 font-medium"
                        />
                        <Button size="lg" className="bg-primary-300 hover:bg-primary-200 text-primary-900 font-bold transition-all duration-300 hover:shadow-lg">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
