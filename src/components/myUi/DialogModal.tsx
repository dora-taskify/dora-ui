import type { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

type DialogModalProps = {
    trigger: ReactNode;
    title?: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
};

const DialogModal: React.FC<DialogModalProps> = ({
    trigger,
    title,
    description,
    children,
    footer,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="py-2">{children}</div>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
};

export default DialogModal;
