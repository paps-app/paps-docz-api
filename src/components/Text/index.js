/* @flow */
import * as React from "react";

type Props = {
  fsize: number,
  children: React.Node
};

const Text = ({ fsize, children }: Props) => (
  <p style={{ fontSize: `${fsize}em`, lineHeight: 1.8 }}>{children}</p>
);

export default Text;
