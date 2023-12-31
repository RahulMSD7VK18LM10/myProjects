import { ICategory } from "./category.model";

export interface IProduct{
    id:number;
    title:string;
    price:number;
    description:string;
    image:string;
    category:ICategory;
}