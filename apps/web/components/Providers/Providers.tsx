import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Main from '../Main';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Main>{children}</Main>
    </NextUIProvider>
  );
};

export default Providers;
