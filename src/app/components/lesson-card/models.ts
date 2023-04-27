export interface ITitleProps {
  unlocked: boolean;
}

export interface IContent {
  show: boolean;
}

export interface IErrorMessageProps {
  showErrorMessage: boolean;
}

interface IUseVideoReturn {
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setDownloadVideo: React.Dispatch<React.SetStateAction<boolean>>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  showErrorMessage: boolean;
}

export type useVideoType = (id: string, link: string) => IUseVideoReturn;
