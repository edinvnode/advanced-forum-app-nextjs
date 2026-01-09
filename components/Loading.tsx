import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/loading.gif"
        alt="Loading..."
        width={64}
        height={64}
        priority
      />
    </div>
  );
}
