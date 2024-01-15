import Container from "./components/layout/Container";
import Section from "./components/layout/Section";

function App() {
  return (
    <>
      <Section>
        <Container>
          <h1 className="w-full col-span-3 text-4xl font-bold bg-red-500">
            Hello world!
          </h1>
          <h1 className="w-full col-span-9 text-4xl font-bold bg-blue-400">
            Hello world!
          </h1>
          <h1 className="w-full col-span-3 text-4xl font-bold bg-black">
            Hello world!
          </h1>
          <h1 className="w-full col-span-3 text-4xl font-bold bg-green-300">
            Hello world!
          </h1>
          <h1 className="w-full col-span-6 text-4xl font-bold bg-slate-500">
            Hello world!
          </h1>
          <h1 className="w-full col-span-12 text-4xl font-bold bg-slate-500">
            Hello world!
          </h1>
        </Container>
      </Section>
      <Section>
        <h2 className="text-4xl font-bold">skill tree</h2>
      </Section>
      <Section>
        <h2 className="text-4xl font-bold">projects deck</h2>
      </Section>
      <Section>
        <h2 className="text-4xl font-bold">lore</h2>
      </Section>
      <Section>
        <h2 className="text-4xl font-bold">/whisper</h2>
      </Section>
    </>
  );
}

export default App;
