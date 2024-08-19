export interface Product {
  id: number;
  spare: string;
  brand: string;
  model: string;
  price: string;
  stock: string;
}

// Función para obtener y procesar los datos del Google Sheet
export const fetchGoogleSheetData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/1MyQSIaPRXpMk6GkFy7-g4xAMoikhrJsa/pub?output=csv"
    );
    const textData = await response.text();

    //console.log("Raw CSV Data:", textData);
    const jsonData = parseCSVToJSON(textData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return [];
  }
};

// Función para obtener los modelos de una marca específica con ID y nombre
export const getModelsByBrand = async (
  brand: string
): Promise<{ id: number; name: string }[]> => {
  const products = await fetchGoogleSheetData();

  // Filtrar los productos por la marca especificada
  const filteredModels = products
    .filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
    .map((product, index) => ({
      id: index + 1, // El id será el índice + 1
      name: product.model,
    }));

  // Eliminar duplicados en caso de que haya modelos repetidos
  const uniqueModels = Array.from(
    new Set(filteredModels.map((model) => model.name))
  ).map((name, index) => ({
    id: index + 1,
    name,
  }));

  return uniqueModels;
};

// Función para filtrar el producto por marca y modelo y obtener su precio
export const getPriceByBrandAndModel = async (
  brand: string | undefined,
  model: string | undefined
): Promise<string | null> => {
  const products = await fetchGoogleSheetData();

  const product = products.find(
    (p) =>
      p.brand.toLowerCase() === brand?.toLowerCase() &&
      p.model.toLowerCase() === model?.toLowerCase()
  );

  return product ? product.price : null;
};

// Función para obtener un array de marcas únicas con ID y nombre
export const getUniqueBrandsWithId = async (): Promise<
  { id: number; name: string }[]
> => {
  const products = await fetchGoogleSheetData();
  const uniqueBrandNames = Array.from(
    new Set(products.map((product) => product.brand))
  );

  // Convertimos las marcas únicas en objetos con id y name
  const uniqueBrands = uniqueBrandNames.map((brand, index) => ({
    id: index + 1, // El id será el índice + 1
    name: brand,
  }));

  return uniqueBrands;
};

// Función para convertir el CSV en JSON
const parseCSVToJSON = (csv: string): Product[] => {
  const rows = csv.split("\n");
  const result: Product[] = [];

  rows.forEach((row, index) => {
    const columns = row.split(",");

    //console.log(`Row ${index}:`, columns);

    if (columns.length < 13 || !columns[1].trim()) {
      return;
    }

    const id = parseInt(columns[1].trim());
    const productDetails = columns[2].trim().split(" ");
    const price =
      columns[7].trim().replace(/"/g, "") + columns[8].trim().replace(/"/g, "");
    const stockValue = columns[13].trim().toLowerCase();

    //console.log(`Product ID ${id} - Raw Values:`, { price, stockValue });

    const stock = stockValue.includes("en stock") ? "EN STOCK" : "SIN STOCK";

    const spare = productDetails[0];
    const brand = productDetails[1];
    const model = productDetails.slice(2).join(" ");

    //console.log(`Product ID ${id} - Parsed Model:`, { spare, brand, model });

    if (id && spare && brand && model && price && stock) {
      const product: Product = {
        id,
        spare,
        brand,
        model,
        price,
        stock,
      };
      result.push(product);
    }
  });

  //console.log("Final Parsed JSON:", result);
  return result;
};
