import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import ServiceClientLayout from "./ServiceClientLayout";
import { SERVICES_DATA } from "@/data-list/services";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{ type: string }>;
}

const getContentPath = (type?: string) => {
  const root = process.cwd();
  const relativePath = "content/servicios";
  const base = root.endsWith("hosting")
    ? path.join(root, relativePath)
    : path.join(root, "apps/hosting", relativePath);

  return type ? path.join(base, `${type}.mdx`) : base;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const filePath = getContentPath(type);

  if (!fs.existsSync(filePath)) {
    return { title: "Servicio no encontrado | Servitec Perú" };
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  const title = `${data.title} | Servitec Perú`;
  const description =
    data.description ||
    "Servicio técnico especializado en electrónica y proyectores.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://www.servitecperu.com/servicios/${type}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.servitecperu.com/servicios/${type}`,
      siteName: "Servitec Perú",
      type: "article",
      images: [
        {
          url: data.image || "/og-image.png",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { type } = await params;
  const filePath = getContentPath(type);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="pt-40 text-center text-white/20 font-sans italic-none">
        <p>Servicio no encontrado</p>
        <code className="text-[10px] block mt-4 opacity-40">{filePath}</code>
      </div>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const serialize = (items: any[]) =>
    items.map(({ icon, ...rest }: any) => JSON.parse(JSON.stringify(rest)));

  return (
    <ServiceClientLayout
      frontmatter={JSON.parse(JSON.stringify(data))}
      content={mdxContent}
      allServices={serialize(SERVICES_DATA)}
      allSpecialties={serialize(SPECIALTIES_DATA)}
      slug={type}
    />
  );
}

export async function generateStaticParams() {
  const contentPath = getContentPath();

  if (!fs.existsSync(contentPath)) return [];

  return fs
    .readdirSync(contentPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ type: f.replace(".mdx", "") }));
}
