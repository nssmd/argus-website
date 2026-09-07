export type PixelScene =
  | "sample-bench"
  | "field-kit"
  | "relay-bridge"
  | "memory-garden"
  | "archive-cart"
  | "launch-dock";

export default function PixelIllustration({ scene }: { scene: PixelScene }) {
  return (
    <img
      className="pixel-illustration"
      src={`/art/pixel/${scene}.svg`}
      width={240}
      height={120}
      loading="lazy"
      decoding="async"
      alt=""
      data-inline-scene={scene}
    />
  );
}
