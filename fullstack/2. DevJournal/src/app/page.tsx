import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center m-20">
        <h1 className="text-5xl"> DevJournal </h1>
      </div>

      <div className="flex gap-15 m-20 text-blue-600 ">
        <Link href="/login"> login here </Link>
        <Link href="/register"> register here </Link>
      </div>
    </div>
  );
}
