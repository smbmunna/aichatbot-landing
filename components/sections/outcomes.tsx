import {
  BarChart3,
  Languages,
  MessageSquareReply,
  PackageSearch,
  ShoppingBag,
  Truck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { outcomes } from "@/lib/content";
import { Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../ui";

const icons: Record<(typeof outcomes)[number]["key"], LucideIcon> = {
  catalog: PackageSearch,
  language: Languages,
  orders: ShoppingBag,
  comments: MessageSquareReply,
  status: Truck,
  handover: UserRoundCheck,
  reports: BarChart3,
};

export function Outcomes() {
  return (
    <section id="features" className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What you get"
          title="Your busiest sales assistant, working every channel at once"
          body="The repetitive questions get fast, correct answers. Your team spends its time on the conversations that need a person."
        />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => {
            const Icon = icons[o.key];
            const featured = i === 0;
            return (
              <StaggerItem
                key={o.key}
                className={featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""}
              >
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl p-6 ring-1 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgb(15_23_42/0.3)] sm:p-7 ${
                    featured ? "bg-ink text-white ring-ink" : "bg-white ring-slate-200/80"
                  }`}
                >
                  {featured && (
                    <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
                  )}
                  <div className="relative">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                        featured ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className={`mt-5 text-lg font-semibold tracking-tight ${featured ? "text-white" : "text-ink"}`}>
                      {o.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-md text-sm leading-relaxed ${featured ? "text-white/65" : "text-slate-600"}`}
                    >
                      {o.body}
                    </p>
                    {featured && (
                      <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        {["Price", "Size", "Colour", "Availability"].map((t) => (
                          <span key={t} className="rounded-full bg-white/10 px-3 py-1 font-medium text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </StaggerItem>
            );
          })}

          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-teal-600 p-7 text-white">
              <p className="text-sm font-medium text-white/80">The principle</p>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                AI drafts the words. Your rules decide what happens. Your records supply every price.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
