interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Data {
  user: User;
}

interface ApiResponse {
  data: Data;
  status: string;
  token: string;
}

export { ApiResponse, Data, User };
