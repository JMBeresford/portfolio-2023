import { useStore } from "./state";

const handlePointerEnter = () => {
  useStore.setState({ hovering: true });
};

const handlePointerLeave = () => {
  useStore.setState({ hovering: false });
};

export const hoverHandlers = {
  onPointerEnter: handlePointerEnter,
  onPointerLeave: handlePointerLeave,
};

export function sphericalToCartesian(
  r: number,
  theta: number,
  phi: number,
): [number, number, number] {
  const x = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.cos(theta);
  return [x, y, -z];
}
