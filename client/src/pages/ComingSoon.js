import '../css/App.css';
import HomeNavigationBar from '../components/common/NavigationBar.jsx';
import WorkInProgress from '../components/common/WorkInProgress.jsx';
import Footer from '../components/common/Footer.jsx';

function ComingSoon() {
    return (
        <div className='h-full'>
            {/* Navigatin bar */}
            <HomeNavigationBar />

            {/* Work in progress image  */}
            <WorkInProgress />
          
            {/* Footer of the page */}
            <Footer />
        </div>
      );
}

export default ComingSoon;