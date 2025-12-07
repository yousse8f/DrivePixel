/**
 * Property Card Component
 * Reusable card for displaying property information
 */

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        price: number;
        location: string;
        images?: any;
        bedrooms?: number;
        bathrooms?: number;
        area?: number;
        type: string;
        status: string;
        featured?: boolean;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    // Get first image or use placeholder
    const imageUrl =
        property.images && Array.isArray(property.images) && property.images.length > 0
            ? property.images[0]
            : '/images/pic1.jpg';

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Property Image */}
            <div className="relative h-48 w-full bg-gray-200">
                {property.featured && (
                    <Badge className="absolute top-2 left-2 z-10">Featured</Badge>
                )}
                <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 z-10"
                >
                    {property.status}
                </Badge>
                <Image
                    src={imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
            </div>

            <CardContent className="p-4">
                {/* Property Type */}
                <Badge variant="outline" className="mb-2">
                    {property.type}
                </Badge>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    {property.bedrooms && (
                        <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.bedrooms}</span>
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.bathrooms}</span>
                        </div>
                    )}
                    {property.area && (
                        <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.area} m²</span>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-primary">
                    {formatCurrency(property.price)}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
