"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const adminNavLinks = [
    { href: '/admin/overview', label: 'Overview' },
    { href: '/admin/testimonials', label: 'Testimonials' },
    { href: '/admin/team', label: 'Team' },
    { href: '/admin/listings', label: 'Listings' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/magazine', label: 'Magazine' },
    { href: '/admin/careers', label: 'Careers' },
    { href: '/admin/inquiries', label: 'Inquiries' },
    { href: '/admin/newsletter', label: 'Newsletter' },
];

const AdminHeader: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="bg-black shadow-md sticky z-50 mt-25">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-10">
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-4 ">
                            {adminNavLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors ${
                                        pathname === link.href
                                            ? 'text-blue-600'
                                            : 'text-white hover:text-blue-600'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="font-medium text-gray-100">{user?.email}</p>
                        </div>
                        <Button variant="outline" className="h-7" onClick={handleSignOut}>
                            <LogOut className="h-4 w-4" />
                            <span className="sr-only">Sign Out</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
