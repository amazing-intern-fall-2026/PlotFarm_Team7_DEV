export interface HomeCtaBannerProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  targetUrl?: string;
  onCtaClick?: () => void;
  className?: string;
}

export interface HomeCtaBannerViewProps extends HomeCtaBannerProps {
  handleCtaClick: () => void;
}
