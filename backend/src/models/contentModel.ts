export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceInput {
  title: string;
  description: string;
  icon: string;
  items: string[];
  order?: number;
  isActive?: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  results: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioInput {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  results: string;
  imageUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  slug: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostInput {
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  slug: string;
  isPublished?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialInput {
  name: string;
  email: string;
  rating: number;
  text: string;
  order?: number;
  isActive?: boolean;
}

export interface HeroText {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroTextInput {
  title: string;
  subtitle: string;
  order?: number;
  isActive?: boolean;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  updatedAt: Date;
}

export interface SettingInput {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
}

