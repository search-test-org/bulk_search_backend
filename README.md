- [1. Backend](#1-backend)
  - [1.1. Structure](#11-structure)
  - [1.2. Authentication](#12-authentication)
- [2. Further imporvements](#2-further-imporvements)
  - [2.1. Backend](#21-backend)
---

# 1. Backend 
## 1.1. Structure
1. The API is following RESTful pattern for `User`, `Search`, and `Token` entities.

## 1.2. Authentication
1. Strategy
   1. User is allowed to login only one session (single device).
   2. One session sustains 30 mins.
   3. By create a new session (login), the previous sessions will be inactive.
   4. All sessions are stored.
2. Cookies are set as
   1. `httpOnly` to prevent accessing the cookie by client-side JS.
   2. `secure` in production (must handle with https request).
   3. `sameSite=Lax` to prevent CSRF (cross-site request forgery). The cookie will be able to use on the same site which it receives the cookie.
3. Auth middleware will
   1. Check if token is active (alive)
   2. Turn token off (inactive) if expires
   3. Clear token on client side if token expires

# 2. Further imporvements
## 2.1. Backend
1. Backend can be separated into different micro services to handle certain tasks such as separating authentication and create entities in database.
2. Authentication strategy could be optimzied when integrating with other solutions, such as OAuth or SSO (single sign-on).
3. Power or advanced authorization structure can be applied for different types of users such as regular uses, managers, and admins.
4. A refresh token can be issued to avoid users proceed login process. 
   1. However, this depends on how secure should the system, app, or the task is.
   2. Other authenticating process could be added when the user is modifying sensitive data, such as 2-factor authentication with SMS.