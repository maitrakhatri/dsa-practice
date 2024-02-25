export default function Footer() {
  return (
    <div className="fixed bottom-0 flex flex-col justify-center items-center my-4">
      <h1 className="font-bold font-mono text-blue-950 text-xl">
        maitra learns dsa
      </h1>
      <p>
        maitra likes practical stuff, here's the
        <a
          href="https://github.com/maitrakhatri/dsa-practice"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold cursor-pointer"
        >
          {" "}
          github repo{" "}
        </a>
        for this page
      </p>
    </div>
  );
}
