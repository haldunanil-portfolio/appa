import { Countdown } from "./components/Countdown";
import { BouncingPuppy } from "./components/BouncingPuppy";

export default function Home() {
  return (
    <div className="starfield min-h-screen flex flex-col">
      {/* Bouncing puppy - renders on top of everything */}
      <BouncingPuppy />

      {/* Scrolling marquee at top */}
      <marquee
        className="bg-[#000066] py-2 text-[var(--geo-cyan)] border-b-4 border-[#888888]"
        scrollamount={6}
      >
        ★☆★ Welcome to the ULTIMATE Appa Countdown Page!!! ★☆★ Your #1 source
        for Appa anticipation!!! ★☆★ Best viewed in Netscape Navigator ★☆★
      </marquee>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        {/* Broadway marquee heading */}
        <h1 className="broadway-marquee">Appa Countdown!!!</h1>

        {/* Countdown timer */}
        <Countdown />

        {/* Under construction and decorations */}
        <div className="flex flex-wrap gap-8 justify-center items-center mt-8">
          {/* Under Construction */}
          <div className="geo-box text-center">
            <img
              src="/under-contruction.gif"
              alt="Under Construction"
              width={100}
              height={50}
            />
            <p className="text-[var(--geo-hot-pink)] mt-2">
              More features coming soon!!!
            </p>
          </div>

          {/* Hit counter */}
          <div className="geo-box text-center">
            <p className="text-[var(--geo-cyan)]">You are visitor #</p>
            <p className="text-2xl font-bold text-[var(--geo-lime)]">
              000,042,069
            </p>
          </div>

          {/* Instagram Link */}
          <div className="geo-box text-center">
            <p className="text-[var(--geo-lime)]">📸 Follow Appa!</p>
            <p>
              <a
                href="https://www.instagram.com/appainthebigappa"
                target="_blank"
                rel="noopener noreferrer"
              >
                @appainthebigappa
              </a>
            </p>
            <p className="text-sm text-[var(--geo-hot-pink)] mt-2">
              on the Instagrams!!!
            </p>
          </div>
        </div>
      </main>

      {/* Footer marquee */}
      <marquee
        className="bg-[#000066] py-2 text-[var(--geo-hot-pink)] border-t-4 border-[#888888]"
        scrollamount={4}
        direction="right"
      >
        Made with ♥ and way too many animated GIFs ★ Copyright 1999 ★ Webmaster:
        appalover2000@geocities.com
      </marquee>
    </div>
  );
}
