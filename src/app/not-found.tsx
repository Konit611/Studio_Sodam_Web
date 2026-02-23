import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-bold text-text-primary">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
      </p>
      <Link href="/" className="mt-6">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
