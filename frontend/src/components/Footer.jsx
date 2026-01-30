import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            in dicta quasi! Voluptatibus magni esse eveniet maxime, dicta nam
            distinctio sed alias dolorem, ut ex quos quae libero rerum tempore!
          </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5 text-primary">COMPANY</p>
            <ul className="flex flex-col gap-1 text-secondary">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5 text-primary">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-secondary">
                <li>+92303-3841541</li>
                <li>sajidmalik1661@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr className="border-color" />
        <p className="py-5 text-sm text-center text-secondary">Copyright 2025@ forever.com - All Right Reserved.</p>
        
      </div>
    </div>
  );
};

export default Footer;
