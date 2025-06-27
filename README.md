# ระบบจัดการส่งออกผลไม้ (Fruit Export Management System)

A comprehensive web application for managing fruit export business operations built with Next.js and Supabase.

## Features

- 🔐 **Authentication System**: Secure login/logout with session management
- 🏠 **Dashboard**: Overview of business metrics and quick actions
- 🌐 **Thai Language Support**: Full Thai language interface
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Font**: Noto Sans Thai

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Enable Email authentication in Authentication > Settings

3. **Configure environment variables**

   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Database Schema

The application includes a comprehensive database schema for fruit export management:

### Core Tables
- **customers** - Customer information and business details
- **fruit_categories** - Fruit category classifications
- **fruits** - Product catalog with storage requirements
- **orders** - Purchase orders from customers
- **order_items** - Individual items within orders
- **shipments** - Shipping and logistics tracking
- **export_documents** - Export documentation management
- **quality_records** - Quality control and inspection records

### Setup Database
1. Follow instructions in `DATABASE_SETUP.md`
2. Run SQL scripts in order:
   - `database-schema.sql` - Create tables and relationships
   - `sample-data.sql` - Insert sample data

## 🌟 Features

### Authentication & Security
- Secure login/logout with Supabase Auth
- Protected routes with middleware
- Row Level Security (RLS) policies
- Session management

### Data Management
- **Fruit Management** - Add, edit, and categorize fruits with storage requirements
- **Customer Management** - Manage customer information and credit limits
- **Order Management** - Create and track purchase orders
- **Shipment Tracking** - Monitor shipping progress and logistics
- **Quality Control** - Record quality inspections and compliance

### User Interface
- Responsive design for desktop and mobile
- Thai language support with Noto Sans Thai font
- Modern UI with Tailwind CSS
- Interactive forms with validation
- Search and filtering capabilities
- Real-time status updates

### Business Intelligence
- Dashboard with key metrics
- Sales analytics and reporting
- Inventory tracking
- Customer relationship management
- Export documentation workflow

## 📱 Pages Overview

### 🏠 Dashboard (`/dashboard`)
- Business metrics overview
- Quick action buttons
- Recent activity feeds
- Sales statistics

### 🍎 Fruit Management (`/fruits`)
- Product catalog management
- Category organization
- Storage requirement tracking
- Seasonal availability

### 🛒 Order Management (`/orders`)
- Purchase order creation
- Order status tracking
- Customer order history
- Pricing and terms management

### 👥 Customer Management (`/customers`)
- Customer database
- Contact information
- Credit limit management
- Business relationship tracking

### 🚢 Shipment Tracking (`/shipments`)
- Logistics coordination
- Container tracking
- Vessel scheduling
- Temperature monitoring
- Port-to-port tracking

## 🔧 Technical Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hooks** for state management

### Backend
- **Supabase** for database and authentication
- **PostgreSQL** with advanced features
- **Row Level Security** for data protection
- **Real-time subscriptions** capability

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type checking
- **Hot reload** for development
- **Environment variables** for configuration
