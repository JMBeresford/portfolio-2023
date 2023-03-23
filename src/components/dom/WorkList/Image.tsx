type Props = {
  fp: string;
  alt: string;
};

export function Image(props: Props) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <img src={props.fp} alt={props.alt} />
    </>
  );
}
