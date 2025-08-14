import AdvancedFilters from "./components/AdvancedFilters";
import ActorsList from "./components/actors/ActorsList";

export default function Home() {
  return (
      <main className="max-w-[1500px] mx-auto px-6">
        
        <AdvancedFilters />

        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
          <ActorsList />
        </div>

      </main>

  );
}
