import SearchForm from "@/components/SearchForm/SearchForm";

export default function Home() {
  return (
    <>
      <main>
        <div className="wrapper">
          <SearchForm variant={"home"} />
        </div>
      </main>
    </>
  );
}
