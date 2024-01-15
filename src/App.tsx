import Container from "./components/layout/Container";
import Section from "./components/layout/Section";

function App() {
  return (
    <>
      <Section>
        <Container>
          <h1 className="text-4xl font-bold">Hello world!</h1>
        </Container>
        <nav className="w-full h-24 bg-slate-200 sticky top-0 flex-shrink-0">
          nav
        </nav>
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
