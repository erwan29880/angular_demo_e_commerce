// modèle des données
export class ModeleProduct {
  id!: number;
  title! :string;
  description! : string;
  price! : number;
  discountPercentage! : number;
  rating! : number;
  stock! : number;
  brand!: string;
  category!: string;
  thumbnail!: string;
  images!: string[];
}

// modèle ajout item panier
export interface CartInterface {
  [key: string]: number
}

// modèle panier
export class Panier {
  title!: string;
  nombre!: number;
  price!: number;
  image!: string;
}