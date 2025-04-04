import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastOriginial,
  toast,
} from "@/components/ui/use-toast";

type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export const useToast = () => {
  const { toast, ...rest } = useToastOriginial();
  return {
    toast,
    ...rest,
    success: (props: Omit<ToastProps, "variant">) => {
      toast({
        ...props,
        variant: "success",
      });
    },
    error: (props: Omit<ToastProps, "variant">) => {
      toast({
        ...props,
        variant: "destructive",
      });
    },
  };
};

export { toast };
export type { ToasterToast };
