import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="group relative rounded-lg border p-4 hover:bg-muted transition-colors">
        <div className="flex flex-col space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold">{title}</h3>
            <div className="text-sm text-muted-foreground">{dates}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {description}
          </div>
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
