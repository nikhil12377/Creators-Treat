const video = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <video autoPlay loop muted preload='auto' playsInline>
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
};

export default video;
