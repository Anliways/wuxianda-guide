import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface Crumb {
  label: string;
  path?: string;
}

/** 详情页面包屑导航：首页固定为第一级，末级为当前页（不可点击），中间层级可点击返回 */
export default function PageBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">首页</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-3.5 w-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.path ? (
                <BreadcrumbLink asChild>
                  <Link to={item.path} className="max-w-[8rem] md:max-w-none truncate">{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="max-w-[8rem] md:max-w-none truncate">{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
