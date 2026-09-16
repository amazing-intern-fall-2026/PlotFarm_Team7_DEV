/**
 * HlsVideoPlayer — phát HLS stream (.m3u8).
 *
 * - Safari: native HLS qua src attribute
 * - Chrome/Firefox: dùng hls.js (pre-bundled qua Vite optimizeDeps)
 * - Không có streamUrl / stream lỗi: fallback về <img>
 */
import * as React from "react";
import Hls, { type ErrorData, Events } from "hls.js";

export interface HlsVideoPlayerProps {
  /** URL stream HLS (.m3u8). Null/undefined → hiển thị ảnh fallback */
  streamUrl: string | null | undefined;
  /** URL ảnh fallback khi không có stream hoặc stream lỗi */
  fallbackImageUrl?: string;
  /** Alt text cho ảnh fallback */
  alt?: string;
  className?: string;
  /** Callback khi stream bị lỗi hoàn toàn */
  onStreamError?: () => void;
}

export function HlsVideoPlayer({
  streamUrl,
  fallbackImageUrl,
  alt = "Camera trực tiếp",
  className,
  onStreamError,
}: HlsVideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hlsRef = React.useRef<Hls | null>(null);
  const [streamFailed, setStreamFailed] = React.useState(false);

  React.useEffect(() => {
    if (!streamUrl || streamFailed) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Safari — hỗ trợ HLS native
    if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = streamUrl;
      videoEl.play().catch(() => {
        /* autoplay bị chặn bởi trình duyệt — không sao */
      });
      return;
    }

    // Chrome / Firefox — cần hls.js
    if (!Hls.isSupported()) {
      setStreamFailed(true);
      onStreamError?.();
      return;
    }

    const hls = new Hls({ lowLatencyMode: true, maxBufferLength: 10 });
    hlsRef.current = hls;

    hls.loadSource(streamUrl);
    hls.attachMedia(videoEl);

    hls.on(Events.MANIFEST_PARSED, () => {
      videoEl.play().catch(() => {
        /* autoplay bị chặn — user sẽ click play thủ công */
      });
    });

    hls.on(Events.ERROR, (_event: Events.ERROR, data: ErrorData) => {
      if (data.fatal) {
        setStreamFailed(true);
        onStreamError?.();
        hls.destroy();
      }
    });

    return () => {
      hls.destroy();
      hlsRef.current = null;
    };
  }, [streamUrl, streamFailed, onStreamError]);

  // Không có stream hoặc stream lỗi → fallback về ảnh
  if (!streamUrl || streamFailed) {
    if (!fallbackImageUrl) return null;
    return <img src={fallbackImageUrl} alt={alt} className={className} />;
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      playsInline
      aria-label={alt}
    />
  );
}
