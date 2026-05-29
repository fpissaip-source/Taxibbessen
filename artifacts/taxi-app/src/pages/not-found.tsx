import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Page not found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button size="lg">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
