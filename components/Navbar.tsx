import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b-1">
      <h2 className="font-bold">JobRader</h2>
      <div className="flex gap-2 items-center">
        <p>Post your resume</p>
        <p>Find Jobs</p>
        <p>Recruiters</p>
        <p>Sign in / Sign up</p>
      </div>
    </nav>
  );
};

export default Navbar;
