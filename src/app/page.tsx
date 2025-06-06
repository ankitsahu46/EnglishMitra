// import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// export default function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-teal-400 to-green-400 text-white py-16">
//         <MaxWidthWrapper>
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               Welcome to <span className="text-black">EnglishMitra</span>
//             </h1>
//             <p className="text-lg md:text-xl mb-6">
//               Your personal AI-powered tutor to master English effortlessly.
//             </p>
//             <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800">
//               Get Started
//             </button>
//           </div>
//         </MaxWidthWrapper>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-100">
//         <MaxWidthWrapper>
//           <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 bg-white shadow-md rounded-lg text-center">
//               <h3 className="text-xl font-semibold mb-4">Interactive Lessons</h3>
//               <p>Engage with AI-driven lessons tailored to your learning style.</p>
//             </div>
//             <div className="p-6 bg-white shadow-md rounded-lg text-center">
//               <h3 className="text-xl font-semibold mb-4">Vocabulary Builder</h3>
//               <p>Expand your vocabulary with personalized word suggestions.</p>
//             </div>
//             <div className="p-6 bg-white shadow-md rounded-lg text-center">
//               <h3 className="text-xl font-semibold mb-4">AI Tutor</h3>
//               <p>Get instant feedback and guidance from our AI-powered tutor.</p>
//             </div>
//           </div>
//         </MaxWidthWrapper>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-white">
//         <MaxWidthWrapper>
//           <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="p-6 bg-gray-100 shadow-md rounded-lg">
//               <p className="italic">
//                 "EnglishMitra has completely transformed the way I learn English. The AI tutor is amazing!"
//               </p>
//               <p className="mt-4 font-bold">- John Doe</p>
//             </div>
//             <div className="p-6 bg-gray-100 shadow-md rounded-lg">
//               <p className="italic">
//                 "I love the interactive lessons and the vocabulary builder. Highly recommend it!"
//               </p>
//               <p className="mt-4 font-bold">- Jane Smith</p>
//             </div>
//           </div>
//         </MaxWidthWrapper>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="py-16 bg-gradient-to-r from-teal-400 to-green-400 text-white">
//         <MaxWidthWrapper>
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
//             <p className="text-lg mb-6">
//               Join thousands of learners and improve your English today!
//             </p>
//             <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800">
//               Sign Up Now
//             </button>
//           </div>
//         </MaxWidthWrapper>
//       </section>
//     </div>
//   );
// }







import React from 'react';
import Link from 'next/link';
import { FaBookOpen, FaMicrophone, FaHeadphones, FaPencilAlt } from 'react-icons/fa';

const Hero = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-teal-400 to-green-400 py-24 sm:py-32">
    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-teal-400 to-green-400 blur-lg"></div>
    <div className="relative px-6 mx-auto max-w-7xl text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Unlock Your English Potential
      </h1>
      <p className="mt-6 text-lg text-white opacity-80">
        Learn English effectively and engagingly with our comprehensive platform.
        From vocabulary to conversation, we&apos;ve got you covered.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Link href="/register" className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
          Get Started for Free
        </Link>
        <Link href="/features" className="text-sm font-semibold leading-6 text-white hover:text-teal-200">
          Explore Features <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="bg-gray-50 py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Learn Smarter, Not Harder
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Our platform is packed with features designed to make your English learning journey effective and enjoyable.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <FaBookOpen className="h-6 w-6 text-teal-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Extensive Vocabulary</h3>
          <p className="mt-2 text-sm text-gray-600">Build your word power with flashcards, lists, and contextual examples.</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <FaPencilAlt className="h-6 w-6 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Grammar Mastery</h3>
          <p className="mt-2 text-sm text-gray-600">Understand and practice English grammar rules with interactive exercises.</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <FaHeadphones className="h-6 w-6 text-teal-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Listening Comprehension</h3>
          <p className="mt-2 text-sm text-gray-600">Improve your listening skills with diverse audio content and transcripts.</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <FaMicrophone className="h-6 w-6 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Pronunciation Practice</h3>
          <p className="mt-2 text-sm text-gray-600">Enhance your speaking with pronunciation guides and practice tools.</p>
        </div>
      </div>
    </div>
  </div>
);

const CallToAction = () => (
  <div className="bg-gradient-to-br from-green-400 to-teal-400 py-16 sm:py-24">
    <div className="mx-auto max-w-md text-center lg:max-w-lg">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Ready to Transform Your English?
      </h2>
      <p className="mt-4 text-lg leading-8 text-white opacity-80">
        Join thousands of learners who are already improving their English with our platform.
      </p>
      <Link href="/register" className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
        Sign Up Now
      </Link>
    </div>
  </div>
);

export default function Home() {
  return (
      <main>
        <Hero />
        <FeaturesSection />
        <CallToAction />
      </main>
  );
}