import { FC } from "react";

interface Props {}

const Message = ({ params }: { params: { slug: string } }): JSX.Element => {
  return <div>Message page {params.slug}</div>;
};

export default Message;
