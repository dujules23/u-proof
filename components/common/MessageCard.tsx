// import { trimText } from "@/utils/helper";
// import { MessageDetail } from "@/utils/types";
// import Link from "next/link";
// import { FC } from "react";
// import dateformat from "dateformat";
// import slugify from "slugify";

// interface Props {
//   messageData: MessageDetail;
//   busy?: boolean;
//   controls?: boolean;
//   onDeleteClick?(): void;
// }

// const MessageCard: FC<Props> = ({
//   messageData,
//   controls = false,
//   busy,
//   onDeleteClick,
// }): JSX.Element => {
//   const { name, subject, message, createdAt } = messageData;

//   // const slug = slugify(subject.toLowerCase(), {
//   //   strict: true,
//   // });

//   // function that turns text to an image
//   // const textToImage = (message: string) => {
//   //   const canvas = document.createElement("canvas");
//   //   const ctx = canvas.getContext("2d");
//   //   ctx.font = "20px Arial";
//   //   ctx?.fillText(message, 10, 50);
//   //   const dataUrl = canvas.toDataURL();
//   //   return dataUrl;
//   // };

//   return (
//     <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full">
//       {/* Message */}
//       <Link href={"/"}>
//         <div className="dark:text-primary-light text-primary-dark">
//           {/* {trimText(message, 30)} */}
//           <img
//             className="p-2 rounded-md dark:bg-primary-light bg-gray-300"
//             src={trimText(message, 50)}
//           />
//         </div>
//       </Link>

//       <div className="font-bold dark:text-primary-light text-primary-dark mt-2">
//         {trimText(subject, 30)}
//       </div>

//       {/* Message Info */}
//       <div className="mt-8 p-2 flex-1 flex flex-col">
//         <Link href={"/"}>
//           <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
//             <div>{name}</div>
//             {dateformat(createdAt, "mm/dd/yy")}
//           </div>
//         </Link>

//         {busy ? (
//           <span className="animate-pulse">Removing</span>
//         ) : (
//           <>
//             {/* <div className="hover:underline">
//                   <Link href={"/admin/posts/update/" + slug}>Edit</Link>
//                 </div> */}
//             controls && (
//             <div className="hover:underline dark:text-primary-light text-primary-dark">
//               Delete
//             </div>
//             )
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageCard;

// components/MessageCard.tsx

import { trimText } from "@/utils/helper";
import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";
import dateformat from "dateformat";

interface Props {
  messageData: MessageDetail;
  controls?: boolean;
  busy?: boolean;
}

const MessageCard: FC<Props> = ({
  messageData,
  controls = false,
  busy = false,
}): JSX.Element => {
  const { name, subject, message, createdAt } = messageData;

  return (
    <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full">
      <Link href={"/"}>
        <div className="dark:text-primary-light text-primary-dark">
          {trimText(message, 30)}
        </div>
      </Link>

      <div className="font-bold dark:text-primary-light text-primary-dark mt-2">
        {trimText(subject, 30)}
      </div>

      <div className="mt-8 p-2 flex-1 flex flex-col">
        <Link href={"/"}>
          <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
            <div>{name}</div>
            {dateformat(createdAt, "mm/dd/yy")}
          </div>
        </Link>

        {busy ? (
          <span className="animate-pulse">Removing</span>
        ) : (
          controls && (
            <div className="hover:underline dark:text-primary-light text-primary-dark">
              Delete
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MessageCard;
