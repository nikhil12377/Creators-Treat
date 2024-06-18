import { metadata, viewport } from 'components/Body/metadata';
import { Inter } from 'next/font/google';

import cx from 'classnames';
import Body from 'components/Body';
import 'styles/global.scss';
import 'styles/output.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en' className={cx('light', inter.className)}>
      <head>
        <link rel='icon' href='/images/Logo.ico' sizes='any' />
      </head>
      <Body>{children}</Body>
    </html>
  );
};

export default RootLayout;
export { metadata, viewport };
