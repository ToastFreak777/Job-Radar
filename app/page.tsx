import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <Searchbar />
        </div>
      </main>
      <Footer />
    </>
  );
}
