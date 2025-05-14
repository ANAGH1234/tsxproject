import { ADOBE_CLIENTID } from "../helpers/constant";

interface AdobeDCView {
  previewFile: (content: PreviewFileContent, viewerConfig: ViewerConfig) => Promise<void>;
  registerCallback: (
    type: string,
    handler: (...args: any[]) => void | Promise<SaveApiResponse>,
    options: Record<string, any>
  ) => void;
}

interface AdobeDC {
  View: {
    new (config: { clientId: string; divId?: string }): AdobeDCView;
    Enum: {
      CallbackType: {
        SAVE_API: string;
        EVENT_LISTENER: string;
      };
      ApiResponseCode: {
        SUCCESS: string;
      };
    };
  };
}

interface ViewerConfig {
  showAnnotationTools?: boolean;
  showDownloadPDF?: boolean;
  [key: string]: any;
}

interface PreviewFileContent {
  content: {
    location?: { url: string };
    promise?: Promise<ArrayBuffer>;
  };
  metaData: {
    fileName: string;
  };
}

interface SaveApiResponse {
  code: string;
  data: {
    metaData: Record<string, any>;
  };
}

// Declare the global AdobeDC object
declare global {
  interface Window {
    AdobeDC: AdobeDC;
  }
}

class ViewSDKClient {
  private readyPromise: Promise<void>;
  private adobeDCView: AdobeDCView | undefined;

  constructor() {
    this.readyPromise = new Promise((resolve) => {
      if (window.AdobeDC) {
        resolve();
      } else {
        document.addEventListener("adobe_dc_view_sdk.ready", () => {
          resolve();
        });
      }
    });
    this.adobeDCView = undefined;
  }

  ready(): Promise<void> {
    return this.readyPromise;
  }

  previewFile(divId: string, viewerConfig: ViewerConfig, pdfUrl: string): Promise<void> {
    const config: { clientId: string; divId?: string } = {
      clientId: ADOBE_CLIENTID,
    };
    if (divId) {
      config.divId = divId;
    }

    this.adobeDCView = new window.AdobeDC.View(config);

    const previewFilePromise = this.adobeDCView.previewFile(
      {
        content: {
          location: {
            url: pdfUrl,
          },
        },
        metaData: {
          fileName: "Lab",
        },
      },
      viewerConfig
    );

    return previewFilePromise;
  }

  previewFileUsingFilePromise(divId: string, filePromise: Promise<ArrayBuffer>, fileName: string): void {
    this.adobeDCView = new window.AdobeDC.View({
      clientId: ADOBE_CLIENTID,
      divId,
    });

    this.adobeDCView.previewFile(
      {
        content: {
          promise: filePromise,
        },
        metaData: {
          fileName,
        },
      },
      {}
    );
  }

  registerSaveApiHandler(): void {
    const saveApiHandler = (
      metaData: Record<string, any>,
      _content: any,
      _options: any
    ): Promise<SaveApiResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response: SaveApiResponse = {
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              metaData: { ...metaData, updatedAt: new Date().getTime() },
            },
          };
          resolve(response);
        }, 2000);
      });
    };

    this.adobeDCView?.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      saveApiHandler,
      {}
    );
  }

  registerEventsHandler(): void {
    this.adobeDCView?.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      (_event: any) => {
       
      },
      {
        enablePDFAnalytics: true,
      }
    );
  }
}

export default ViewSDKClient;
