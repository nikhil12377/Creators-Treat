'use client';

import { Button } from '@nextui-org/button';
import NavbarContent from 'components/NavbarContent';
import NavbarItem from 'components/NavbarItem';
import Link from 'next/link';

const LoginSignup = () => {
  return (
    <NavbarContent justify='end'>
      <NavbarItem>
        <Link href='/login'>Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button color='primary' variant='solid'>
          Sign up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default LoginSignup;
