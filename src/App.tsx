import Container from "./components/layout/Container";
import Nav from "./components/layout/Nav";
import Section from "./components/layout/Section";

function App() {
  return (
    <>
      <header className="flex flex-col h-svh">
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
        <Nav />
      </header>
      <Section>
        <Container>
          <h2 id="skills" className="text-4xl font-bold">
            skill tree
          </h2>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 id="projects" className="text-4xl font-bold">
            projects deck
          </h2>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 id="about" className="text-4xl font-bold">
            lore
          </h2>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 id="contact" className="text-4xl font-bold">
            /whisper
          </h2>
        </Container>
      </Section>
    </>
  );
}

export default App;
