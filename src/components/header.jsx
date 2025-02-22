export default function Header({ toggleDark }) {
  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">KanjiCrypt</a>
          Encrypt your text with Kanji!
        </div>
        <div class="flex-none">
          {/* Dark mode toggle */}
          <input
            type="checkbox"
            className="toggle"
            defaultChecked
            onClick={toggleDark}
          />
        </div>
      </div>
      {/* <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">KanjiCrypt</a>
        <h2 className=" px-2">Encrypt your text with Kanji!</h2>
      </div> */}
    </>
  );
}
