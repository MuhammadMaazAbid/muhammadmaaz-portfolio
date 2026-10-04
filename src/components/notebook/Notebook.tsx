import { useEffect, useRef, useState, type CSSProperties } from "react";
import { chapters } from "./chapters";
import { CoverTitle } from "./page-elements";
import {
  ArrowDown,
  ArrowUpRight,
  RotateCcw,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import "../../notebook.css";

// Distances are viewport heights, independent of the number of chapters.
const TURN_START = 6;
const TURN_DURATION = 1.2;
const CHAPTER_INTERVAL = 2.2;
const CLOSE_START = TURN_START + (chapters.length - 2) * CHAPTER_INTERVAL + TURN_DURATION + 1.3;
const CLOSE_DURATION = 1.6;
const JOURNEY_LENGTH = CLOSE_START + CLOSE_DURATION + 1;
const chapterPosition = (index: number) =>
  index === 0 ? 5.6 : TURN_START + (index - 1) * CHAPTER_INTERVAL + TURN_DURATION + 0.35;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function Notebook() {
  const [restarting, setRestarting] = useState(false);
  const [copied, setCopied] = useState(false);
  const resetMotion = useRef<() => void>(() => {});
  const restartTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cover = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const journey = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const leaves = useRef<(HTMLDivElement | null)[]>([]);
  const chapterNav = useRef<HTMLElement>(null);
  const book = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px), (prefers-reduced-motion: reduce)");
    const timers = restartTimers.current;
    let frame = 0;
    let position = -journey.current!.getBoundingClientRect().top / stage.current!.clientHeight;
    let previousTime = 0;
    let targetTime = 0;
    const video = camera.current;
    const seek = () => {
      if (!video || video.readyState < 2 || video.seeking) return;
      if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
    };
    video?.addEventListener("seeked", seek);
    video?.addEventListener("loadeddata", seek);
    const update = (now: number) => {
      frame = 0;
      if (!journey.current || !stage.current || !book.current) return;
      const height = stage.current.clientHeight;
      const target = Math.max(
        0,
        Math.min(JOURNEY_LENGTH, -journey.current.getBoundingClientRect().top / height),
      );
      const delta = Math.min(64, now - previousTime || 16);
      previousTime = now;
      position = media.matches
        ? target
        : position + (target - position) * (1 - Math.exp(-delta / 110));
      if (Math.abs(target - position) < 0.001) position = target;
      const rise = ease((position - 0.25) / 3);
      const dive = ease((position - 3.5) / 1.8);
      const enter = ease((position - 4.65) / 0.65);
      const close = ease((position - CLOSE_START) / CLOSE_DURATION);
      stage.current.style.setProperty("--close", String(close));
      stage.current.style.setProperty(
        "--ending",
        String(ease((position - CLOSE_START + 0.45) / 0.3)),
      );
      if (cover.current) cover.current.inert = !media.matches && close < 0.98;
      targetTime = media.matches ? 0 : rise * Math.max(0, (video?.duration || 8) - 1 / 24);
      seek();
      stage.current.style.setProperty("--rise", String(rise));
      stage.current.style.setProperty("--enter", String(enter));
      stage.current.style.setProperty(
        "--ink",
        String(ease((position - 3.25) / 0.45) * (1 - enter)),
      );
      stage.current.style.setProperty("--progress", String(position / JOURNEY_LENGTH));
      if (hero.current) hero.current.inert = !media.matches && rise > 0.55;
      book.current.inert = !media.matches && enter < 0.8;
      let active = 0;
      leaves.current.forEach((leaf, index) => {
        if (!leaf) return;
        const turn = ease((position - TURN_START - index * CHAPTER_INTERVAL) / TURN_DURATION);
        leaf.style.setProperty("--turn", String(turn));
        leaf.style.zIndex = String(
          turn > 0 && turn < 1
            ? chapters.length + 2
            : turn === 1
              ? index + 1
              : chapters.length - index,
        );
        if (turn >= 0.5) active = index + 1;
      });
      book.current.querySelectorAll<HTMLElement>("[data-page]").forEach((page) => {
        page.inert =
          !media.matches && (Math.floor(Number(page.dataset.page) / 2) !== active || close > 0.05);
      });
      chapterNav.current?.querySelectorAll<HTMLButtonElement>("button").forEach((button, index) => {
        if (index + 1 === active) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      const width = stage.current.clientWidth;
      const imageScale = Math.max(width / 1920, height / 1080);
      const sourceWidth = 724 * imageScale;
      const sourceHeight = 410 * imageScale;
      const finalWidth = Math.min(width * 0.88, (height * 0.78 * 724) / 410);
      const zoom = 1 + dive * (finalWidth / sourceWidth - 1);
      const centerY = height / 2 - 78 * imageScale;
      const centerX = width / 2 + 10 * imageScale;
      const moveX = dive * (width / 2 - centerX);
      const moveY = dive * (height * 0.51 - centerY);
      const vars: Record<string, string> = {
        "--camera-zoom": String(zoom),
        "--book-width": sourceWidth * zoom + "px",
        "--book-height": sourceHeight * zoom + "px",
        "--camera-origin-x": centerX + "px",
        "--camera-origin-y": centerY + "px",
        "--camera-x": moveX + "px",
        "--camera-y": moveY + "px",
        "--book-x": centerX + moveX + "px",
        "--book-y": centerY + moveY + "px",
      };
      Object.entries(vars).forEach(([key, value]) => stage.current!.style.setProperty(key, value));
      if (position !== target && !media.matches) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(update);
      }
    };
    resetMotion.current = () => {
      position = 0;
      previousTime = performance.now();
      window.scrollTo({ top: 0, behavior: "instant" });
      update(performance.now());
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      video?.removeEventListener("seeked", seek);
      video?.removeEventListener("loadeddata", seek);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
  const openChapter = (index: number) => {
    if (!journey.current || !book.current || !stage.current) return;
    if (window.matchMedia("(max-width: 800px), (prefers-reduced-motion: reduce)").matches) {
      book.current
        .querySelector<HTMLElement>('[data-page="' + index * 2 + '"]')
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    window.scrollTo({
      top: journey.current.offsetTop + stage.current.clientHeight * chapterPosition(index),
      behavior: "smooth",
    });
  };
  const openBook = () => openChapter(1);
  const openContact = () => {
    if (!journey.current || !stage.current || !cover.current) return;
    if (window.matchMedia("(max-width: 800px), (prefers-reduced-motion: reduce)").matches) {
      cover.current.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({
        top:
          journey.current.offsetTop +
          stage.current.clientHeight * (CLOSE_START + CLOSE_DURATION + 0.3),
        behavior: "smooth",
      });
    }
  };
  const restart = () => {
    if (restarting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resetMotion.current();
      heading.current?.focus({ preventScroll: true });
      return;
    }
    setRestarting(true);
    restartTimers.current.push(
      setTimeout(() => {
        resetMotion.current();
        heading.current?.focus({ preventScroll: true });
        restartTimers.current.push(setTimeout(() => setRestarting(false), 300));
      }, 280),
    );
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("muhammadmaaz153@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const page = (chapterIndex: number, side: "left" | "right", className: string) => {
    const number = chapterIndex * 2 + (side === "right" ? 1 : 0);
    return (
      <div
        className={"nb-paper " + className}
        data-page={number}
        style={{ "--page-order": number } as CSSProperties}
      >
        {chapters[chapterIndex][side]}
        <span className="nb-page-number">
          {String(number + 1).padStart(2, "0")} — {chapters[chapterIndex].label}
        </span>
      </div>
    );
  };
  return (
    <div className="notebook-experience" id="opening">
      <a
        className="nb-skip"
        href="#insightify"
        onClick={(event) => {
          event.preventDefault();
          openBook();
        }}
      >
        Skip to the project
      </a>
      <header className="nb-nav">
        <a
          href="#opening"
          onClick={(event) => {
            event.preventDefault();
            restart();
          }}
          aria-label="Back to opening"
        >
          MUHAMMAD MAAZ
        </a>
        <nav aria-label="Main navigation">
          <button onClick={openBook}>Work</button>
          <button onClick={() => openChapter(chapters.length - 1)}>About</button>
          <button onClick={openContact}>
            Contact <ArrowUpRight size={14} />
          </button>
        </nav>
      </header>
      <div
        className="nb-journey"
        ref={journey}
        style={{ "--journey-height": (JOURNEY_LENGTH + 1) * 100 + "svh" } as CSSProperties}
      >
        <div className="nb-stage" ref={stage}>
          <img
            className="nb-scene"
            src="/notebook/studio.webp"
            alt="An imagined workspace with Maaz in his sage shirt, pencil and notebook in hand"
            fetchPriority="high"
          />
          <div className="nb-camera" aria-hidden="true">
            <video ref={camera} muted playsInline preload="auto" poster="/notebook/studio.webp">
              <source src="/notebook/camera.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="nb-shade" />
          <div className="nb-end-shade" />
          <div className="nb-ink" aria-hidden="true">
            <div>
              <CoverTitle />
            </div>
          </div>
          <div className="nb-intro" ref={hero}>
            <p className="nb-eyebrow">A FEW QUESTIONS. A LOT OF POSSIBILITIES.</p>
            <h1 ref={heading} tabIndex={-1}>
              I ask questions
              <br />
              that move
              <br />
              <span>ideas forward.</span>
            </h1>
            <p className="nb-description">
              I’m Maaz. I explore ideas, build useful things, and learn from the people they reach.
            </p>
            <p className="nb-disciplines">GROWTH · DEVELOPMENT · EXPERIMENTATION</p>
            <div className="nb-actions">
              <button onClick={openBook}>
                Explore my work <ArrowUpRight size={18} />
              </button>
              <button className="nb-meet" onClick={() => openChapter(chapters.length - 1)}>
                Meet Maaz <ArrowUpRight size={17} />
              </button>
            </div>
            <button className="nb-scroll" onClick={openBook}>
              Scroll to open my notebook <ArrowDown size={17} />
            </button>
          </div>
          <section
            className="nb-book"
            id="insightify"
            ref={book}
            aria-label="Maaz’s notebook: projects and stories"
          >
            {page(0, "left", "nb-base-left")}
            {chapters.slice(0, -1).map((chapter, index) => (
              <div
                className="nb-leaf"
                key={chapter.id}
                ref={(element) => {
                  leaves.current[index] = element;
                }}
              >
                {page(index, "right", "nb-face-front")}
                {page(index + 1, "left", "nb-face-back")}
              </div>
            ))}
            {page(chapters.length - 1, "right", "nb-base-right")}
            <div className="nb-closing-leaf">
              <div className="nb-cover-inside nb-paper" aria-hidden="true">
                {chapters[chapters.length - 1].left}
              </div>
              <div className="nb-cover-outside" id="contact-cover" ref={cover}>
                <p className="nb-cover-name">MUHAMMAD MAAZ / FIELD NOTES</p>
                <div className="nb-cover-identity">
                  <span className="nb-cover-rule" />
                  <h2>Polymath</h2>
                  <p>
                    Curiosity is the
                    <br />
                    common thread.
                  </p>
                  <span className="nb-cover-rule" />
                </div>
                <div className="nb-cover-contact">
                  <p>LET’S WRITE THE NEXT CHAPTER.</p>
                  <nav aria-label="Contact Maaz" className="nb-socials">
                    <a
                      href="https://www.linkedin.com/in/muhammad-maaz-a37690271/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={22} aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/MuhammadMaazAbid" target="_blank" rel="noreferrer">
                      <Github size={22} aria-hidden="true" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.instagram.com/muhammad__maaz_/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram size={22} aria-hidden="true" />
                      <span>Instagram</span>
                    </a>
                    <a href="mailto:muhammadmaaz153@gmail.com">
                      <Mail size={22} aria-hidden="true" />
                      <span>Email</span>
                    </a>
                  </nav>
                  <div className="nb-email-row">
                    <a href="mailto:muhammadmaaz153@gmail.com">muhammadmaaz153@gmail.com</a>
                    <button onClick={copyEmail} aria-label="Copy email address">
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>
                  <span className="nb-copy-status" role="status">
                    {copied ? "Email address copied" : ""}
                  </span>
                </div>
                <button className="nb-restart" onClick={restart}>
                  Back to the beginning <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </section>
          <nav className="nb-chapters" aria-label="Notebook chapters" ref={chapterNav}>
            <span>TURN TO</span>
            {chapters.slice(1).map((chapter, index) => (
              <button key={chapter.id} onClick={() => openChapter(index + 1)}>
                {chapter.label}
              </button>
            ))}
          </nav>
          <div className="nb-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div
        className={"nb-restart-curtain" + (restarting ? " is-visible" : "")}
        aria-hidden="true"
      />
    </div>
  );
}
