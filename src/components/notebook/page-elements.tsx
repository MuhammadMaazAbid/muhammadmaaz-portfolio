import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Photo({
  src,
  caption,
  portrait = false,
}: {
  src: string;
  caption: string;
  portrait?: boolean;
}) {
  return (
    <figure className={`nb-photo${portrait ? " nb-portrait" : ""}`}>
      <a
        href={`/notebook/${src}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Enlarge: ${caption}`}
      >
        <img src={`/notebook/${src}`} alt={caption} decoding="async" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function ProjectImage({ name, src }: { name: string; src: string }) {
  return (
    <a
      className="nb-product"
      href={`/notebook/${src}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enlarge ${name} interfaces`}
    >
      <img src={`/notebook/${src}`} alt={`${name} interface showcase`} decoding="async" />
      <span>
        Explore the screens <ArrowUpRight size={14} />
      </span>
    </a>
  );
}

export function Visit({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="nb-project-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}

export function CoverTitle() {
  return (
    <h2 className="nb-cover-title">
      Figuring
      <br />
      things out
      <br />
      <em>faster than AI.</em>
    </h2>
  );
}
