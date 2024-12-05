// router.ts
export type StackParamList = {
  GetStarted: undefined;
  Home: { userId?: string };
  SignUp: undefined;
  RecipeDetail: {
    title: string;
    image: any;
    ingredients: string[];
    instructions: string[];
  };
};
