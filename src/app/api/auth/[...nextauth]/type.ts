interface UserData {
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    profilePicUrl: string;
    role: string;
    profileComplete: boolean;
    profileStatus: string;
  }
  
  export interface UserResponse {
    success: boolean;
    message: string;
    data: UserData;
    errors: any;
    count: number;
  }
   