/*
  Surface textures for the "engineer's drawing table in morning light" world.
  All procedural (SVG filters + CSS gradients): no image requests, rasterised once by the
  browser, aria-hidden and pointer-events-none. Each layer is masked so it fades out
  before it reaches content edges.
*/

const INK = "#0b2640"

const svg = (body: string, w: number, h: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`
  )}")`

/** Fine paper grain. Seamless tile. */
export const grainTile = svg(
  `<filter id='g' x='0' y='0' width='100%' height='100%'>
     <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
     <feColorMatrix values='0 0 0 0 0.04  0 0 0 0 0.15  0 0 0 0 0.25  0 0 0 1.6 -0.55'/>
   </filter>
   <rect width='100%' height='100%' filter='url(#g)'/>`,
  180,
  180
)

/** Survey contour lines: vector tiles in /public/textures, generated from a seamless noise field. */
const contourTile = (name: "a" | "b") => `url("/textures/contours-${name}.svg")`

const maskStyle = (mask: string): React.CSSProperties => ({
  maskImage: mask,
  WebkitMaskImage: mask,
})

type Variant = "contours" | "contours-alt" | "dots" | "grid" | "sunrise" | "sunrise-low"

/** A decorative texture layer. Place inside a `relative` (and usually `isolate`) section. */
export function Texture({ variant, className = "", mask }: { variant: Variant; className?: string; mask?: string }) {
  const base = `pointer-events-none absolute inset-0 -z-10 ${className}`

  switch (variant) {
    case "contours":
    case "contours-alt":
      return (
        <div
          aria-hidden
          className={base}
          style={{
            backgroundImage: variant === "contours" ? contourTile("a") : contourTile("b"),
            backgroundSize: "1200px 1200px",
            opacity: 0.11,
            ...maskStyle(mask ?? "radial-gradient(120% 90% at 50% 45%, #000 30%, transparent 85%)"),
          }}
        />
      )
    case "dots":
      return (
        <div
          aria-hidden
          className={base}
          style={{
            backgroundImage: `radial-gradient(circle at center, ${INK} 1px, transparent 1.4px)`,
            backgroundSize: "24px 24px",
            opacity: 0.12,
            ...maskStyle(mask ?? "radial-gradient(70% 70% at 50% 40%, #000 20%, transparent 80%)"),
          }}
        />
      )
    case "grid":
      // Cutting-mat grid: minor lines every 24px, major every 120px.
      return (
        <div
          aria-hidden
          className={base}
          style={{
            backgroundImage: [
              `linear-gradient(to right, ${INK}1f 1px, transparent 1px)`,
              `linear-gradient(to bottom, ${INK}1f 1px, transparent 1px)`,
              `linear-gradient(to right, ${INK}0d 1px, transparent 1px)`,
              `linear-gradient(to bottom, ${INK}0d 1px, transparent 1px)`,
            ].join(","),
            backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
            backgroundPosition: "-1px -1px",
            ...maskStyle(mask ?? "linear-gradient(to bottom, transparent, #000 12%, #000 85%, transparent)"),
          }}
        />
      )
    case "sunrise":
      return (
        <div
          aria-hidden
          className={base}
          style={{
            backgroundImage: [
              "radial-gradient(60% 55% at 82% 8%, rgba(232,98,44,0.14), transparent 70%)",
              "radial-gradient(40% 40% at 95% 30%, rgba(255,196,120,0.18), transparent 70%)",
              "radial-gradient(50% 60% at 5% 100%, rgba(30,140,90,0.06), transparent 70%)",
            ].join(","),
          }}
        />
      )
    case "sunrise-low":
      return (
        <div
          aria-hidden
          className={base}
          style={{
            backgroundImage: [
              "radial-gradient(70% 60% at 50% 100%, rgba(232,98,44,0.16), transparent 70%)",
              "radial-gradient(45% 45% at 20% 90%, rgba(255,196,120,0.22), transparent 70%)",
              "radial-gradient(40% 40% at 85% 85%, rgba(30,140,90,0.06), transparent 70%)",
            ].join(","),
          }}
        />
      )
  }
}

/** Page-wide paper grain. Fixed and non-interactive so it never repaints with scroll. */
export function PaperGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] print:hidden"
      style={{ backgroundImage: grainTile, backgroundSize: "180px 180px" }}
    />
  )
}
