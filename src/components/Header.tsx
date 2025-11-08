import { ReactNode } from "react";

type HeaderProps = {
  title?: ReactNode;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
};

export default function Header({ title, onMenuClick, onLogoClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex w-full max-w-[560px] items-center justify-between px-4 py-3">
        <button
          aria-label="Home"
          onClick={onLogoClick}
          className="text-[18px] tracking-[0.08em]"
          style={{ fontFamily: "'Agu Display', 'Author', system-ui, sans-serif", fontWeight: 400 }}
        >
          MM
        </button>
        <div className="flex items-center gap-3">
          {title ? <div className="text-[14px] opacity-70 text-right">{title}</div> : null}
          <button
            aria-label="Menu"
            onClick={onMenuClick}
            className="text-[20px]"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}


