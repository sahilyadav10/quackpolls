import Image from "next/image";

export default function EmptyState({ button }: { button: React.ReactElement }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/empty-state.png"
        alt="No Polls"
        width={300}
        height={300}
        className=""
      />

      {button}
    </div>
  );
}
