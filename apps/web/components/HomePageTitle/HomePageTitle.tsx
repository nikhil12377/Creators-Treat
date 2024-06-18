import cx from 'classnames';
import LoginWithFb from 'components/LoginWithFb';
import styles from './HomePageTitle.module.scss';

const HomePageTitle = () => {
  return (
    <section className={cx('relative flex justify-center items-center flex-col pt-44', styles.container)}>
      <h1 className='text-6xl mb-6 text-center'>All of you, The best of you!</h1>
      <p className='text-2xl font-normal'>With Tools you ❤️</p>
      <LoginWithFb />
    </section>
  );
};

export default HomePageTitle;
