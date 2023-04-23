import { useStore } from "@/utils/state";
import { PositionalAudio } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useLayoutEffect, useRef } from "react";
import { PositionalAudio as PositionalAudioType } from "three";
import { randFloat } from "three/src/math/MathUtils";

type Props = JSX.IntrinsicElements["positionalAudio"];

export function BoopSound(props: Props) {
  const ref = useRef<PositionalAudioType>();
  const muted = useStore(s => s.muted);
  const hovering = useStore(s => s.hovering);

  useLayoutEffect(() => {
    ref.current.setVolume(0.25);
  }, []);

  useLayoutEffect(() => {
    if (hovering && !muted && ref.current != undefined) {
      if (ref.current.isPlaying) {
        ref.current.stop();
      }

      ref.current.setPlaybackRate(randFloat(1.0, 1.15));
      ref.current.play();
    }
  }, [hovering, muted]);

  return <PositionalAudio ref={ref} url="/audio/boop.mp3" loop={false} {...props} />;
}
