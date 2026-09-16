declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (
            notification?: (notification: {
              isNotDisplayed: () => boolean;
              isSkippedMoment: () => boolean;
              getNotDisplayedReason?: () => string;
              getSkippedReason?: () => string;
            }) => void,
          ) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: number | string;
              locale?: string;
            },
          ) => void;
          disableAutoSelect?: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env?.VITE_GOOGLE_CLIENT_ID as
  | string
  | undefined;

let scriptLoadPromise: Promise<void> | null = null;

export function loadGoogleScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Không thể tải Google Identity Services."));
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Render Google Official Sign-In Button vào element chỉ định.
 * Khi user click, Google sẽ trực tiếp kích hoạt popup chọn tài khoản (Account Chooser).
 */
export async function renderGoogleSignInButton(
  container: HTMLElement,
  onCredential: (idToken: string) => void,
): Promise<void> {
  if (!GOOGLE_CLIENT_ID) return;

  await loadGoogleScript();

  if (!window.google?.accounts?.id) return;

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  });

  container.innerHTML = "";

  const containerWidth = container.offsetWidth || 380;

  window.google.accounts.id.renderButton(container, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "signin_with",
    shape: "rectangular",
    logo_alignment: "left",
    width: Math.min(Math.max(containerWidth, 240), 400),
    locale: "vi",
  });
}

/**
 * Hiện popup đăng nhập Google (One Tap) hoặc kích hoạt flow đăng nhập.
 */
export async function promptGoogleSignIn(
  onCredential: (idToken: string) => void,
): Promise<void> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID chưa được cấu hình.");
  }

  await loadGoogleScript();

  if (!window.google?.accounts?.id) {
    throw new Error("Google Identity Services chưa sẵn sàng.");
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  });

  return new Promise((resolve, reject) => {
    window.google!.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        reject(
          new Error(
            "Trình duyệt đã chặn cửa sổ đăng nhập Google. Vui lòng kiểm tra cài đặt cookie/trình duyệt hoặc thử lại.",
          ),
        );
        return;
      }
      resolve();
    });
  });
}
