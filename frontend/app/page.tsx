import Header from './Header';
import Footer from './Footer';
export default function Home() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-full bg-gray-200">
      <div className="p-4 min-h-dvh">
        <Header />
        <Footer />
      </div>
    </main>
  );
}
