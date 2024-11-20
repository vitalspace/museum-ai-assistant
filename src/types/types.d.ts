export interface Message {
  content: string;
  isUser: boolean;
}

export interface Museum {
  car?: any;
  bus?: any;
  metro?: any;
  id?: number;
  top?: number;
  title?: string;
  lat?: number;
  lng?: number;
  tilt?: number;
  range?: number;
  heading?: number;
  altitude?: number;
  stars?: number;
  reviews?: number;
  schedule?: string;
  category?: string;
  generalAdmission?: string;
  studentsAndTeachers?: string;
  minors?: string;
  prompt?: string;
  place_id?: string;
  tags?: string[];
  image?: string;
  address?: string;
  description?: string;
  transportation: {
    bus?: string;
    metro?: string;
    car?: string;
  };
  nearbyLandmarks?: string[];
  exhibits?: string[];
  facilities?: string[];
}
