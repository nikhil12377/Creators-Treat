import cx from 'classnames';
import dynamic from 'next/dynamic';
import styles from './VideoSection.module.scss';

const Video = dynamic(() => import('./Video'));

const HomePageVideoSection = () => {
  const videos = Array.from({ length: 13 }, (_, i) => `/videos/${i + 1}.mp4`);

  return (
    <div className={cx('flex justify-center items-center py-20', styles.container)}>
      <div className={styles.slideTrack}>
        {videos.map((video) => (
          <div className={styles.videoContainer} key={video}>
            <Video videoUrl={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageVideoSection;
