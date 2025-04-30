"use client";
import { ReactNode, Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  Transition,
  Portal,
} from "@headlessui/react";

interface DropdownProps {
  button: ReactNode;
  children: ReactNode;
}

export default function Dropdown({ button, children }: DropdownProps) {
  return (
    <Menu as="div" className="inline-block text-left">
      <MenuButton className="flex items-center focus:outline-none cursor-pointer">
        {button}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          anchor="top end"
          className="absolute left-10 ml-4 mb-4 w-48 bg-neutral-50 rounded-xl ring-1 ring-neutral-200 focus:outline-none z-50"
        >
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
