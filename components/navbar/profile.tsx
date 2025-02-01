import Image from "next/image";
import { FC } from "react";

export const Profile: FC = () => {
  return (
    <div className="rounded-full border-2 border-secondary cursor-pointer">
      <Image
        src="/images/avatar.png"
        width={48}
        height={48}
        alt="avatar"
        className="rounded-full border-2 border-white"
      />
    </div>
  );
};
