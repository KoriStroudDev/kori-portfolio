"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  label: string;
  width: number;
  height: number;
  portrait?: boolean;
};

export function ZoomableShot({ shot, index }: { shot: Shot; index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const onBackdropClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  }, []);

  return (
    <figure className={`shot ${shot.portrait ? "shot-portrait" : "shot-landscape"}`}>
      <div className="shot-window">
        <div className="shot-window-bar">
          <span aria-hidden="true"><i /><i /><i /></span>
          <code>{shot.label}</code>
          <small>synthetic data</small>
        </div>
        <button className="shot-zoom" type="button" onClick={open} aria-label={`Enlarge screenshot ${index + 1}: ${shot.alt}`}>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 800px) 100vw, 60vw"
            unoptimized
          />
          <span className="shot-zoom-hint" aria-hidden="true">Click to enlarge</span>
        </button>
      </div>
      <figcaption><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{shot.caption}</figcaption>
      <dialog className="shot-dialog" ref={dialogRef} onClick={onBackdropClick} aria-label={`Enlarged screenshot: ${shot.alt}`}>
        <div className="shot-dialog-inner">
          <button className="shot-dialog-close" type="button" onClick={close}>Close ✕</button>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="95vw"
            unoptimized
          />
          <p>{shot.caption}</p>
        </div>
      </dialog>
    </figure>
  );
}
