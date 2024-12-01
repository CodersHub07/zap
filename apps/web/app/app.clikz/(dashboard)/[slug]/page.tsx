import LinkList from "~/components/link/links-list";
import { db } from "~/lib/db";
import PageFilters from "../_components/filter";
import NoLinks from "../_components/link/no-links";

export type PageWithSlugParams = {
  params: {
    slug: string;
  };
};

const WorkspaceLinkPage = async ({ params: { slug } }: PageWithSlugParams) => {
  const links = await db.link.findMany({
    where: {
      workspaceSlug: slug,
    },
  });

  return (
    <div className="flex h-full flex-col flex-1 gap-y-2">
      <div className="flex">
        <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
          Links
        </h1>
      </div>
      <div className="flex-1 space-y-4">
        <PageFilters />
        {links.length === 0 ? <NoLinks /> : <LinkList links={links} />}
      </div>
    </div>
  );
};

export default WorkspaceLinkPage;
