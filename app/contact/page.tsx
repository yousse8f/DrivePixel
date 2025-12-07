'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
                <div className="container-custom">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-primary-100 max-w-3xl">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Contact Info Cards */}
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8">
                            <Mail className="h-12 w-12 text-primary-500 mb-4" />
                            <h3 className="text-xl font-bold text-primary-900 mb-2">Email</h3>
                            <p className="text-gray-700">support@drivepixel.com</p>
                        </div>
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8">
                            <Phone className="h-12 w-12 text-primary-500 mb-4" />
                            <h3 className="text-xl font-bold text-primary-900 mb-2">Phone</h3>
                            <p className="text-gray-700">+91 9971 392828</p>
                        </div>
                        <div className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8">
                            <MapPin className="h-12 w-12 text-primary-500 mb-4" />
                            <h3 className="text-xl font-bold text-primary-900 mb-2">Address</h3>
                            <p className="text-gray-700">NYC</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-primary-900 mb-2">Full Name *</label>
                                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary-900 mb-2">Email *</label>
                                    <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary-900 mb-2">Phone</label>
                                <input type="tel" placeholder="Your Phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary-900 mb-2">Subject *</label>
                                <input type="text" placeholder="How can we help?" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary-900 mb-2">Message *</label>
                                <textarea rows={6} placeholder="Tell us about your project..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"></textarea>
                            </div>
                            <Button size="lg" className="w-full bg-primary-500 hover:bg-primary-600">
                                Send Message
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
