"use client";

import React, { useCallback, useRef, useState } from "react";
import { Volume, Volume1, Volume2 } from "lucide-react";
import IconContainer from "./IconContainer";

const VOLUME_ICONS = [
  <Volume key="volume-0" className="stroke-[#00d9a9] transition-all" />,
  <Volume1 key="volume-1" className="stroke-[#00d9a9] transition-all" />,
  <Volume2 key="volume-2" className="stroke-[#00d9a9] transition-all" />,
];


export const VolumeBtn = ({ audioUrl }: { audioUrl: string | null }) => {
  const [iconIndex, setIconIndex] = useState(2);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIconIndex(0);
    setTimeout(() => setIconIndex(1), 200);
    setTimeout(() => setIconIndex(2), 400);
  }, []);

  return (<>
    <IconContainer handleClick={playAudio}>
      {VOLUME_ICONS[iconIndex]}
    </IconContainer>
    {audioUrl && <audio ref={audioRef} src={audioUrl} />}
  </>
  );
};