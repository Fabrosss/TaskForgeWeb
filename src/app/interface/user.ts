export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  roles?: Role[];
  tasks?: Task[];
}

export interface Role {
  id: number;
  name: string;
  privileges: Privilege[];
}

export interface Privilege {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  topic: string;
  description: string;
}
