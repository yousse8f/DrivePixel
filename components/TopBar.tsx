/**
 * TopBar Component
 * Contact information bar displayed above the navbar
 */

'use client';

import { Mail, Phone, TrendingUp, LifeBuoy, Globe } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
    return (
        <div className="hidden md:block bg-gradient-to-r from-primary-900 to-gray-600 border-b border-primary-300 py-2">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    {/* Left Section - Contact Info */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                            <TrendingUp className="h-4 w-4 text-white" />
                            <span className="text-white font-semibold">Sales:</span>
                            <a href="tel:+919077392828" className="hover:text-primary-100 transition-colors">
                                +123-456-7899
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <LifeBuoy className="h-4 w-4 text-white" />
                            <span className="text-white font-semibold">Support:</span>
                            <a href="tel:+919071883346" className="hover:text-primary-100 transition-colors">
                                +123-456-7899
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Globe className="h-4 w-4 text-white" />
                            <span className="text-white font-semibold">BD:</span>
                            <a href="tel:+8809842789753" className="hover:text-primary-100 transition-colors">
                                +123-456-7899
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 text-white hover:text-primary-100 transition-colors"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Support</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
