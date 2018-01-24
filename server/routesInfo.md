## routes
* `http://localhost:3000`

* `http://localhost:3000/classifieds`
    * Accessible to ordinary users
    * Methods:
        * GET = Retrieves all the Classifieds in the Database
        * POST = Post a classified in the database

* `http://localhost:3000/classifieds/:ID`
    * Accessible to Ordinary users
    * Methods:
        * GET: Retrieves a classified by ID
        * UPDATE: Edit the Contents of a particular classified (match id
        * DELETE: Delete a particular classified (match id of author)

* `http://localhost:3000/admin/`
    * Admin Homepage

* `http://localhost:3000/classifieds-admin`
    * Retrieves all Classifieds in the Database
    * Methods:
        * GET: 
        * POST:
        * DELETE: (CAUTION - DELETES ALL)

* `http://localhost:3000/admin/lassifieds/:ID/`
    * Accessible only to admin
    * Methods: 
        * GET:
        * UPDATE:
        * DELETE:


* `http://localhost:3000/admin/login`
    * Admin Login

* `http://localhost:3000/admin/register`
    * Admin Register

* `http://localhost:3000/admin/logout`
    * Admin Logout