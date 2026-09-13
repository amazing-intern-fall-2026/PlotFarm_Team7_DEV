declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: (
            notification?: (notification: {
              isNotDisplayed: () => boolean;
              isSkippedMoment: () => boolean;
              getNotDisplayedReason?: () => string;
            }) => void,
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env?.VITE_GOOGLE_CLIENT_ID as
  | string
  | undefined;

let scriptLoadPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
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
 * Hiện popup đăng nhập Google (One Tap), trả ID Token qua callback khi thành công.
 */
export async function promptGoogleSignIn(
  onCredential: (idToken: string) => void,
): Promise<void> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID chưa được cấu hình.");
  }

  await loadGoogleScript();

  if (!window.google) {
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
