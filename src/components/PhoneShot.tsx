import Image from "next/image";
import type { Screenshot } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
  shot: Screenshot;
  /** Hint for next/image so it serves a file sized for the frame, not the full capture. */
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * A screenshot in a phone-shaped frame. The frame is the only surface that uses a 2rem radius,
 * to match a phone's corners; it is a border around a real image, not a drawn device.
 * The aspect ratio is fixed at 9:19.5, so any portrait capture lines up; others are cropped
 * from the top.
 */
export default function PhoneShot({ shot, sizes, className, priority }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border-[6px] border-raised bg-surface shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] ring-1 ring-line",
        className,
      )}
    >
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
