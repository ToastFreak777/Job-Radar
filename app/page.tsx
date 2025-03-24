import SearchForm from "@/components/SearchForm";

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
