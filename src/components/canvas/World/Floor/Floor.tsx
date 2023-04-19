type Props = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
};

export function Floor(props: Props) {
  const { children, ...restProps } = props;

  return (
    <group {...restProps}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={10}>
        <planeGeometry args={[100, 100]} />
        {children}
      </mesh>
    </group>
  );
}
