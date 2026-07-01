import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container grid min-h-[60vh] place-items-center text-center">
      <div>
        <Ghost className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-black">Lost in latent space</h1>
        <p className="mt-2 text-muted-foreground">
          This page doesn&apos;t exist — but plenty of learning does.
        </p>
        <Button asChild variant="gradient" className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
