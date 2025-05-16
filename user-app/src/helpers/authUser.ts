import { Base64 } from 'js-base64';
import type { User } from '../models/user/User';
import { AUTH_ID } from './constant';

// Initial user data
const initialUser: User = {
  userId: 893,
  firstName: "Mohan Chauhan",
  email: "pro.shailendra@gmail.com",
 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4OTMiLCJzdWIiOiJNb2hhbiBDaGF1aGFuIiwiZW1haWwiOiJwcm8uc2hhaWxlbmRyYUBnbWFpbC5jb20iLCJqdGkiOiI5ODdiY2E0Ni1lYjQ3LTQxNmUtOWM1OC04NDI1OWFiZWZlMjYiLCJleHAiOjE3NDczMTY5MTQsImlzcyI6Imh0dHBzOi8vc2Nob2xhcmhhdC5jb20iLCJhdWQiOiJodHRwczovL3NjaG9sYXJoYXQuY29tIn0.kYeY7BHTAxEBw_-Ub47avUyg_y5eaP3NhVQgAZRoY34",
  mobileNo: "9560344074",
  isVerified: true,
  membershipId: 201,
  membershipExpiry: new Date("2025-08-07T00:00:00"),
  roles: ["Member"],
  profileImage: "https://dotnettrickscloud.blob.core.windows.net/profiles/89489e0a-b5a5-4e3b-9d29-c2bdbcdeeb98_Screenshot%202025-03-14%20233921.png",
};

// Check if user data exists in local storage, if not, set the initial user
function initializeUser(): void {
  const existingUser = localStorage.getItem(AUTH_ID);
  if (!existingUser) {
    Set(initialUser);
  }
}

// Save user data to local storage
function Set(user: User): void {
  const encodedData = Base64.encode(JSON.stringify(user));
  localStorage.setItem(AUTH_ID, encodedData);
}

// Check if a user is authenticated
function IsAuth(): boolean {
  return !!Get();
}

// Retrieve user data from local storage
function Get(): User | null {
  const userData = localStorage.getItem(AUTH_ID);
  if (!userData) return null;

  try {
    const decodedData = Base64.decode(userData);
    return JSON.parse(decodedData);
  } catch (error) {
    console.error("Error decoding user data:", error);
    return null;
  }
}

// Remove user data from local storage
function Remove(): void {
  localStorage.removeItem(AUTH_ID);
}

// Initialize the user on load
initializeUser();

const authUser = {
  Set,
  IsAuth,
  Get,
  Remove,
};

export default authUser;
