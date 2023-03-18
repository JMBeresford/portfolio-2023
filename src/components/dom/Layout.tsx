import { useRef, forwardRef, useImperativeHandle } from "react";
import { Nav } from "./Nav";

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"];

const Layout = forwardRef(({ children, ...props }: Props, ref) => {
  const localRef = useRef();

  useImperativeHandle(ref, () => localRef.current);

  return (
    <div id="root" {...props} ref={localRef}>
      <div className="content">
        <Nav />
        {children}
      </div>
    </div>
  );
});

Layout.displayName = "Layout";

export { Layout };
