import { useTranslation } from "react-i18next";
import { Logo } from "../icons/Logo";
import { LinkedInIcon, GitHubIcon, TwitterIcon, InstagramIcon } from "../icons/SocialIcons";

const socials = [
  { href: "https://www.linkedin.com/in/efrain-cabrera-b25489216/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://github.com/xEfraM7", label: "GitHub", Icon: GitHubIcon },
  { href: "https://twitter.com/xEfraCD", label: "Twitter", Icon: TwitterIcon },
  { href: "https://www.instagram.com/efrain_lol/", label: "Instagram", Icon: InstagramIcon },
];

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-text-secondary">
          <Logo className="h-6 w-6" />
          <span className="font-mono text-xs">© {year} · {t("footer.rights")}</span>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-aurora-violet hover:text-aurora-violet"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <p className="container-page pb-8 font-mono text-[11px] text-text-tertiary">{t("footer.built")}</p>
    </footer>
  );
};
