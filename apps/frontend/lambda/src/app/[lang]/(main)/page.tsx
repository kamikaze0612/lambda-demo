import { redirect } from "@/i18n/navigation";

const Index: React.FC = () => {
  return redirect({
    href: "/companies",
    locale: "en",
  });
};

export default Index;
