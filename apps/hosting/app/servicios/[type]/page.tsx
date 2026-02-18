import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import ServiceClientLayout from "./ServiceClientLayout";
import { SERVICES_DATA } from "@/data-list/services";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import remarkGfm from "remark-gfm";

export default async function ServicePage(props: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await props.params;

  const root = process.cwd();
  // Tu corrección: la carpeta 'content' está al nivel de 'app' o en la raíz del subproyecto
  const relativePath = "content/servicios";

  const contentDirectory = root.endsWith("hosting")
    ? path.join(root, relativePath)
    : path.join(root, "apps/hosting", relativePath);

  const filePath = path.join(contentDirectory, `${type}.mdx`);

  console.log("📂 Cargando archivo:", filePath);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="pt-40 text-center text-white/20 font-sans italic-none">
        <p>servicio no encontrado</p>
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
        remarkPlugins: [remarkGfm], // Esto habilita el soporte para tablas
      },
    },
  });

  // Limpieza profunda para evitar: "Functions cannot be passed..."
  const serialize = (items: any[]) =>
    items.map(({ icon, ...rest }: any) => JSON.parse(JSON.stringify(rest)));

  return (
    <ServiceClientLayout
      frontmatter={JSON.parse(JSON.stringify(data))}
      content={mdxContent}
      allServices={serialize(SERVICES_DATA)}
      allSpecialties={serialize(SPECIALTIES_DATA)}
    />
  );
}

export async function generateStaticParams() {
  const root = process.cwd();
  const relativePath = "content/servicios";
  const contentPath = root.endsWith("hosting")
    ? path.join(root, relativePath)
    : path.join(root, "apps/hosting", relativePath);

  if (!fs.existsSync(contentPath)) return [];

  return fs
    .readdirSync(contentPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ type: f.replace(".mdx", "") }));
}
