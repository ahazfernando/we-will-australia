import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
} from "lucide-react";
import {BsTwitterX} from "react-icons/bs";
import Link from "next/link";

const socialLinks = [
  {
    icon: <Facebook size={20} />,
    href: "https://www.facebook.com/share/16s2cJwbzZ/?mibextid=wwXIfr",
  },
  {
    icon: <Instagram size={20} />,
    href: "https://www.instagram.com/wewillaustralia?igsh=MW95cXpjcjQ2dmFidQ==",
  },
  {
    icon: <BsTwitterX size={19} />,
    href: "https://x.com/wewillaustralia?s=11",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/company/we-will-australia/",
  },
];

const footerLinks = {
  company: [
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Join with us", href: "/careers" },
    // { name: "Recruitment", href: "/recruitment" },
  ],
  services: [
    { name: "Marketing Services", href: "/services/marketing" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "IT Solutions", href: "/services/it-solutions" },
  ],
  ourCommunities: [
    { name: "WWA Blog", href: "/blog" },
    { name: "WWA Forum", href: "/forum" },
    { name: "WWA Magazine", href: "/magazine" },
    { name: "WWA Community", href: "/community" },
  ],
};

const Footer: React.FC = () => {
  return (
      <footer className="bg-white text-gray-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
            {/* About Section */}
            <div className="md:col-span-4 lg:col-span-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                We Will Australia
              </h3>
              <p className="mb-6 max-w-md">
                WWA is a thriving community where innovators, professionals, and
                enthusiasts come together to share knowledge, collaborate, and
                grow.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {social.icon}
                    </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className="hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-gray-800 mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => {
                  let hoverColor = "hover:text-blue-600"; // default
                  
                  if (link.name === "Marketing Services") {
                    hoverColor = "hover:text-purple-600";
                  } else if (link.name === "Recruitment") {
                    hoverColor = "hover:text-blue-600";
                  } else if (link.name === "IT Solutions") {
                    hoverColor = "hover:text-green-600";
                  }
                  
                  return (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className={`${hoverColor} transition-colors`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-gray-800 mb-4">Our communities</h4>
              <ul className="space-y-2">
                {footerLinks.ourCommunities.map((link) => (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className="hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-2 w-[250px]">
              <h4 className="font-bold text-gray-800 mb-4">Contact</h4>
              <ul className="space-y-3">
                {/*<li className="flex items-start">*/}
                {/*  <Phone*/}
                {/*      size={20}*/}
                {/*      className="mr-3 text-blue-600 flex-shrink-0"*/}
                {/*  />*/}
                {/*  <span>+61 426 874 741</span>*/}
                {/*</li>*/}
                <li className="flex items-start">
                  <Mail
                      size={20}
                      className="mr-3 text-blue-600 flex-shrink-0"
                  />
                  <span className="break-all">info@wewillaustralia.com.au</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-center items-center text-sm space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-center">
              &copy; {new Date().getFullYear()} We Will Australia. All rights
              reserved
            </p>
            <Link href="/policy-terms" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
  );
};

export default Footer;

