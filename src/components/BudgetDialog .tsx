import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Cost {
  price: string;
  brand: string;
  model: string;
  failure: string;
}

interface BudgetDialogProps {
  cost: Cost;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const BudgetDialog: React.FC<BudgetDialogProps> = ({
  cost,
  isOpen,
  onOpenChange,
  onSubmit,
  disabled,
}) => {
  const originalPrice = parseFloat(cost?.price.replace(/[$,]/g, "")) || 0;
  const adjustedPrice = originalPrice + 25000;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onSubmit} disabled={disabled} variant="outline">
          Presupuestar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Costo de Reparación</DialogTitle>
          <DialogDescription>
            Este es el costo estimado para reparar tu dispositivo. Haga clic en
            guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="col-span-1">
              Marca:
            </Label>
            <Input
              id="brand"
              value={cost?.brand || ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="col-span-1">
              Modelo:
            </Label>
            <Input
              id="model"
              value={cost?.model || ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="failure" className="col-span-1">
              Falla:
            </Label>
            <Input
              id="failure"
              value={cost?.failure || ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="col-span-1">
              Precio:
            </Label>
            <Input
              id="price"
              value={`$${adjustedPrice.toFixed(2)}`}
              readOnly
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
