import Button from "./components/Button";

export default function Home() {
  return (
    <div className="w-full h-[70%]">
      <p className="text-3xl mb-6">Projects:</p>
      <div className="flex flex-wrap gap-20">
        <Button name="Syntax Checker" path="/syntaxChecker" learning="Stack" />
        <Button
          name="Date Idea Generator"
          path="/dateIdea"
          learning="Queue, useCallback, Flowbite"
        />
      </div>
    </div>
  );
}
