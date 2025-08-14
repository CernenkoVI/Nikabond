'use client';

import React from "react";

interface MenuLinkProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick, href }) => {
  const classes =
    "cursor-pointer px-5 py-2 hover:bg-gray-100 transition rounded-xl text-lime-700 font-semibold block";

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={classes}>
      {label}
    </div>
  );
};

export default MenuLink;
