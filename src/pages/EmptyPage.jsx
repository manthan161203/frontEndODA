import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Empty from '../components/Empty';

const EmptyPage = () => {
    return (
        <>
            <NavBar/>
            <Empty/>
            <Footer/>
        </>
    );
}

export default EmptyPage;