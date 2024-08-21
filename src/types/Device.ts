export interface Device {
  id: string; // o número, dependiendo del tipo que uses
  brand: string;
  model: string;
  issue: string;
  status: string;
  fail: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  name: string;
}
