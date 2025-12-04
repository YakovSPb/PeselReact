interface IImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface IBreed {
  id: number;
  name: string;
  country_code: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
  height: IBody;
  weight: IBody;
  image: IImage;
}
export interface IBody {
  imperial: string;
  metric: string;
}

export type TOption = {
  value: number;
  label: number;
};
