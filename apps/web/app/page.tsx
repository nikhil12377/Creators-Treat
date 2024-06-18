import dynamic from 'next/dynamic';

const HomePageHeader = dynamic(() => import('components/HomePageHeader'));
const HomePageTitle = dynamic(() => import('components/HomePageTitle'));
const HomePageVideoSection = dynamic(() => import('components/HomePageVideoSection'));

const App = () => (
  <>
    <HomePageHeader />
    <HomePageTitle />
    <HomePageVideoSection />
  </>
);

export default App;
