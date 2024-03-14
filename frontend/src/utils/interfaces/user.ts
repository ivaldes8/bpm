export interface User {
    first_name: string;
    last_name?: string;
    username: string;
    email: string;
    role: string;
    password?: string;
    phone?: string;
    avatar?: string | null;
    id: string;
  }
