'use client';

import Providers from 'components/Providers';

const Body = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <body>
      <Providers>{children}</Providers>
    </body>
  );
};

export default Body;
