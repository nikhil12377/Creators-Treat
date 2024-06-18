import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

import Link from 'next/link';
import LogoBig from 'svgComponents/LogoBig';

const HomePageHeader = () => {
  return (
    <Navbar position='static' isBlurred={false} height={'100px'} maxWidth='full' className='bg-transparent px-[20px]'>
      <NavbarContent className='hidden sm:flex'>
        <NavbarItem>
          <Link href='/' className='font-semibold px-2'>
            For Brands
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/' className='font-semibold px-2'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/' className='font-semibold px-2'>
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarBrand className='justify-center'>
        <LogoBig />
      </NavbarBrand>
      <NavbarContent justify='end' className='hidden sm:flex'></NavbarContent>
    </Navbar>
  );
};

export default HomePageHeader;
