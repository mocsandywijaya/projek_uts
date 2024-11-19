export type StackParamList = {
  GetStarted: undefined;
  Home: undefined;
  Detail: {
    title: string;
    image: any;
    ingredients: string[];
    instructions: string[];
  };
  RecipeDetail: {
    title: string;
    image: any;
    ingredients: string[];
    instructions: string[];
  };
  SignUp: undefined;  // Tambahkan ini untuk mendukung navigasi ke layar SignUp
};
