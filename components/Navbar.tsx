import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center p-4 shadow-sm">
        <h2 className="text-primary font-bold">
          <Link href="/">JobRader</Link>
        </h2>
        <div className="flex gap-4 items-center">
          <Link href="/" className="cursor-pointer">
            Find Jobs
          </Link>
          <Link href="/" className="cursor-pointer">
            Post your resume
          </Link>
          <Link href="/" className="cursor-pointer">
            Recruiters
          </Link>
          <Link href="/" className="cursor-pointer">
            Sign in / Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
