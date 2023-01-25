import { Ingredient } from './Ingredient';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public ingredients: Ingredient[]
  ) {}
}
