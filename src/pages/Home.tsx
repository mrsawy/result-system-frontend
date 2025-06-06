import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Newsletter } from '@/components/Newsletter';
import Results from './Results';

function Home() {
    return (
        <>
            <Hero />
            <Results />
            <About />
            <Newsletter />
         
        </>
    );
}

export default Home;