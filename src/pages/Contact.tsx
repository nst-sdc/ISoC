import React from 'react';
import { Mail, MessageSquare, Github, Twitter, Linkedin, Disc } from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/indian-summer-of-code', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/isoc_india', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/indian-summer-of-code', icon: Linkedin },
    { name: 'Discord', href: 'https://discord.gg/isoc-community', icon: Disc },
  ];

  return (
    <div className="pt-16">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="mailto:contact@isoc.org"
                className="flex items-center justify-center p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <Mail className="h-6 w-6 text-orange-600 mr-3" />
                <span className="text-lg font-medium">contact@isoc.org</span>
              </a>
              <a
                href="https://discord.gg/isoc-community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <MessageSquare className="h-6 w-6 text-orange-600 mr-3" />
                <span className="text-lg font-medium">Join our Discord</span>
              </a>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <link.icon className="h-8 w-8" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}