import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from "./component/Header";
import {Container} from 'react-bootstrap'
import Footer from "./component/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from './screen/ProductScreen';

function App() {
  return (
 <Router>
   <Header />
   
   <main className="py-3">
    <Container>
    <Routes>
    <Route path='/' element={<HomeScreen />} />
    <Route path='/product/:id' element={<ProductScreen />} />
    </Routes>
    </Container>

   </main>
 
   <Footer />
   </Router>
  );
}

export default App;
