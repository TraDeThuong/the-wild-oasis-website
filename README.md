# The Wild Oasis Website
link: https://the-wild-oasis-website-virid-sigma.vercel.app

A modern, guest-facing luxury cabin rental website built with Next.js. This application allows guests to explore cabins, manage their profiles, and view their reservations in a seamless and responsive environment.

## Features

- **Guest Authentication**: Secure login using Supabase and NextAuth.js.
- **Dynamic Cabin Display**: (In progress) Browsing and filtering luxury cabins.
- **Guest Dashboard**: A dedicated `/account` area for guests to:
  - View a personalized welcome message.
  - Manage reservations.
  - Update user profile details.
- **Responsive Design**: Built with Tailwind CSS for a perfect experience on mobile, tablet, and desktop.
- **Optimized Performance**: Leverages Next.js Server Components, Streaming, and dedicated loading states (`loading.tsx`).

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend/Auth**: Supabase
- **Icons/Images**: Lucide React & Optimized Next/Image

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version)
- npm or yarn

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd The-Wild-Oasis-Website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase and Auth credentials:

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router files (Routes, Layouts, Loading states).
  - `account/`: Guest dashboard and profile management.
  - `_components/`: Reusable UI components (SideNavigation, Spinner, etc.).
  - `_lib/`: Shared logic, authentication, and database utilities.
- `public/`: Static assets like images and logos.

## Key Components

- **SideNavigation**: Handles navigation within the account area.
- **Layouts**: Nested layouts for persistent UI elements (e.g., sidebars in the account section).
- **Auth**: Integration with Supabase for secure guest sessions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
