import Image from "next/image";
import Link from "next/link";
import { Tags } from "../components/tags";

type Project = {
  title: string;
  description: string;
  image: string; // put in /public/images/projects/...
  href?: string; // live/demo
  github?: string;
  year?: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    title: "UNSW Bionic Heart",
    description:
      "Built a mobile app and React website to support patients and clinicians with artificial heart post-implant monitoring and communication.",
    image: "/images/projects/mbh/IMG_9343.jpeg",
    href: "https://www.unsw.edu.au/news/2025/12/UNSW-students-artificial-heart-competition-win",
    year: "Ongoing",
    tags: ["UI/UX", "Mobile Dev", "Web Dev"],
  },
  {
    title: "Inferring Tumour Heterogeneity using scRNAseq",
    description:
      "Developed a computational framework to infer tumour heterogeneity by integrating somatic mutations, copy number variation, and gene expression.",
    image: "/images/projects/honours/41467_2024_51026_Fig1_HTML.png.webp",
    year: "Ongoing",
    tags: ["Bioinformatics", "Data Analysis", "Research"],
  },
  {
    title: "ZeroDash",
    description:
      "Developed analytical tools including t-SNE plot visualisation, zero-expression viewer, and HTS waterfall plot views for ZeroDash.",
    image: "/images/projects/zerodash/Screenshot 2568-12-20 at 08.56.23.png",
    year: "2025",
    tags: ["Web Dev", "Bioinformatics", "Data Visualisation"],
  },
  {
    title: "Dynamic Consent Platform",
    description:
      "Designed and built a notification system for a dynamic consent platform supporting research participation, with scalable AWS-backed services and a React frontend.",
    image: "/images/projects/DCP/dashboard.png",
    year: "2024",
    tags: ["Web Dev", "Cloud"],
  },
  {
    title: "Plotholes Detection",
    description:
      "Trained and evaluated a segmentation model to detect potholes and measure performance on real world images.",
    image: "/images/projects/plotholes/IMG_4.jpeg",
    github: "https://github.com/biodatlab/learnai-potholes-detection",
    year: "2023",
    tags: ["ML", "Python"],
  },
  {
    title: "CTCA Imaging",
    description:
      "Converted CTCA images into videos for analysis and trained a point-tracking model to follow motion across frames.",
    image: "/images/projects/CTCA/IMG_4858.jpeg",
    year: "2023",
    tags: ["ML", "Python"],
  },
  {
    title: "Galaxa",
    description:
      "Co-founded a startup and worked across product lifecycle for city exploration platform.",
    image:
      "/images/projects/galaxa/8D64D8AB-63AB-4FBB-BF4D-C1EED30D2C7A_1_105_c.jpeg",
    year: "2024",
    tags: ["Startup", "Product Development", "User Research"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-dotted-paper">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-30">
        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-black"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Year */}
                {p.year ? (
                  <span className="absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 backdrop-blur-md ring-1 ring-black/5 dark:bg-black/40 dark:text-zinc-100 dark:ring-white/10">
                    {p.year}
                  </span>
                ) : null}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {/**line-clamp-3 */}
                  {p.description}
                </p>

                {/* Tags */}
                <Tags tags={p.tags} />

                {/* Links */}
                <div className="mt-6 flex items-center gap-4 text-sm">
                  {p.href ? (
                    <Link
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 text-zinc-900 dark:text-zinc-100"
                    >
                      Live
                    </Link>
                  ) : null}
                  {p.github ? (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 text-zinc-900 dark:text-zinc-100"
                    >
                      GitHub
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
