"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
}

export function AdUnit({
  slot,
  style,
  format = "auto",
  responsive = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Prevent multiple pushes
    if (!adRef.current) return;

    try {
      if (typeof window !== "undefined") {
        // @ts-expect-error — Google injects global adsbygoogle variable
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-4865858364709474"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
