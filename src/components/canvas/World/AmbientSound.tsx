import { useStore } from "@/utils/state";
import { PositionalAudio } from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PositionalAudio as PositionalAudioType } from "three";

type Props = JSX.IntrinsicElements["positionalAudio"] & { startTime?: number };

export function AmbientSound(props: Props) {
  const ref = useRef<PositionalAudioType>();
  const muted = useStore(s => s.muted);
  const loaded = useStore(s => s.loaded);
  const { startTime, ...restProps } = props;

  const [inFocus, setInFocus] = useState<boolean>(true);

  useEffect(() => {
    const handler = (e: Event) => {
      setInFocus(!document.hidden);
    };

    document.addEventListener("visibilitychange", handler);

    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, []);

  useLayoutEffect(() => {
    if (loaded) {
      // ref.current.setVolume(1);
      ref.current.gain.gain.setValueAtTime(0, ref.current.context.currentTime);

      ref.current.play(startTime ?? 0);
    }
  }, [loaded, startTime]);

  useEffect(() => {
    if (!ref.current.isPlaying) return;
    if (!muted && inFocus) {
      const gain = ref.current.gain.gain;

      gain.setValueAtTime(gain.value, ref.current.context.currentTime);
      gain.linearRampToValueAtTime(0.25, ref.current.context.currentTime + 2);
    } else {
      const gain = ref.current.gain.gain;

      gain.setValueAtTime(gain.value, ref.current.context.currentTime);
      gain.linearRampToValueAtTime(0, ref.current.context.currentTime + 2);
    }
  }, [muted, inFocus]);

  return <PositionalAudio ref={ref} url="/audio/ambient.mp3" loop {...restProps} />;
}
