import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Presupuestar equipo</CardTitle>
        <CardDescription>Complete el siguiente formulario</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Marca del equipo</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Samsung</SelectItem>
                  <SelectItem value="sveltekit">Motorola</SelectItem>
                  <SelectItem value="astro">Lg</SelectItem>
                  <SelectItem value="nuxt">Xiaomi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Modelo</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">G7 power</SelectItem>
                  <SelectItem value="sveltekit">G8 power lite</SelectItem>
                  <SelectItem value="astro">G6 lite</SelectItem>
                  <SelectItem value="nuxt">E7 power</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Falla</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">No carga</SelectItem>
                  <SelectItem value="sveltekit">No da imagen</SelectItem>
                  <SelectItem value="astro">Se queda en el logo</SelectItem>
                  <SelectItem value="nuxt">No enciende</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Presupuestar</Button>
      </CardFooter>
    </Card>
  );
}
