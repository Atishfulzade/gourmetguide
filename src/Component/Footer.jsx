import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-fit p-10 flex-col bg-red-200 flex gap-10 justify-center items-center">
      <div className="flex flex-col">
        <h1 className="logo text-red-600 cursive md:text-3xl text-sm select-none">
          Gourmet<span className="text-black cursive">Guide</span>
        </h1>
      </div>
      <p>
        &copy; 2023 Gourmet Guide. All rights reserved. Made with ❤️ by Atish
        Fulzade
      </p>
    </footer>
  );
};

export default Footer;
