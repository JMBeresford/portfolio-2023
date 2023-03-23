import { useRef, forwardRef, useImperativeHandle } from "react";
import { Nav } from "./Nav";
import { useStore } from "@/utils/state";

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"];

const Layout = forwardRef(({ children, ...props }: Props, ref) => {
  const localRef = useRef();
  const colorScheme = useStore(s => s.colors.colorScheme);

  useImperativeHandle(ref, () => localRef.current);

  return (
    <div id="root" {...props} ref={localRef}>
      <div className={`content ${colorScheme === "dark" ? "" : "light"}`}>
        <Nav />
        {children}
      </div>
    </div>
  );
});

Layout.displayName = "Layout";

export { Layout };
