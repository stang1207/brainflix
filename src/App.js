import Header from './components/Header/Header';
import MainVideo from './components/MainVideo/MainVideo';
import VideoDescription from './components/VideoDescription/VideoDescription';
function App() {
  return (
    <>
      <Header />
      <main className="main">
        <MainVideo />
        <div className="container">
          <VideoDescription />
        </div>
      </main>
    </>
  );
}

export default App;
