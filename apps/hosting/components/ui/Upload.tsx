import * as React from "react";
import {
  CheckCircle2,
  File as FileGeneric,
  FileSpreadsheet,
  FileText,
  FileType,
  Image as ImageIcon,
  Upload as UploadIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const getFileIcon = (fileName: string) => {
  if (!fileName)
    return (
      <FileGeneric className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
    );

  const ext = fileName.split(".").pop()?.toLowerCase();
  const iconClass = "h-5 w-5 md:h-6 md:w-6";

  switch (ext) {
    case "pdf":
      return <FileText className={cn(iconClass, "text-red-500")} />;
    case "xlsx":
    case "xls":
    case "csv":
      return <FileSpreadsheet className={cn(iconClass, "text-emerald-600")} />;
    case "doc":
    case "docx":
      return <FileType className={cn(iconClass, "text-blue-600")} />;
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return <ImageIcon className={cn(iconClass, "text-blue-500")} />;
    default:
      return <FileGeneric className={cn(iconClass, "text-muted-foreground")} />;
  }
};

interface CustomFile {
  name: string;
  size?: number;
  uid?: string;
  url?: string;
}

interface FileUploadProps {
  value?: (File | CustomFile)[] | null;
  onChange: (files: (File | CustomFile)[] | null) => void;
  accept?: string;
  maxSize?: string;
  multiple?: boolean;
  label?: string;
  title?: string;
  error?: string;
}

export function FileUpload({
  value = [],
  onChange,
  accept = "image/*, .pdf, .xlsx, .docx",
  maxSize = "50 MB",
  multiple = false,
  label,
  title = "Haz clic o arrastra archivos para subir",
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadingStatus, setUploadingStatus] = React.useState<{
    [key: string]: number;
  }>({});

  const currentFiles = React.useMemo(
    () => (Array.isArray(value) ? value : []),
    [value]
  );

  React.useEffect(() => {
    currentFiles.forEach((file) => {
      if (uploadingStatus[file.name] === undefined) {
        simulateUpload(file.name);
      }
    });
  }, [currentFiles]);

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 35;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadingStatus((prev) => ({ ...prev, [fileName]: progress }));
    }, 150);
  };

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;
    const newFiles = Array.from(incomingFiles);
    if (multiple) {
      onChange([...currentFiles, ...newFiles]);
    } else {
      onChange([newFiles[0]]);
    }
  };

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = currentFiles.filter((_, i) => i !== index);
    onChange(updated.length > 0 ? updated : null);
  };

  return (
    <div className="min-w-55 w-full space-y-2.5">
      {label && (
        <Label
          className={cn(
            "text-sm ml-1 transition-colors",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
        </Label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "w-full relative group border-2 border-dashed rounded-md p-6 md:p-10 transition-all duration-300 flex flex-col items-center justify-center bg-transparent",
          isDragging
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/20",
          error && "border-destructive/50 bg-destructive/5"
        )}
      >
        <input
          type="file"
          multiple={multiple}
          className="absolute inset-0 opacity-0 cursor-pointer z-20"
          onChange={(e) => handleFiles(e.target.files)}
          accept={accept}
        />

        <div
          className={cn(
            "p-3 md:p-4 rounded-full mb-3 transition-all duration-300",
            error ? "bg-destructive/10" : "bg-muted group-hover:bg-primary/10"
          )}
        >
          <UploadIcon
            className={cn(
              "h-6 w-6 md:h-7 md:w-7 transition-colors",
              error
                ? "text-destructive"
                : "text-muted-foreground group-hover:text-primary"
            )}
          />
        </div>

        <div className="text-center space-y-1 px-4">
          <h3 className="font-medium text-xs sm:text-sm md:text-base line-clamp-1">
            {title}
          </h3>
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
            {accept.replace(/\./g, " ")} • MAX {maxSize}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-[12px] font-medium text-destructive ml-1 animate-in fade-in slide-in-from-left-1">
          {error}
        </p>
      )}

      <div className="w-full space-y-2 max-h-75 overflow-y-auto custom-scrollbar">
        {currentFiles.map((file, index) => {
          if (!file || !file.name) return null;

          const progress = uploadingStatus[file.name] || 0;
          const isDone = progress === 100;

          const fileSize =
            file instanceof File ? (file.size / 1024).toFixed(0) : "---";

          return (
            <div
              key={`${file.name}-${index}`}
              className="w-full border rounded-lg p-2 md:p-3 bg-card flex items-center gap-3 md:gap-4 transition-all animate-in fade-in slide-in-from-top-1"
            >
              <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-md border bg-muted flex items-center justify-center shadow-sm">
                {getFileIcon(file.name)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[12px] md:text-[13px] font-semibold truncate leading-none">
                    {file.name}
                  </p>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase">
                    {fileSize} KB
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-1 md:h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300 rounded-full",
                        isDone ? "bg-emerald-500" : "bg-primary animate-pulse"
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <span className="text-[9px] md:text-[10px] text-muted-foreground w-7 text-right">
                      {Math.round(progress)}%
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 rounded-full z-30"
                onClick={(e) => removeFile(e, index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
