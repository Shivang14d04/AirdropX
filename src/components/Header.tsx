import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Left side - Logo and Title */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-base">T</span>
        </div>

        {/* App Title */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          T-Sender
        </h1>

        {/* GitHub Link */}
        <a
          href="https://github.com/Shivang14d04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <FaGithub size={22} className="text-gray-700 hover:text-gray-900" />
        </a>
      </div>

      {/* Right side - Connect Wallet */}
      <div className="flex items-center space-x-4">
        <ConnectButton
          chainStatus="icon" // shows just the chain icon, cleaner look
          showBalance={false} // hides balance for a simpler header
          accountStatus="address" // displays address instead of avatar+ENS
        />
      </div>
    </header>
  );
}
