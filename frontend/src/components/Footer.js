import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800  sm:mt-10 pt-10">
      <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <img src="assets/Logo.jpg" alt="Logo de votre entreprise" />
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Contactez-nous
          </div>
          <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700" href="mailto:contact@votreentreprise.com">novway@gmail.com</a>
          <p className="text-gray-800 my-2">T :+ (212) 5 20 47 76 00</p>
          
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Suivez-nous
          </div>
          <div className="flex flex-wrap">
            <a className="mr-5 hover:text-gray-100 duration-700" href="https://www.facebook.com/novway.innovation.addict?mibextid=LQQJ4d">
              <FaFacebook className="text-gray-400 hover:text-gray-300 duration-700" />
            </a>
            <a className="mr-5 hover:text-gray-100 duration-700" href="https://twitter.com/Novway_?s=20">
              <FaTwitter className="text-gray-400 hover:text-gray-300 duration-700" />
            </a>
            <a className="mr-5 hover:text-gray-100 duration-700" href="https://www.linkedin.com/company/novway/">
              <FaLinkedin className="text-gray-400 hover:text-gray-300 duration-700" />
            </a>
          </div>
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Informations légales
          </div>
          <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700" href="#">Politique de confidentialité</a>
          <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700" href="#">Conditions d'utilisation</a>
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
          Novway Innovation Addict 2023
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

