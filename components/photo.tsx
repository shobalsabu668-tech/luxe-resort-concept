import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/format";

type Props = {
  name: PhotoKey;
  /** Responsive `sizes` hint — describe how wide the image renders. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Encoder quality; 60 suits large, dark, soft images such as the hero. */
  quality?: 60 | 75;
  /** Clip-reveal on scroll (see globals.css). */
  reveal?: boolean;
  /** Override alt, e.g. "" when the image is purely decorative beside a caption. */
  alt?: string;
  /** CSS object-position, e.g. "50% 70%" to keep a horizon in frame. */
  position?: string;
  style?: React.CSSProperties;
};

/**
 * A photograph filling its box. The box sets the aspect ratio; the image is
 * cropped to it with object-fit, blurred-up from a 16px placeholder, and
 * served as AVIF/WebP at the right size by next/image.
 */
export function Photo({ name, sizes, className, imgClassName, priority, quality, reveal, alt, position, style }: Props) {
  const p = photos[name];
  return (
    <div className={cn("photo", className)} data-reveal={reveal ? "clip" : undefined} style={style}>
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className={imgClassName}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
